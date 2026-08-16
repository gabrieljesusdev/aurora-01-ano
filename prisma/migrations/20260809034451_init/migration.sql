-- CreateTable
CREATE TABLE "Rsvp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "invitedBy" TEXT NOT NULL,
    "invitedByOther" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "message" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Companion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "rsvpId" TEXT NOT NULL,
    CONSTRAINT "Companion_rsvpId_fkey" FOREIGN KEY ("rsvpId") REFERENCES "Rsvp" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Rsvp_status_idx" ON "Rsvp"("status");

-- CreateIndex
CREATE INDEX "Rsvp_createdAt_idx" ON "Rsvp"("createdAt");

-- CreateIndex
CREATE INDEX "Companion_rsvpId_idx" ON "Companion"("rsvpId");
