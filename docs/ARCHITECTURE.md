# Smart Carpentry — System Architecture

## 1. Purpose

This document defines the technical architecture of the Smart Carpentry platform.

The architecture is designed to keep the application maintainable, modular, secure, and scalable while separating presentation, business logic, data management, and infrastructure responsibilities.

Smart Carpentry is structured as a monorepo containing:

- React frontend
- Django backend
- REST API layer
- Relational database
- Shared project documentation

---

## 2. High-Level Architecture

```text
                         SMART CARPENTRY
                              │
              ┌───────────────┴───────────────┐
              │                               │
        Public Website                  User Application
              │                               │
              └───────────────┬───────────────┘
                              │
                         React Frontend
                              │
                         Axios API Layer
                              │
                         HTTP / HTTPS
                              │
                    Django REST Framework
                              │
              ┌───────────────┼───────────────┐
              │               │               │
         Authentication   Business Logic   API Services
              │               │               │
              └───────────────┼───────────────┘
                              │
                       Django Data Layer
                              │
                         Database
                       ┌──────┴──────┐
                       │             │
                    SQLite         MySQL
                  Development    Production