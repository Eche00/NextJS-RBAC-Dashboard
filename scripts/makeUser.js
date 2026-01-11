const admin = require("firebase-admin");
const path = require("path");

// Load Firebase service account key
const serviceAccount = require(path.join(
  __dirname,
  "serviceAccountKey.json"
));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/**
 * Make a user a normal user (remove all elevated roles) and force logout
 * @param {string} uid - Firebase Auth UID
 */
async function makeUser(uid) {
  if (!uid) {
    console.error("❌ UID is required");
    process.exit(1);
  }

  try {
    // Remove all role-based claims
    await admin.auth().setCustomUserClaims(uid, {
      admin: false,
      moderator: false,
    });

    // Revoke refresh tokens to force logout
    await admin.auth().revokeRefreshTokens(uid);

    console.log(`✅ ${uid} is now a NORMAL USER and has been logged out successfully`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting user role:", error);
    process.exit(1);
  }
}

// Replace with the real UID of the user you want to downgrade
makeUser("PASTE_USER_UID_HERE");
