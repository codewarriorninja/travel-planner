"use server";


import { requireAuth } from "../auth";
import { prisma } from "../prisma";

export async function reorderItinerary(tripId: string, newOrder: string[]) {
  const session = await requireAuth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  await prisma.$transaction(
    newOrder.map((locationId: string, key: number) =>
      prisma.location.update({
        where: { id: locationId },
        data: { order: key },
      })
    )
  );
}