# RBAC Dashboard — Next.js Boilerplate

A production-ready **Role-Based Access Control (RBAC) dashboard boilerplate** built with **Next.js App Router** and **Firebase**.  
This project is designed to help developers quickly build secure dashboards where **users see different pages, routes, and actions based on their role**.

The boilerplate focuses on clean structure, scalable access control, and real-world authentication patterns.

---

## What This Project Is

This is a **starter dashboard framework** that provides:

- Firebase Authentication for secure user login
- Role-based access control enforced at both route and UI level
- Protected dashboard routing using the Next.js App Router
- Centralized auth and role management
- A clean layout system for dashboards
- A foundation that can scale to admin panels, SaaS tools, and internal systems

It is **not** a finished product.  
It is meant to be extended for real applications.

---

## Core Concepts

RBAC is the idea that **users are assigned roles**, and those roles determine:

- Which routes they can access
- Which dashboard pages they can see
- Which UI components are rendered
- Which actions they are allowed to perform

This boilerplate enforces RBAC in a predictable and reusable way.

---

## Roles Supported

The system is designed to support roles such as:

- **Admin**
- **Moderator**
- **User**
- **Custom roles** (can be added easily)

Each role can be mapped to:
- Specific dashboard routes
- Specific UI permissions
- Specific layouts if needed

Roles are stored and retrieved from Firebase and injected into the app state.

---

## Scripts Directory (`scripts/`)

The `scripts/` directory contains local administrative utilities.

### Purpose

Scripts are used to:

- Assign roles such as admin or moderator
- Revoke roles
- Perform direct role updates without UI access
- Avoid manual database edits

Example files:

`scripts/`

`├─ makeAdmin.js`

`├─ makeModerator.js`

`└─ revokeAdmin.js`


### Usage Guidelines

- Scripts are run locally
- They interact directly with Firebase
- They are never bundled into the frontend
- They are excluded from production builds

This keeps the application logic clean while giving developers safe admin tools.


---

## styles/ Directory

This project intentionally avoids TailwindCSS.

Styling approach:

- Plain CSS
- Global styles live in `styles/`
- Layout-level styles are scoped when necessary
- No CSS-in-JS dependency

This keeps the project simple and framework-agnostic, while allowing teams to migrate to Tailwind or another system later.

---

## JavaScript-First, TypeScript-Ready

The project currently uses JavaScript.

However:

- Folder structure supports TypeScript migration
- Logic is written with type safety in mind
- Context values are clearly defined
- No architectural decisions block future TypeScript adoption

Teams can migrate incrementally without restructuring the app.


---

## Authentication Flow

1. User signs in using Firebase Authentication
2. Firebase returns the authenticated user
3. The app fetches the user’s role from the database
4. The role is stored in global state
5. Route guards and UI checks are applied
6. User is redirected to the correct dashboard entry point

If authentication or role data is missing, the user is redirected safely.

---

## Route Protection Strategy

### Server-Level Protection
- Routes check authentication before rendering
- Unauthorized users are redirected early

### Client-Level Protection
- UI components conditionally render based on role
- Navigation hides inaccessible links
- Actions are blocked if permissions are missing

This dual approach prevents both:
- Accidental access
- UI-based privilege escalation

### App Router Structure

The project uses the **Next.js App Router**, where routing behavior is defined by folders rather than configuration files.

Each directory under `app/` represents a route segment. Folders wrapped in parentheses are **route groups**.

Examples: `(user)`, `(admin)`, `(auth)`, etc.


Important notes:

- Route groups do not appear in the URL
- They are used for organization, layouts, and access control
- Each route group can define its own layout, error, and not-found pages

Example structure:
`app/(admin)/dashboard/page.js` becomes `/dashboard` in the url path

The `(admin)` folder exists purely for structure and authorization logic, just like the others.

---

## Layout System

The dashboard uses a shared layout that provides:

- Sidebar navigation
- Role-aware menu items
- Consistent spacing and structure

Public pages do **not** use this layout.

---

## Auth State Management

Authentication and user role data are managed through a central context.

Responsibilities include:
- Tracking login state
- Storing user profile data
- Providing role information
- Handling logout
- Exposing helper utilities for permission checks

This avoids prop drilling and keeps access logic consistent.

---

## Firebase Integration

Firebase is used as the backend authentication and identity provider.

### Firebase Responsibilities

- User authentication
- Session persistence
- Secure identity verification
- Role retrieval from the database

Sensitive credentials are never committed to version control.

---


## Security Considerations

This boilerplate follows best practices:

- No secrets committed to GitHub
- Environment variables used for credentials
- Roles validated before rendering protected routes
- Dashboard access blocked at multiple layers
- No trust placed on client-only checks

---

## Development Philosophy

This project is designed to be:

- Easy to extend
- Safe by default
- Clear in structure
- Friendly for teams
- Suitable for production scaling

You can plug in APIs, databases, or payment systems on top of this foundation.

---

## Use Cases

This boilerplate is suitable for:

- Admin dashboards
- SaaS back offices
- Internal company tools
- Moderation panels
- Analytics dashboards
- Multi-role platforms

---

## Customization

You can easily customize:

- Role names
- Route access rules
- Dashboard layout
- Navigation items
- Auth providers
- UI components

The structure is intentionally flexible.

---

# Keeping the Stack Always Up to Date

This boilerplate is designed to remain modern and maintainable over time.  
To achieve this, developers are expected to **regularly upgrade Next.js, React, and all core dependencies**.

Staying current prevents security risks, reduces technical debt, and ensures long-term scalability.

---

## Upgrade Philosophy

The project follows these principles:

- Stay close to the latest stable releases
- Avoid deprecated APIs early
- Upgrade frequently in small steps
- Treat upgrades as routine maintenance

Regular updates are easier and safer than large, infrequent upgrades.

---

## Upgrading Next.js

Next.js evolves rapidly, especially around the App Router and routing conventions.

### Recommended Practice

- Upgrade to the latest stable version as soon as possible
- Avoid locking to old versions unless absolutely necessary
- Always review the official release notes

Upgrade command:
```bash
npm install next@latest
```
After upgrading:

- Run the development server

- Verify layouts and route groups still behave correctly

- Check for warnings related to routing, metadata, or rendering

This boilerplate is structured to align closely with Next.js best practices, minimizing breaking changes.

## Upgrading React

React upgrades are generally safe when performed regularly.

Upgrade command:
```bash
npm install react@latest react-dom@latest
```
After upgrading:

- Verify AuthContext behavior

- Confirm layouts render correctly

- Watch for strict mode or deprecation warnings

- The project avoids legacy React patterns, making upgrades smoother.



### Managing Project Dependencies

Checking for Outdated Packages

Run:
```bash
npm outdated
```

### Safe Updates

For non-breaking updates:
```bash
npm update
```

For major version updates:
```bash
npm install package-name@latest
```

Test the application after each upgrade batch.