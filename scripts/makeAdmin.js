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
 * Make a user an admin and force logout
 * @param {string} uid - Firebase Auth UID
 */
async function makeAdmin(uid) {
  if (!uid) {
    console.error("❌ UID is required");
    process.exit(1);
  }

  try {
    // Set custom claims
    await admin.auth().setCustomUserClaims(uid, {
      admin: true,
      moderator: false,
    });

    // Revoke refresh tokens to force logout
    await admin.auth().revokeRefreshTokens(uid);

    console.log(`✅ ${uid} is now an ADMIN and has been logged out successfully`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting admin:", error);
    process.exit(1);
  }
}

// Replace with the real UID of the user you want to make admin
makeAdmin("xyzUserUID12345");
