import GameCanvas from "@/components/GameCanvas";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 main-padding-x">
      <GameCanvas />
    </div>
  );
}
