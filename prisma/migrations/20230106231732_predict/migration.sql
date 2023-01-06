-- CreateTable
CREATE TABLE "predict" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "threshold" DOUBLE PRECISION NOT NULL,
    "start_price" DOUBLE PRECISION NOT NULL,
    "end_price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "predict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "slug" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_slug_key" ON "project"("slug");

-- AddForeignKey
ALTER TABLE "predict" ADD CONSTRAINT "predict_slug_fkey" FOREIGN KEY ("slug") REFERENCES "project"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predict" ADD CONSTRAINT "predict_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
