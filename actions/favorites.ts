"use server";

import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function addToFavorites(influencerId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return { error: "Not authenticated" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const existingFavorite = await prisma.favorites.findUnique({
      where: {
        userId_influencerId: {
          userId: user.id,
          influencerId: influencerId,
        },
      },
    });

    if (existingFavorite) {
      return { error: "Already in favorites" };
    }

    await prisma.favorites.create({
      data: {
        userId: user.id,
        influencerId: influencerId,
      },
    });

    revalidatePath("/favorites");
    revalidatePath("/influencers");

    return { success: true };
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return { error: "Failed to add to favorites" };
  }
}

export async function removeFromFavorites(influencerId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return { error: "Not authenticated" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { error: "User not found" };
    }

    await prisma.favorites.delete({
      where: {
        userId_influencerId: {
          userId: user.id,
          influencerId: influencerId,
        },
      },
    });

    revalidatePath("/favorites");
    revalidatePath("/influencers");

    return { success: true };
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return { error: "Failed to remove from favorites" };
  }
}

export async function getFavorites() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return { favorites: [] };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { favorites: [] };
    }

    const favorites = await prisma.favorites.findMany({
      where: { userId: user.id },
      include: {
        influencer: {
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
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { favorites: favorites.map((favorite) => favorite.influencer) };
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return { error: "Failed to fetch favorites", favorites: [] };
  }
}

export async function getFavoriteIds() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return { favoriteIds: [] };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { favoriteIds: [] };
    }

    const favorites = await prisma.favorites.findMany({
      where: { userId: user.id },
      select: { influencerId: true },
    });

    return { favoriteIds: favorites.map((favorite) => favorite.influencerId) };
  } catch (error) {
    console.error("Error fetching favorite IDs:", error);
    return { favoriteIds: [] };
  }
}
