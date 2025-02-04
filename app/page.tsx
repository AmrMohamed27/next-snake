"use client";
import Difficulty from "@/components/Difficulty";
import GameCanvas from "@/components/GameCanvas";
import Settings from "@/components/Settings";
import { homeHeader, homeSubheader } from "@/constants";
import { useAuth } from "@/hooks/use-auth";
import { toSnakeCase } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  const user = useAuth();
  return (
    <div className="flex flex-col items-center gap-8 main-padding-x min-h-[calc(100vh-150px)]">
      {/* Header */}
      <h1 className="text-xl md:text-3xl text-center hidden sm:block">{`${homeHeader}, ${toSnakeCase(
        user?.displayName ?? "dear_visitor"
      )}!`}</h1>
      <h2 className="text-sm md:text-base hidden sm:block">{homeSubheader}</h2>
      {/* Game Area */}
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-4 lg:gap-0">
        {/* Difficulty Levels */}
        <Suspense fallback={<Loader />}>
          <Difficulty />
          {/* Game Canvas */}
          <GameCanvas />
          {/* Settings */}
          <Settings />
        </Suspense>
      </div>
    </div>
  );
}
