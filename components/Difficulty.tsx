"use client";
import React, { useCallback, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { difficultiesTitle } from "@/constants";
import { useParams } from "@/hooks/use-params";

const Difficulty = () => {
  // Get the current URL query parameters
  const { searchParams, handleChangeParam } = useParams();
  //   Function to handle difficulty level change
  const handleChangeDifficulty = useCallback(
    (newValue: number[]) => {
      // Check if newValue is empty
      if (!newValue || newValue.length === 0) return;
      // Create a new query string with the new difficulty level
      handleChangeParam("difficulty", newValue[0].toString());
    },
    [handleChangeParam]
  );
  // Make sure the difficulty level is valid i.e. between 1 and 5
  useEffect(() => {
    // Check if the difficulty level is not in the URL query parameters
    if (searchParams.has("difficulty")) {
      // Check if the difficulty level is a valid number
      if (isNaN(parseInt(searchParams.get("difficulty")!))) {
        handleChangeDifficulty([1]);
      }
      // Check if the difficulty level is between 1 and 5
      else if (
        parseInt(searchParams.get("difficulty")!) > 5 ||
        parseInt(searchParams.get("difficulty")!) < 1
      ) {
        handleChangeDifficulty([1]);
      }
    }
    // If the difficulty level is not in the URL query parameters, set it to "1"
    else {
      handleChangeDifficulty([1]);
    }
  }, [handleChangeDifficulty, searchParams]);
  //   Get the difficulty level from the URL query parameters, default to "1" if not found
  const difficulty = searchParams.get("difficulty") ?? "1";
  const numberDifficulty =
    parseInt(difficulty) > 5 || parseInt(difficulty) < 1
      ? 1
      : parseInt(difficulty);

  return (
    <div className={cn("flex flex-col items-center justify-center h-[400px]")}>
      <Slider
        defaultValue={[numberDifficulty]}
        min={1}
        max={5}
        step={1}
        onValueChange={handleChangeDifficulty}
        // Prevent arrow keys from affecting the slider
        onKeyDown={(e) => {
          if (
            ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
          ) {
            e.preventDefault();
          }
        }}
      />
      <span className="text-sm mt-8">{difficultiesTitle}</span>
    </div>
  );
};

export default Difficulty;
