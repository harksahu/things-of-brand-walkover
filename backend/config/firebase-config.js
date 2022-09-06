
import admin from "firebase-admin";

import serviceAccount from "./things-of-brand-firebase-adminsdk-tuqm8-9e3628ec92.json" assert {type: 'json'};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



export default admin;