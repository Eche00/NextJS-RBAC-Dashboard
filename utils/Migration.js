//* This Code helps migrate users to a new db
import { getDocs, collection, setDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAuth } from 'firebase/auth';

export const migrateUsersToCollection = async (originCollection = 'users', targetCollection = 'geeks') => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    // Check if the user is authenticated
    if (!currentUser) {
      return { success: false, message: 'User is not authenticated.' };
    }

    // Get ID token result to check custom claims
    const idTokenResult = await currentUser.getIdTokenResult();
    const isAdmin = idTokenResult.claims.admin; 

    if (!isAdmin) {
      return { success: false, message: 'User does not have admin privileges.' };
    }

    // If the user is an admin, proceed with the migration process
    const usersSnapshot = await getDocs(collection(db, originCollection));

    // Check if any users exist in the origin collection
    if (usersSnapshot.empty) {
      return { success: false, message: `No users found in the "${originCollection}" collection.` };
    }

    // Loop through each document in origin collection and migrate to target collection
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const userId = userDoc.id;

      // Clone the data to the target collection
      const targetDocRef = doc(db, targetCollection, userId);

      // Set the document in the target collection
      await setDoc(targetDocRef, userData);
    }

    // If migration is successful
    return { success: true, message: `Migration from "${originCollection}" to "${targetCollection}" was successful!` };

  } catch (error) {
    return { success: false, message: `Error migrating user data: ${error.message}` };
  }
};
