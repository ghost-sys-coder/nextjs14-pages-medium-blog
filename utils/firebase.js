import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const configFile = {
  key: process.env.FIREBASE_API_KEY,
  domain: process.env.FIREBASE_AUTHDOMAIN,
  id: process.env.FIREBASE_PROJECTID,
  bucket: process.env.FIREBASE_STORAGE_BUCKET,
  senderID: process.env.FIREBASE_MESSENGER_ID,
  appID: process.env.FIREBASE_APPID,
};

//Your web app's Firebase Configuration
const firebaseConfig = {
  apiKey: configFile.key,
  authDomain: configFile.domain,
  projectId: configFile.id,
  storageBucket: "personal-blog-next.appspot.com",
  messagingSenderId: configFile.senderID,
  appId: configFile.appID,
};

//Initialize Firebase app
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
