const admin = require('firebase-admin');
const serviceAccount = require('./smartcareerplanning-4f778-firebase-adminsdk-fbsvc-8391456c33.json');

// Initialize your Firebase Admin SDK with service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://smartcareerplanning-4f778-default-rtdb.firebaseio.com'
});

const db = admin.firestore();

async function setPremiumForAllUsers(duration = 12) {
  // Get all users from the database
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();

  if (snapshot.empty) {
    console.log('No users found in the database.');
    return { success: false, message: 'No users found' };
  }

  // Calculate expiration date
  const now = new Date();
  const expirationDate = new Date(now.setMonth(now.getMonth() + duration));

  let updatedCount = 0;
  let errorCount = 0;

  try {
    const updatePromises = [];
    
    snapshot.forEach(doc => {
      const updatePromise = doc.ref.update({ 
        isPremium: true,
        subscription: {
          status: 'active',
          plan: 'admin_granted',
          current_period_end: expirationDate,
          cancel_at_period_end: true,
          updated_at: admin.firestore.FieldValue.serverTimestamp(),
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        updatedCount++;
        console.log(`Updated user ${doc.id} to premium for ${duration} months.`);
      })
      .catch(error => {
        errorCount++;
        console.error(`Error updating user ${doc.id}:`, error);
      });
      
      updatePromises.push(updatePromise);
    });
    
    await Promise.all(updatePromises);
    
    return { 
      success: true, 
      message: `Premium access granted to ${updatedCount} users for ${duration} months. Failed: ${errorCount} users.` 
    };
  } catch (error) {
    console.error('Error granting premium access to all users:', error);
    return { success: false, message: error.message };
  }
}

// Original function kept for reference
async function setPremium(email, duration = 12) {
  // Find the user by email
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('email', '==', email).get();

  if (snapshot.empty) {
    console.log('No matching user.');
    return { success: false, message: 'User not found' };
  }

  // Calculate expiration date
  const now = new Date();
  const expirationDate = new Date(now.setMonth(now.getMonth() + duration));

  try {
    snapshot.forEach(doc => {
      doc.ref.update({ 
        isPremium: true,
        subscription: {
          status: 'active',
          plan: 'admin_granted',
          current_period_end: expirationDate,
          cancel_at_period_end: true,
          updated_at: admin.firestore.FieldValue.serverTimestamp(),
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`Updated ${email} to premium for ${duration} months.`);
    });
    return { success: true, message: `Premium access granted to ${email} for ${duration} months` };
  } catch (error) {
    console.error('Error granting premium access:', error);
    return { success: false, message: error.message };
  }
}

// Call the function to set premium for all users
setPremiumForAllUsers(12)
  .then(result => {
    console.log(result);
    process.exit(0);
  })
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });