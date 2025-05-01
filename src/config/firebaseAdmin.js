const admin = require('firebase-admin');
const serviceAccount = require('../../smartcareerplanning-4f778-firebase-adminsdk-fbsvc-8391456c33.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://smartcareerplanning-4f778-default-rtdb.firebaseio.com'
});
module.exports = admin;