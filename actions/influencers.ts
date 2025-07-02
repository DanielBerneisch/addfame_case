"use server";

import { prisma } from "@/prisma/client";

export async function getInfluencers(query?: string) {
  try {
    const influencers = await prisma.influencer.findMany({
      where: query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { location: { contains: query, mode: "insensitive" } },
            ],
          }
        : {},
      include: {
        platforms: {
          include: {
            platform: true,
          },
        },
        topics: {
          include: {
            topic: true,
          },
        },
      },
      orderBy: {
        followers: "desc",
      },
    });

    return {
      influencers,
    };
  } catch (error) {
    console.error("Error fetching influencers:", error);
    return {
      error: "Failed to fetch influencers",
      influencers: [],
    };
  }
}
