// src/lib/firebase-admin.ts
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../../firebase-service-account.json"; // adjust path as needed

const app = initializeApp({
  credential: cert(serviceAccount as any),
});

export const adminAuth = getAuth(app);
