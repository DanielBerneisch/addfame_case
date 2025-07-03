"use server";

import { prisma } from "@/prisma/client";

export async function getTopics() {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return {
      topics,
    };
  } catch (error) {
    console.error("Error fetching topics:", error);
    return {
      error: "Failed to fetch topics",
      topics: [],
    };
  }
}
