# Smart Carpentry — Deployment Guide

## 1. Purpose

This document defines the deployment approach for the Smart Carpentry platform.

The platform consists of:

- React frontend
- Django backend
- Django REST Framework API
- MySQL database
- Static assets
- Media files
- Environment-specific configuration

The deployment process should prioritize:

- Security
- Reliability
- Reproducibility
- Performance
- Maintainability
- Safe configuration management

---

# 2. Deployment Architecture

The production architecture follows this general structure:

```text
User Browser
     │
     ▼
HTTPS
     │
     ▼
Web Server / Reverse Proxy
     │
     ├───────────────┐
     ▼               ▼
React Frontend    Django Backend
                     │
                     ▼
                 Django ORM
                     │
                     ▼
                   MySQL