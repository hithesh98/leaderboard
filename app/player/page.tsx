import LeaderboardPanel from "@/components/leaderboard-panel";

export default function Home() {
  return (
    <div className="min-h-screen bg-green-500">
      <LeaderboardPanel user="player" />
    </div>
  );
}
