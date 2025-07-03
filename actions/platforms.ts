"use server";

import { prisma } from "@/prisma/client";

export async function getPlatforms() {
  try {
    const platforms = await prisma.platform.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return {
      platforms,
    };
  } catch (error) {
    console.error("Error fetching platforms:", error);
    return {
      error: "Failed to fetch platforms",
      platforms: [],
    };
  }
}
