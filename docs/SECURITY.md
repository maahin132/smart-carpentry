# Smart Carpentry — Security Guide

## 1. Purpose

This document defines the security principles and implementation requirements for the Smart Carpentry platform.

Security applies to:

- React frontend
- Django backend
- Django REST Framework APIs
- MySQL database
- Authentication
- Authorization
- User data
- Business data
- Administrative operations
- Production deployment

Security must be considered throughout development rather than added only before deployment.

---

# 2. Security Principles

The application follows these principles:

- Least privilege
- Secure by default
- Server-side authorization
- Defense in depth
- Input validation
- Secure secret management
- Minimal data exposure
- Safe error handling
- Dependency maintenance
- Secure production configuration

---

# 3. Authentication

The initial authentication system uses Django authentication with secure sessions.

Authentication must:

- Validate credentials on the backend
- Hash passwords using Django's password hashing system
- Create secure authenticated sessions
- Support logout
- Protect authenticated endpoints
- Prevent unauthorized access

Passwords must never be stored in plain text.

---

# 4. Password Security

Passwords must be handled exclusively by Django's authentication framework.

Requirements:

- Never store plain-text passwords
- Never log passwords
- Never return passwords through APIs
- Never expose password hashes through API responses
- Use Django's password validators
- Encourage strong passwords
- Protect password reset functionality

---

# 5. Authorization

Authentication answers:

> Who is the user?

Authorization answers:

> What is this user allowed to do?

Authorization must always be enforced on the backend.

Example roles:

```text
user
admin