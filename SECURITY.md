# Security and Admin Panel Documentation

This document outlines the **security practices, access control, and administrative features** of the RBAC Dashboard.  
It is intended for developers, administrators, and auditors to understand how the system enforces role-based access, protects sensitive data, and manages user operations.

---

## Table of Contents

1. [Overview](#overview)
2. [Admin Routes](#admin-routes)
3. [User Management](#user-management)
6. [Pending Features](#pending-features)
7. [Security Practices](#security-practices)
8. [Data Handling and Migration](#data-handling-and-migration)
9. [Best Practices for Admin Access](#best-practices-for-admin-access)

---

## Overview

The admin panel provides a centralized interface for managing users, and system-level analytics.  

Access to the admin panel is restricted to **users with the 'Admin' role**. All actions are audited, and sensitive operations are performed via **server-side Firebase functions** or secure API endpoints.  

Key capabilities include:

- Viewing system-wide statistics and analytics
- Full user management (view, edit, fund management)
- Data migration and extraction

---

## Admin Routes

The following routes are restricted to Admin users only:

| Route | Functionality |
|-------|---------------|
| `/(admin)/access` | Displays system statistics: total admin users, top earning users, gender distribution, rank distribution, and search functionality |
| `/(admin)/users` | View and manage all users, search and filter by role, status, and other criteria; allows full editing of user data including account balance |


> All admin routes enforce **server-side role validation** and **route guards** to prevent unauthorized access.

---

## User Management

### Features

- Search and filter users by:
  - Role
  - Status (active, pending, suspended)
  - Earnings
- Edit user profile data:
  - Name, email, and contact info
  - Account balance / add funds
- Data export and migration:
  - Extract user data from Firebase collections
  - Migrate user records to new collections or database structures
- Audit logging for all sensitive actions

### Security Considerations

- All edits are logged server-side
- Direct database writes by the frontend are prohibited
- Only Admin users can perform sensitive operations

---

## Security Practices

1. **Authentication and Authorization**
   - Firebase Authentication is used for login
   - User roles are retrieved from the database and enforced both server-side and client-side
   - All Admin routes are protected with route guards and role verification

2. **Data Protection**
   - Sensitive user data is only accessible by Admin users
   - Passwords and authentication tokens are never exposed in the frontend
   - Environment variables store API keys and credentials

3. **Server-Side Enforcement**
   - Actions such as fund addition, role updates, and course moderation are validated server-side
   - Frontend-only checks are supplemental and not relied upon

4. **Audit and Logging**
   - All sensitive operations are logged
   - Logs include user ID, timestamp, action type, and affected records
   - Logs are used for accountability and security reviews

5. **Environment Security**
   - Secrets (Firebase keys, SMTP credentials) are stored in `.env` files
   - No credentials are committed to version control
   - Access to production databases is restricted to authorized admin users

---

## Data Handling and Migration

Admin users have the ability to:

- Extract user data for reporting or backup purposes
- Migrate user records to new database collections
- Perform batch updates safely using scripts (`scripts/` directory)

All migration actions:

- Require Admin privileges
- Are performed via secure server-side functions
- Maintain logs for traceability

---


## Summary

This documentation ensures that **all Admin panel operations are performed securely**, with proper RBAC enforcement, server-side validation, and audit logging.  

It serves as both a **developer reference** and **security guideline** for ongoing maintenance and feature expansion.
