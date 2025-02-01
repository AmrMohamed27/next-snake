// TODO: Fix Current User
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
import { db, user } from "../firebase";
import { ScoreDocument } from "@/types";

export const saveHighScore = async (userId: string, score: number) => {
  try {
    const scoresRef = collection(db, "highscores");
    const highscores = await getHighScores();
    if (!highscores) {
      console.log("No highscores found");
      return;
    }
    // Save score
    if (
      highscores.length < 10 ||
      score > Math.min(...highscores.map((s) => s.score))
    ) {
      const userData = (await getDoc(doc(db, "users", userId))).data();
      console.log(userData);
      const newScore: ScoreDocument = {
        name: userData?.name ?? "Anonymous",
        score,
        timestamp: new Date(),
      };
      await addDoc(scoresRef, newScore);
      console.log("Score saved!");
      if (userData) {
        console.log("User exists");
        if (!userData.score || userData.score < score) {
          await setDoc(doc(db, "users", userId), {
            ...userData,
            score,
          });
        }
      } else {
        console.log("User does not exist");
      }
    } else {
      console.log("Not a high score, sorry!");
    }
  } catch (error) {
    console.error("Error saving score:", error);
  }
};

export const getHighScores = async () => {
  try {
    const scoresRef = collection(db, "highscores");
    // Get current leaderboard (top 10 scores)
    const q = query(scoresRef, orderBy("score", "desc"), limit(10));
    const snapshot = await getDocs(q);
    const scores: ScoreDocument[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        name: data.name,
        score: data.score,
        timestamp: data.timestamp.toDate(), // Firestore timestamps need conversion
      };
    });
    return scores;
  } catch (error) {
    console.error("Error getting high scores:", error);
  }
};
