-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matches" (
    "id" SERIAL NOT NULL,
    "team1" TEXT NOT NULL,
    "team2" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "result" TEXT NOT NULL,

    CONSTRAINT "Matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultPrediction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "predictedresult" TEXT NOT NULL,

    CONSTRAINT "ResultPrediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResultPrediction_userId_matchId_key" ON "ResultPrediction"("userId", "matchId");

-- AddForeignKey
ALTER TABLE "ResultPrediction" ADD CONSTRAINT "ResultPrediction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultPrediction" ADD CONSTRAINT "ResultPrediction_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
