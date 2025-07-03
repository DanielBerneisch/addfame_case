"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addToFavorites, removeFromFavorites } from "@/actions/favorites";
import { toast } from "react-hot-toast";

interface FavoriteButtonProps {
  influencerId: string;
  isFavorited: boolean;
  size?: "sm" | "md" | "lg";
}

export default function FavoriteButton({
  influencerId,
  isFavorited: initialIsFavorited,
  size = "md",
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggleFavorite() {
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isFavorited) {
        const result = await removeFromFavorites(influencerId);
        if (result.error) {
          toast.error(result.error);
        } else {
          setIsFavorited(false);
          toast.success("Removed from favorites");
        }
      } else {
        const result = await addToFavorites(influencerId);
        if (result.error) {
          toast.error(result.error);
        } else {
          setIsFavorited(true);
          toast.success("Added to favorites");
        }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const buttonSizeClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3",
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`${
        buttonSizeClasses[size]
      } rounded-full hover:bg-gray-100 transition-colors cursor-pointer group ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      title={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorited ? (
        <FaHeart className={`${sizeClasses[size]} text-red-500`} />
      ) : (
        <FaRegHeart
          className={`${sizeClasses[size]} text-gray-400 group-hover:text-red-500`}
        />
      )}
    </button>
  );
}
