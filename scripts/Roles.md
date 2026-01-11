# 🔐 Firebase Role Management (Local & Secure)

This project uses **Firebase Custom Claims** to manage user roles
(Admin, Moderator, User) securely.

Roles are assigned using **local Node.js scripts** and the
Firebase Admin SDK.

No Cloud Functions.
No paid Firebase plan.
No frontend exposure.

---

## 🧠 Role Model

We use boolean custom claims:

- `admin: true`
- `moderator: true`

Only one elevated role is active at a time.

---

## 📁 Scripts Location

All role scripts live in: `/scripts`


Each script:
- Runs locally
- Uses a Firebase service account key
- Modifies Firebase Auth user claims

---

## 🔑 Service Account Key

The file:

Must:
- Be generated from Firebase Console → Project Settings → Service Accounts
- NEVER be committed to Git
- Be listed in `.gitignore`

---

## ▶️ How to Run a Script

1. Get the user's **UID** from Firebase Auth
2. Open the script you want
3. Replace:

```js
makeAdmin("PASTE_USER_UID_HERE");
```


### How to run the script

For example we need to make user an admin

```
node scripts/makeAdmin.js
```