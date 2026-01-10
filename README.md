# 🚀 Sarcastic Geeks Trybe — Next.js Boilerplate

A scalable starter boilerplate for **Next.js (App Router)** featuring:

✅ Firebase Authentication  
✅ Public + User + Admin Layouts  
✅ Role-Based Routes & Session Guard  
✅ Sidebar + Mobile Navigation System  
✅ SEO-Ready Structure  
✅ Pure CSS (No Tailwind)  
✅ Supports Future API & DB Integration  

Perfect for SaaS, dashboards, tech community platforms, startup apps, etc.

## 🧠 How Auth Works

### ✅ Public visitor
- Sees _public_ navbar
- Can browse public pages
- Cannot access dashboard/admin

### ✅ Logged-in user
- Sees _user_ header + sidebar
- Can access `/dashboard/*`

### ✅ Admin user (`role: admin`)
- Can access `/(admin)`
- Redirects non-admin users back to dashboard

---

## 🔐 Role Redirect Logic

| State | Layout Shown | Redirect |
|-------|--------------|---------|
| Not logged in | Public | None |
| Logged in | User Dashboard Layout | — |
| Logged in but visits `/(admin)` | User redirected to `/dashboard` |
| Admin visits `/(admin)` | Admin Layout | — |

---