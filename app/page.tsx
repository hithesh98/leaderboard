import LeaderboardPanel from "@/components/leaderboard-panel";

export default function Home() {
  return (
    <main className="min-h-screen bg-green-500">
      <LeaderboardPanel user="creator" />
    </main>
  );
}
