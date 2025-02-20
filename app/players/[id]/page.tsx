import { ArrowLeft, CheckCircle2, XCircle, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

interface Prediction {
  team1: string;
  team2: string;
  date: string;
  result: string;
  predictedResult: string;
}

async function getUserPredictions(id: string): Promise<Prediction[]> {
  try {
    const res = await fetch(
      `${process.env.backendUrl}/api/prediction/getUsersPrediction/?id=${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return [];
  }
}

type Params = Promise<{ id: string }>

export default async function page({ params }: { params: Params }) {
  const id = (await params).id
  const predictions = await getUserPredictions(id);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4 sm:mb-6">
          <Link
            href="/players"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Back to Players
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
            Player Predictions
          </h1>

          <div className="grid gap-4 sm:gap-6">
            {predictions.map((prediction, index) => {
              const isPredictionCorrect =
                prediction.result !== "Not Played" &&
                prediction.result === prediction.predictedResult;
              const isMatchPlayed = prediction.result !== "Not Played";

              return (
                <div
                  key={index}
                  className="border rounded-lg p-4 sm:p-6 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <span className="text-xs sm:text-sm font-medium text-gray-500">
                      {prediction.date}
                    </span>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      {isMatchPlayed ? (
                        isPredictionCorrect ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                            <span className="text-xs sm:text-sm font-medium text-green-500">
                              Correct Prediction
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                            <span className="text-xs sm:text-sm font-medium text-red-500">
                              Incorrect Prediction
                            </span>
                          </>
                        )
                      ) : (
                        <>
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                          <span className="text-xs sm:text-sm font-medium text-yellow-500">
                            Pending
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center text-center">
                    <p className="text-sm sm:text-lg font-semibold text-gray-800">
                      {prediction.team1}
                    </p>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        vs
                      </p>
                      <div
                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                          isMatchPlayed
                            ? isPredictionCorrect
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        Predicted: {prediction.predictedResult}
                      </div>
                    </div>

                    <p className="text-sm sm:text-lg font-semibold text-gray-800">
                      {prediction.team2}
                    </p>
                  </div>

                  {isMatchPlayed && (
                    <div className="mt-3 sm:mt-4 text-center">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Actual Result:{" "}
                        <span className="font-medium text-gray-700">
                          {prediction.result}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {predictions.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <Clock className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-600">
                  No Predictions Found
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">
                  {"This player hasn't made any predictions yet"}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
