import { auth, FIRESTORE_DB } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
  const users = await getDocs(collection(FIRESTORE_DB, "users"));
  //if its a first user, set it as admin
  let isAdmin = false;
  if (users.empty) {
    isAdmin = true;
  }
  await setDoc(doc(FIRESTORE_DB, "users", email), {
    email: email,
    password: password,
    roles: [isAdmin ? "admin" : "student"],
  });
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
