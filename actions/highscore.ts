import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ScoreDocument } from "@/types";

export const saveHighScore = async (userId: string, score: number) => {
  try {
    // Get highscores collection
    const scoresRef = collection(db, "highscores");
    // Fetch highscores
    const highscores = await getHighScores();
    // Check if highscores exist
    if (!highscores) {
      console.log("No highscores found");
      return;
    }
    // Save score if it's a high score
    if (
      highscores.length < 10 ||
      score > Math.min(...highscores.map((s) => s.score))
    ) {
      // Get user data with the user's ID
      const userData = (await getDoc(doc(db, "users", userId))).data();
      // Create a new score document
      const newScore: ScoreDocument = {
        name: userData?.name ?? "Anonymous",
        score,
        timestamp: new Date(),
      };
      // Save the score to the database
      await addDoc(scoresRef, newScore);
      // Update the user's score if it's higher than the saved one
      if (userData) {
        if (!userData.score || userData.score < score) {
          await setDoc(doc(db, "users", userId), {
            ...userData,
            score,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error saving score:", error);
  }
};

export const getHighScores = async () => {
  try {
    // Get the highscores collection
    const scoresRef = collection(db, "highscores");
    // Query to get current leaderboard (top 10 scores) sorted by score in descending order
    const q = query(scoresRef, orderBy("score", "desc"), limit(10));
    // Get all the documents returned by the query
    const snapshot = await getDocs(q);
    // Extract the data from each document
    const scores: ScoreDocument[] = snapshot.docs.map((doc) => {
      // Get the document's data
      const data = doc.data();
      // Extract the data into an object.
      const score: ScoreDocument = {
        name: data.name,
        score: data.score,
        timestamp: data.timestamp.toDate(), // Firestore timestamps need conversion
      };
      return score;
    });
    return scores;
  } catch (error) {
    console.error("Error getting high scores:", error);
  }
};
