import { getHighScores } from "@/actions/highscore";
import HighscoresTable from "@/components/HighscoresTable";
import React from "react";

const page = async () => {
  const highScores = await getHighScores();
  if (!highScores) {
    return <div>No highscores found</div>;
  }
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-row items-center gap-4">
        <HighscoresTable highScores={highScores} />
      </div>
    </div>
  );
};

export default page;
