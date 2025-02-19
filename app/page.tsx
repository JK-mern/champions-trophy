import { Trophy, Calendar } from "lucide-react";
import Navbar from "./components/Navbar";

interface Match {
  id: number;
  team1: string;
  team2: string;
  date: string;
  result: string;
}

interface Leader {
  id: number;
  fullname: string;
  points: number;
}

async function getMatches(): Promise<Match[]> {
  const res = await fetch("http://localhost:3000/api/matches/allmatches", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch matches");
  return res.json();
}

async function getLeader(): Promise<Leader> {
  const res = await fetch("http://localhost:3000/api/user/leader", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch leader");
  return res.json();
}

export default async function Home() {
  const [matches, leader] = await Promise.all([getMatches(), getLeader()]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 transform hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-6">
            <div className="bg-yellow-50 p-4 rounded-full">
              <Trophy className="h-12 w-12 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                Current Leader
              </h2>
              <p className="text-lg text-gray-600">
                {leader.fullname} -{" "}
                <span className="font-bold text-blue-600">
                  {leader.points} points
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center gap-3">
            <Calendar className="h-7 w-7 text-blue-600" />
            Upcoming & Recent Matches
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {matches.map((match) => (
              <div
                key={match.id}
                className="border rounded-xl p-6 hover:shadow-lg transition-all hover:border-blue-200 group"
              >
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-500">
                      {match.date}
                    </span>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        match.result === "Not Played"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {match.result}
                    </span>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {match.team1}
                    </p>
                    <p className="text-gray-500 font-medium">vs</p>
                    <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {match.team2}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
