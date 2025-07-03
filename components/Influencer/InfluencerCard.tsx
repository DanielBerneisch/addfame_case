"use client";

import Image from "next/image";
import { InfluencerWithRelations } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import FavoriteButton from "../Favorites/FavoriteButton";

interface InfluencerCardProps {
  influencer: InfluencerWithRelations;
  index: number;
  isFavorited?: boolean;
}

export default function InfluencerCard({
  influencer,
  index,
  isFavorited = false,
}: InfluencerCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  function formateGender(gender: string) {
    switch (gender) {
      case "male":
        return "Male";
      case "female":
        return "Female";
      case "non_binary":
        return "Non-Binary";
    }
  }

  return (
    <>
      <motion.div
        className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center p-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
        onClick={openModal}
      >
        <Image
          src={"/images/dummy.jpg"}
          alt={influencer.name}
          className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-200"
          width={96}
          height={96}
        />

        <div
          className="absolute top-2 right-2"
          onClick={(e) => e.stopPropagation()}
        >
          <FavoriteButton
            influencerId={influencer.id}
            isFavorited={isFavorited}
            size="md"
          />
        </div>

        <div className="w-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {influencer.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {influencer.platforms
              .map((platform) => platform.platform.name)
              .join(", ")}
          </p>
          <p className="text-lg font-bold text-blue-600">
            {influencer.followers.toLocaleString()} Followers
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative transform transition-all duration-300"
              initial={{ y: "-100vh", opacity: 0, scale: 0.8 }}
              animate={{ y: "0", opacity: 1, scale: 1 }}
              exit={{ y: "100vh", opacity: 0, scale: 0.8 }}
              transition={{
                delay: 0.1,
                duration: 0.4,
                type: "spring",
                damping: 25,
                stiffness: 500,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="flex flex-col items-center text-center">
                <Image
                  src={"/images/dummy.jpg"}
                  alt={influencer.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-200"
                  width={96}
                  height={96}
                />

                <div className="absolute top-4 left-4">
                  <FavoriteButton
                    influencerId={influencer.id}
                    isFavorited={isFavorited}
                    size="md"
                  />
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {influencer.name}
                </h3>
                <p className="text-md text-gray-700 mb-4">
                  {influencer.platforms
                    .map((platform) => platform.platform.name)
                    .join(", ")}
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-left w-full max-w-xs">
                  <p className="text-gray-800">
                    <span className="font-semibold">Followers:</span>
                  </p>
                  <p className="text-blue-600 font-bold">
                    {influencer.followers.toLocaleString()}
                  </p>

                  <p className="text-gray-800">
                    <span className="font-semibold">Gender:</span>
                  </p>
                  <p className="text-gray-700">
                    {formateGender(influencer.gender)}
                  </p>

                  <p className="text-gray-800">
                    <span className="font-semibold">Age:</span>
                  </p>
                  <p className="text-gray-700">{influencer.age}</p>

                  <p className="text-gray-800">
                    <span className="font-semibold">Engagement Rate:</span>
                  </p>
                  <p className="text-gray-700">{influencer.engagementRate}%</p>

                  <p className="text-gray-800">
                    <span className="font-semibold">Avg. Likes:</span>
                  </p>
                  <p className="text-gray-700">
                    {influencer.avgLikes.toLocaleString()}
                  </p>

                  <p className="text-gray-800">
                    <span className="font-semibold">Avg. Comments:</span>
                  </p>
                  <p className="text-gray-700">
                    {influencer.avgComments.toLocaleString()}
                  </p>

                  <p className="text-gray-800">
                    <span className="font-semibold">Topics:</span>
                  </p>
                  <p className="text-gray-700">
                    {influencer.topics
                      .map((topic) => topic.topic.name)
                      .join(", ")}
                  </p>

                  <p className="text-gray-800">
                    <span className="font-semibold">Location:</span>
                  </p>
                  <p className="text-gray-700">{influencer.location}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
