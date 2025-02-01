"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import { difficulties } from "@/constants";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div className="relative flex h-64 w-12 items-center">
    {/* Labels */}
    <div className="absolute left-8 flex h-full flex-col justify-between text-sm text-muted-foreground">
      {difficulties.map((level) => (
        <span key={level} className="mr-2 text-white">
          {level}
        </span>
      ))}
    </div>

    {/* Slider */}
    <SliderPrimitive.Root
      ref={ref}
      orientation="vertical"
      className={cn(
        "relative flex h-full w-6 touch-none select-none flex-col items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative w-1.5 h-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute w-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  </div>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
