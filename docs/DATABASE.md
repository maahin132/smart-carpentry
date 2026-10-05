# Smart Carpentry — Database Design

## 1. Purpose

This document defines the initial database architecture for Smart Carpentry.

The database is responsible for storing persistent application and business information including users, materials, pricing, furniture templates, estimates, cutting plans, quotations, and related records.

The design prioritizes:

- Clear relationships
- Data integrity
- Maintainability
- Historical accuracy
- Business-data separation
- Future scalability

The database schema will evolve as implementation requirements become clearer.

---

# 2. Database Strategy

MySQL is the primary relational database for Smart Carpentry.

The same database technology will be used during both development and production.

```text
Development → MySQL
Production  → MySQL