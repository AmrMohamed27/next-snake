import { signInWithPopup, signOut, User } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, provider, db } from "../firebase";

// Sign in with Google

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    await saveUserToFirestore(result.user); // Save to Firestore
    return result.user;
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

// Sign out
export const handleSignOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Save user to database
export const saveUserToFirestore = async (user: User | null): Promise<void> => {
  if (!user) return;
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
  } catch (error) {
    console.error("Error saving user:", error);
  }
};
