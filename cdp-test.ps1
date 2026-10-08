$ErrorActionPreference = 'Stop'

$expr = @'
(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const grab = (label, sel) => {
    const el = document.querySelector(sel);
    if (!el) return { label, state: 'MISSING SELECTOR' };
    const s = getComputedStyle(el);
    return {
      label,
      opacity: s.opacity,
      clipPath: s.clipPath,
      transform: s.transform,
      inline: (el.getAttribute('style') || '').slice(0, 260),
    };
  };
  const out = {};
  out.heroH1 = grab('heroH1', '#home h1');
  out.heroP = grab('heroP', '#home p.text-lg, #home h1 ~ p');
  out.heroBtn = grab('heroBtn', '#home a[href="#start-project"]');
  await sleep(3500);
  out.heroH1_after3s = grab('heroH1_after3s', '#home h1');
  out.heroP_after3s = grab('heroP_after3s', '#home h1 ~ p');
  out.workbench = grab('workbench', '#home .hero-workbench');

  document.querySelector('#solutions').scrollIntoView();
  await sleep(2200);
  out.scrollY = window.scrollY;
  out.solHeading = grab('solHeading', '#solutions h2');
  out.solCopy = grab('solCopy', '#solutions .max-w-2xl');
  out.solStep = grab('solStep', '#solutions h3');

  document.querySelector('#materials').scrollIntoView();
  await sleep(2200);
  out.matHeading = grab('matHeading', '#materials h2');
  out.matRow = grab('matRow', '#materials article h3');

  document.querySelector('#furniture').scrollIntoView();
  await sleep(2200);
  out.furnHeading = grab('furnHeading', '#furniture .furniture-heading-block');
  out.furnLine = grab('furnLine', '#furniture .furniture-flowline');

  document.querySelector('#value').scrollIntoView();
  await sleep(2200);
  out.valueCell = grab('valueCell', '#value .grid > div:last-child');
  out.valueH2 = grab('valueH2', '#value h2');

  document.querySelector('#start-project').scrollIntoView();
  await sleep(2400);
  out.ctaH2 = grab('ctaH2', '#start-project h2');
  out.ctaStrip = grab('ctaStrip', '#start-project .border-t');

  await sleep(1500);
  out.footerCol = grab('footerCol', 'footer nav');
  out.footerLink = grab('footerLink', 'footer nav a');
  return JSON.stringify(out);
})()
'@

$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$ud = Join-Path $env:TEMP 'sc-cdp-profile'
Start-Process $chrome -ArgumentList @(
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--remote-debugging-port=9333',
  "--user-data-dir=$ud",
  '--window-size=1440,1500',
  'http://localhost:5173/'
) -WindowStyle Hidden

$target = $null
for ($i = 0; $i -lt 40; $i++) {
  try {
    $list = Invoke-RestMethod 'http://127.0.0.1:9333/json' -TimeoutSec 2
    $target = $list | Where-Object { $_.type -eq 'page' } | Select-Object -First 1
    if ($target) { break }
  } catch { Start-Sleep -Milliseconds 400 }
}
if (-not $target) { Write-Output 'CDP: no page target'; exit 1 }

$ws = New-Object System.Net.WebSockets.ClientWebSocket
$ct = [Threading.CancellationToken]::None
$ws.ConnectAsync([Uri]$target.webSocketDebuggerUrl, $ct).GetAwaiter().GetResult()

$script:idCounter = 100
function Send-Cdp([string]$msg) {
  $bytes = [Text.Encoding]::UTF8.GetBytes($msg)
  $seg = New-Object System.ArraySegment[byte] -ArgumentList @(, $bytes)
  $ws.SendAsync($seg, [Net.WebSockets.WebSocketMessageType]::Text, $true, $ct).GetAwaiter().GetResult() | Out-Null
}
function Recv-Cdp {
  $buf = New-Object byte[] 262144
  $seg = New-Object System.ArraySegment[byte] -ArgumentList @(, $buf)
  $ms = New-Object IO.MemoryStream
  do {
    $res = $ws.ReceiveAsync($seg, $ct).GetAwaiter().GetResult()
    $ms.Write($buf, 0, $res.Count)
  } while (-not $res.EndOfMessage)
  return [Text.Encoding]::UTF8.GetString($ms.ToArray())
}

$console = New-Object System.Collections.Generic.List[string]

Send-Cdp ('{"id":1,"method":"Runtime.enable"}')
Send-Cdp ('{"id":2,"method":"Page.enable"}')
for ($i = 0; $i -lt 6; $i++) {
  $m = Recv-Cdp
  if ($m -match 'consoleAPICalled|exceptionThrown|Log.entryAdded') { $console.Add($m) }
}

$id = ++$script:idCounter
$payload = @{ id = $id; method = 'Runtime.evaluate'; params = @{ expression = $expr; awaitPromise = $true; returnByValue = $true } } | ConvertTo-Json -Depth 8 -Compress
Send-Cdp $payload

$deadline = (Get-Date).AddSeconds(40)
$result = $null
while ((Get-Date) -lt $deadline) {
  if ($ws.State -ne 'Open') { break }
  $m = Recv-Cdp
  if ($m -match 'consoleAPICalled|exceptionThrown|Log.entryAdded') { $console.Add($m) }
  try {
    $obj = $m | ConvertFrom-Json
    if ($obj.id -eq $id) { $result = $obj; break }
  } catch {}
}

Write-Output '=== RESULT ==='
if ($result) {
  $val = $result.result.result.value
  if ($val) {
    $parsed = $val | ConvertFrom-Json
    $parsed.PSObject.Properties | ForEach-Object {
      $v = $_.Value
      if ($v -is [string]) { Write-Output ("{0}: {1}" -f $_.Name, $v) }
      else { Write-Output ("{0}: opacity={1} clip={2} tf={3}" -f $_.Name, $v.opacity, $v.clipPath, $v.transform); Write-Output ("    inline: {0}" -f $v.inline) }
    }
  } else {
    Write-Output ($result | ConvertTo-Json -Depth 8)
  }
} else { Write-Output 'evaluate timeout' }

Write-Output '=== CONSOLE ==='
$console | ForEach-Object {
  try {
    $c = $_ | ConvertFrom-Json
    if ($c.method -eq 'Runtime.consoleAPICalled') {
      $args = ($c.params.args | ForEach-Object { $_.value }) -join ' '
      Write-Output ("[{0}] {1}" -f $c.params.type, $args)
    } elseif ($c.method -eq 'Runtime.exceptionThrown') {
      Write-Output ("EXCEPTION: " + ($c.params.exceptionDetails.text + ' ' + $c.params.exceptionDetails.exception.description))
    }
  } catch { Write-Output $_ }
}

$ws.CloseAsync([Net.WebSockets.WebSocketCloseStatus]::NormalClosure, 'done', $ct).GetAwaiter().GetResult() | Out-Null
Get-CimInstance Win32_Process -Filter "Name = 'chrome.exe'" | Where-Object { $_.CommandLine -match 'sc-cdp-profile' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Write-Output 'done'