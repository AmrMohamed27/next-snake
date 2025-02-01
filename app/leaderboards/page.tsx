import { getHighScores } from "@/actions/highscore";
import React from "react";

const page = async () => {
  const highScores = await getHighScores();
  return (
    <div className="flex flex-col items-center gap-8">
      {highScores?.map((highScore, index) => (
        <div key={index} className="flex flex-row items-center gap-4">
          <p>{highScore.name}</p>
          <p>{highScore.score}</p>
          <p>{highScore.timestamp.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default page;
