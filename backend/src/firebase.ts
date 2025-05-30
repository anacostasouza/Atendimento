import admin from 'firebase-admin'
import serviceAccount from '../firebaseKey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

export const db = admin.firestore()
