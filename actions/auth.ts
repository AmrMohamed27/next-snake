import { signInWithPopup, signOut, User } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, provider, db } from "../firebase";

// Sign in with Google

export const signInWithGoogle = async () => {
  try {
    // Sign in with Google using a popup window.
    const result = await signInWithPopup(auth, provider);
    // Save user to Firestore database
    await saveUserToFirestore(result.user);
    // Return the user object
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
  // Check if user is null
  if (!user) return;
  // Check if user is already saved in the database
  const userDoc = await getDoc(doc(db, "users", user.uid));
  const userData = userDoc.data();
  if (userData) return;
  // Save user to Firestore database
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
