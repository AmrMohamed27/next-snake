import { getHighScores } from "@/actions/highscore";
import HighscoresTable from "@/components/HighscoresTable";
import { highscoresHeader } from "@/constants";
import { Trophy } from "lucide-react";
import React from "react";

const page = async () => {
  // Get highscores
  const highScores = await getHighScores();
  // Check if highscores exist
  if (!highScores || highScores.length === 0) {
    return <div>No highscores found</div>;
  }
  return (
    <div className="flex flex-col items-center gap-8 main-padding-x">
      <div className="flex flex-row items-center gap-4">
        <Trophy />
        <h1 className="text-3xl">{highscoresHeader}</h1>
      </div>
      {/* Render highscores table in a separate client component as this page is a server component */}
      <HighscoresTable highScores={highScores} />
    </div>
  );
};

export default page;
