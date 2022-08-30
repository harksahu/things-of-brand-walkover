
import admin from "firebase-admin";

import serviceAccount from "./web-auth-ff19c-firebase-adminsdk-vfm9f-100b9bc626.json" assert {type: 'json'};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



export default admin;