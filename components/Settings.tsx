"use client";
import React, { useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { muteText } from "@/constants";
import { useParams } from "@/hooks/use-params";

const Settings = () => {
  const { searchParams, handleChangeParam } = useParams();
  function handleMuteChange(checked: boolean) {
    if (checked) {
      handleChangeParam("mute", "1");
    } else {
      handleChangeParam("mute", "0");
    }
  }
  // Check if the mute parameter is in the URL query parameters and is valid i.e. 1 or 0
  useEffect(() => {
    if (searchParams.has("mute")) {
      // Check if the mute parameter is a valid number
      if (isNaN(parseInt(searchParams.get("mute")!))) {
        handleChangeParam("mute", "0");
      }
      // Check if the mute parameter is 1 or 0
      else if (
        parseInt(searchParams.get("mute")!) !== 0 &&
        parseInt(searchParams.get("mute")!) !== 1
      ) {
        handleChangeParam("mute", "0");
      }
    }
  }, [handleChangeParam, searchParams]);
  const muted = searchParams.get("mute") ?? "0";
  return (
    <div className="flex flex-col gap-4 items-center justify-center lg:h-[400px] mb-8">
      {/* Mute Sound Effects */}
      <div className="flex flex-row items-center gap-2">
        <Checkbox
          id="mute"
          className="cursor-pointer"
          defaultChecked={muted === "1"}
          onCheckedChange={(checked) => {
            if (checked === "indeterminate") return;
            handleMuteChange(checked);
          }}
        />
        <label htmlFor="mute">{muteText}</label>
      </div>
    </div>
  );
};

export default Settings;
