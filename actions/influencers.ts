"use server";

import { prisma } from "@/prisma/client";
import { Gender } from "@prisma/client";

interface FilterOptions {
  query?: string;
  platformNames?: string[];
  topicNames?: string[];
  gender?: string;
  ageMin?: number;
  ageMax?: number;
  engagementMin?: number;
  engagementMax?: number;
  location?: string;
  followersMin?: number;
  followersMax?: number;
}

export async function getInfluencers(filters: FilterOptions = {}) {
  try {
    const {
      query,
      platformNames,
      topicNames,
      gender,
      ageMin,
      ageMax,
      engagementMin,
      engagementMax,
      location,
      followersMin,
      followersMax,
    } = filters;

    const influencers = await prisma.influencer.findMany({
      where: {
        AND: [
          query
            ? {
                OR: [
                  {
                    name: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                  {
                    location: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                  {
                    platforms: {
                      some: {
                        platform: {
                          name: {
                            contains: query,
                            mode: "insensitive",
                          },
                        },
                      },
                    },
                  },
                  {
                    topics: {
                      some: {
                        topic: {
                          name: {
                            contains: query,
                            mode: "insensitive",
                          },
                        },
                      },
                    },
                  },
                ],
              }
            : {},
          platformNames && platformNames.length > 0
            ? {
                platforms: {
                  some: {
                    platform: {
                      name: { in: platformNames },
                    },
                  },
                },
              }
            : {},
          topicNames && topicNames.length > 0
            ? {
                topics: {
                  some: {
                    topic: {
                      name: { in: topicNames },
                    },
                  },
                },
              }
            : {},
          gender ? { gender: gender as Gender } : {},
          ageMin !== undefined || ageMax !== undefined
            ? {
                age: {
                  ...(ageMin !== undefined && { gte: ageMin }),
                  ...(ageMax !== undefined && { lte: ageMax }),
                },
              }
            : {},
          engagementMin !== undefined || engagementMax !== undefined
            ? {
                engagementRate: {
                  ...(engagementMin !== undefined && { gte: engagementMin }),
                  ...(engagementMax !== undefined && { lte: engagementMax }),
                },
              }
            : {},
          location
            ? { location: { contains: location, mode: "insensitive" } }
            : {},
          followersMin !== undefined || followersMax !== undefined
            ? {
                followers: {
                  ...(followersMin !== undefined && { gte: followersMin }),
                  ...(followersMax !== undefined && { lte: followersMax }),
                },
              }
            : {},
        ],
      },
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
      orderBy: [
        ...(query ? [{ name: "asc" as const }] : []),

        { followers: "desc" as const },
      ],
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
