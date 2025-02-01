"use client";
import Difficulty from "@/components/Difficulty";
import GameCanvas from "@/components/GameCanvas";
import Settings from "@/components/Settings";
import { homeHeader, homeSubheader } from "@/constants";
import { useAuth } from "@/hooks/use-auth";
import { toSnakeCase } from "@/lib/utils";

export default function Home() {
  const user = useAuth();
  return (
    <div className="flex flex-col items-center gap-8 main-padding-x">
      {/* Header */}
      <h1 className="text-3xl">{`${homeHeader}, ${toSnakeCase(
        user?.displayName ?? "dear_visitor"
      )}!`}</h1>
      <h2>{homeSubheader}</h2>
      {/* Game Area */}
      <div className="w-full main-padding-x flex flex-row items-start justify-between">
        {/* Difficulty Levels */}
        <Difficulty />
        {/* Game Canvas */}
        <GameCanvas />
        {/* Settings */}
        <Settings />
      </div>
    </div>
  );
}
