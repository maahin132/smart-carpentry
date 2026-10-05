# Smart Carpentry — Development Guide

## 1. Purpose

This document defines the local development workflow for the Smart Carpentry project.

It explains the development environment, project setup, environment configuration, application startup, testing workflow, and Git conventions.

The goal is to keep development consistent, reproducible, and maintainable.

---

# 2. Project Structure

Smart Carpentry uses a monorepo structure.

```text
smart-carpentry/
│
├── frontend/          # React application
├── backend/           # Django application
├── docs/              # Project documentation
├── .github/           # GitHub configuration
├── .gitignore
└── README.md