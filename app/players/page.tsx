import { Trophy, Medal, Award } from "lucide-react";
import Navbar from "../components/Navbar";
import Link from "next/link";

interface Users {
  id: number;
  fullname: string;
  points: number;
}
async function getAllPlayers(): Promise<Users[]> {
  try {
    const res = await fetch(`${process.env.backendUrl}/api/user/allusers`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
}

function getRankIcon(index: number) {
  switch (index) {
    case 0:
      return <Trophy className="h-6 w-6 text-yellow-500" />;
    case 1:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 2:
      return <Medal className="h-6 w-6 text-amber-600" />;
    default:
      return <Award className="h-6 w-6 text-blue-500" />;
  }
}

export default async function PlayersPage() {
  const players = await getAllPlayers();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Player Rankings
          </h1>

          <div className="space-y-4 cursor-pointer">
            {players.map((player, index) => (
              <Link href={`players/${player.id}`} key={player.id}>
                <div className="bg-white border rounded-lg p-6 flex items-center gap-4 hover:shadow-md transition-shadow group">
                  {/* Rank */}
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full ${
                      index === 0
                        ? "bg-yellow-100"
                        : index === 1
                        ? "bg-gray-100"
                        : index === 2
                        ? "bg-amber-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {getRankIcon(index)}
                  </div>

                  {/* Player Info */}
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {player.fullname}
                    </h2>
                    <p className="text-gray-500">Rank #{index + 1}</p>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {player.points}
                    </div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>
                </div>
              </Link>
            ))}

            {players.length === 0 && (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600">
                  No Players Found
                </h3>
                <p className="text-gray-500 mt-2">
                  Check back later for player rankings
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
