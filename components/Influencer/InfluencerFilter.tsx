"use client";

import { Platform, Topic } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaFilter, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import DualRangeSlider from "./DualSlider";

interface InfluencerFilterProps {
  platforms: Platform[];
  topics: Topic[];
}

export default function InfluencerFilter({
  platforms,
  topics,
}: InfluencerFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPlatforms = searchParams.get("platforms")?.split(",") || [];
  const currentTopics = searchParams.get("topics")?.split(",") || [];
  const currentGender = searchParams.get("gender") || "";
  const currentAgeMin = searchParams.get("ageMin") || "";
  const currentAgeMax = searchParams.get("ageMax") || "";
  const currentEngagementMin = searchParams.get("engagementMin") || "";
  const currentEngagementMax = searchParams.get("engagementMax") || "";
  const currentLocation = searchParams.get("location") || "";
  const currentFollowersMin = searchParams.get("followersMin") || "";
  const currentFollowersMax = searchParams.get("followersMax") || "";

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempPlatforms, setTempPlatforms] = useState<string[]>([]);
  const [tempTopics, setTempTopics] = useState<string[]>([]);
  const [tempGender, setTempGender] = useState("");
  const [tempAgeMin, setTempAgeMin] = useState("");
  const [tempAgeMax, setTempAgeMax] = useState("");
  const [tempEngagementMin, setTempEngagementMin] = useState("");
  const [tempEngagementMax, setTempEngagementMax] = useState("");
  const [tempLocation, setTempLocation] = useState("");
  const [tempFollowersMin, setTempFollowersMin] = useState("");
  const [tempFollowersMax, setTempFollowersMax] = useState("");

  useEffect(() => {
    if (isFilterOpen) {
      setTempPlatforms([...currentPlatforms]);
      setTempTopics([...currentTopics]);
      setTempGender(currentGender);
      setTempAgeMin(currentAgeMin);
      setTempAgeMax(currentAgeMax);
      setTempEngagementMin(currentEngagementMin);
      setTempEngagementMax(currentEngagementMax);
      setTempLocation(currentLocation);
      setTempFollowersMin(currentFollowersMin);
      setTempFollowersMax(currentFollowersMax);
    }
  }, [isFilterOpen]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (tempPlatforms.length > 0) {
      params.set("platforms", tempPlatforms.join(","));
    } else {
      params.delete("platforms");
    }

    if (tempTopics.length > 0) {
      params.set("topics", tempTopics.join(","));
    } else {
      params.delete("topics");
    }

    if (tempGender) {
      params.set("gender", tempGender);
    } else {
      params.delete("gender");
    }

    if (tempAgeMin) {
      params.set("ageMin", tempAgeMin);
    } else {
      params.delete("ageMin");
    }

    if (tempAgeMax) {
      params.set("ageMax", tempAgeMax);
    } else {
      params.delete("ageMax");
    }

    if (tempEngagementMin) {
      params.set("engagementMin", tempEngagementMin);
    } else {
      params.delete("engagementMin");
    }

    if (tempEngagementMax) {
      params.set("engagementMax", tempEngagementMax);
    } else {
      params.delete("engagementMax");
    }

    if (tempLocation) {
      params.set("location", tempLocation);
    } else {
      params.delete("location");
    }

    if (tempFollowersMin) {
      params.set("followersMin", tempFollowersMin);
    } else {
      params.delete("followersMin");
    }

    if (tempFollowersMax) {
      params.set("followersMax", tempFollowersMax);
    } else {
      params.delete("followersMax");
    }

    router.push(`?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("platforms");
    params.delete("topics");
    params.delete("gender");
    params.delete("ageMin");
    params.delete("ageMax");
    params.delete("engagementMin");
    params.delete("engagementMax");
    params.delete("location");
    params.delete("followersMin");
    params.delete("followersMax");

    router.push(`?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const handlePlatformToggle = (platformName: string) => {
    if (tempPlatforms.includes(platformName)) {
      setTempPlatforms(tempPlatforms.filter((p) => p !== platformName));
    } else {
      setTempPlatforms([...tempPlatforms, platformName]);
    }
  };

  const handleTopicToggle = (topicName: string) => {
    if (tempTopics.includes(topicName)) {
      setTempTopics(tempTopics.filter((t) => t !== topicName));
    } else {
      setTempTopics([...tempTopics, topicName]);
    }
  };

  const hasActiveFilters =
    currentPlatforms.length > 0 ||
    currentTopics.length > 0 ||
    currentGender ||
    currentAgeMin ||
    currentAgeMax ||
    currentEngagementMin ||
    currentEngagementMax ||
    currentLocation ||
    currentFollowersMin ||
    currentFollowersMax;

  const hasTempChanges =
    JSON.stringify(tempPlatforms.sort()) !==
      JSON.stringify(currentPlatforms.sort()) ||
    JSON.stringify(tempTopics.sort()) !==
      JSON.stringify(currentTopics.sort()) ||
    tempGender !== currentGender ||
    tempAgeMin !== currentAgeMin ||
    tempAgeMax !== currentAgeMax ||
    tempEngagementMin !== currentEngagementMin ||
    tempEngagementMax !== currentEngagementMax ||
    tempLocation !== currentLocation ||
    tempFollowersMin !== currentFollowersMin ||
    tempFollowersMax !== currentFollowersMax;

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsFilterOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors md:hidden cursor-pointer"
      >
        <FaFilter />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-blue-800 text-xs px-2 py-1 rounded-full">
            {[
              currentPlatforms.length > 0 && currentPlatforms.length,
              currentTopics.length > 0 && currentTopics.length,
              currentGender && 1,
              (currentAgeMin || currentAgeMax) && 1,
              (currentEngagementMin || currentEngagementMax) && 1,
              currentLocation && 1,
              (currentFollowersMin || currentFollowersMax) && 1,
            ]
              .filter(Boolean)
              .reduce((a, b) => Number(a) + Number(b), 0)}
          </span>
        )}
      </button>

      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
      >
        <FaFilter />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-blue-800 text-xs px-2 py-1 rounded-full">
            {[
              currentPlatforms.length > 0 && currentPlatforms.length,
              currentTopics.length > 0 && currentTopics.length,
              currentGender && 1,
              (currentAgeMin || currentAgeMax) && 1,
              (currentEngagementMin || currentEngagementMax) && 1,
              currentLocation && 1,
              (currentFollowersMin || currentFollowersMax) && 1,
            ]
              .filter(Boolean)
              .reduce((a, b) => Number(a) + Number(b), 0)}
          </span>
        )}
        {isFilterOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {hasActiveFilters && (
        <div className="mt-3 text-sm text-gray-600">
          <span className="font-medium">Active filters: </span>
          {currentPlatforms.length > 0 && (
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-1">
              Platforms: {currentPlatforms.join(", ")}
            </span>
          )}
          {currentTopics.length > 0 && (
            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded mr-2 mb-1">
              Topics: {currentTopics.join(", ")}
            </span>
          )}
          {currentGender && (
            <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded mr-2 mb-1">
              Gender: {currentGender}
            </span>
          )}
          {(currentAgeMin || currentAgeMax) && (
            <span className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded mr-2 mb-1">
              Age: {currentAgeMin || "0"}-{currentAgeMax || "∞"}
            </span>
          )}
          {(currentEngagementMin || currentEngagementMax) && (
            <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded mr-2 mb-1">
              Engagement: {currentEngagementMin || "0"}%-
              {currentEngagementMax || "100"}%
            </span>
          )}
          {currentLocation && (
            <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-2 mb-1">
              Location: {currentLocation}
            </span>
          )}
          {(currentFollowersMin || currentFollowersMax) && (
            <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded mr-2 mb-1">
              Followers: {currentFollowersMin || "0"}-
              {currentFollowersMax || "∞"}
            </span>
          )}
        </div>
      )}

      {isFilterOpen && (
        <div className="hidden md:block mt-4 bg-white">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platforms
              </label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformToggle(platform.name)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      tempPlatforms.includes(platform.name)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topics
              </label>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicToggle(topic.name)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      tempTopics.includes(topic.name)
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex gap-2">
                {["male", "female", "non_binary"].map((gender) => (
                  <button
                    key={gender}
                    onClick={() =>
                      setTempGender(tempGender === gender ? "" : gender)
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      tempGender === gender
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {gender === "male"
                      ? "Male"
                      : gender === "female"
                      ? "Female"
                      : "Non Binary"}
                  </button>
                ))}
              </div>
            </div>

            <DualRangeSlider
              min={18}
              max={65}
              value1={parseInt(tempAgeMin) || 18}
              value2={parseInt(tempAgeMax) || 65}
              onChange={(min, max) => {
                setTempAgeMin(min.toString());
                setTempAgeMax(max.toString());
              }}
              step={1}
              label="Age Range"
              unit=" years"
            />

            <DualRangeSlider
              min={0}
              max={20}
              value1={parseFloat(tempEngagementMin) || 0}
              value2={parseFloat(tempEngagementMax) || 20}
              onChange={(min, max) => {
                setTempEngagementMin(min.toString());
                setTempEngagementMax(max.toString());
              }}
              step={0.1}
              label="Engagement Rate"
              unit="%"
              formatValue={(val: number) => val.toFixed(1)}
            />

            <DualRangeSlider
              min={1000}
              max={10000000}
              value1={parseInt(tempFollowersMin) || 1000}
              value2={parseInt(tempFollowersMax) || 10000000}
              onChange={(min, max) => {
                setTempFollowersMin(min.toString());
                setTempFollowersMax(max.toString());
              }}
              step={1000}
              label="Followers Range"
              unit=""
              formatValue={(val) => val.toLocaleString()}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
                placeholder="Enter location..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Clear All
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={applyFilters}
                className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                  hasTempChanges
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
                disabled={!hasTempChanges}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="w-full h-full bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platforms
                </label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => handlePlatformToggle(platform.name)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                        tempPlatforms.includes(platform.name)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topics
                </label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicToggle(topic.name)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                        tempTopics.includes(topic.name)
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {topic.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <div className="flex gap-2">
                  {["male", "female", "non_binary"].map((gender) => (
                    <button
                      key={gender}
                      onClick={() =>
                        setTempGender(tempGender === gender ? "" : gender)
                      }
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                        tempGender === gender
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {gender === "male"
                        ? "Male"
                        : gender === "female"
                        ? "Female"
                        : "Non Binary"}
                    </button>
                  ))}
                </div>
              </div>

              <DualRangeSlider
                min={18}
                max={65}
                value1={parseInt(tempAgeMin) || 18}
                value2={parseInt(tempAgeMax) || 65}
                onChange={(min, max) => {
                  setTempAgeMin(min.toString());
                  setTempAgeMax(max.toString());
                }}
                step={1}
                label="Age Range"
                unit=" years"
              />

              <DualRangeSlider
                min={0}
                max={20}
                value1={parseFloat(tempEngagementMin) || 0}
                value2={parseFloat(tempEngagementMax) || 20}
                onChange={(min, max) => {
                  setTempEngagementMin(min.toString());
                  setTempEngagementMax(max.toString());
                }}
                step={0.1}
                label="Engagement Rate"
                unit="%"
                formatValue={(val: number) => val.toFixed(1)}
              />

              <DualRangeSlider
                min={1000}
                max={10000000}
                value1={parseInt(tempFollowersMin) || 1000}
                value2={parseInt(tempFollowersMax) || 10000000}
                onChange={(min, max) => {
                  setTempFollowersMin(min.toString());
                  setTempFollowersMax(max.toString());
                }}
                step={1000}
                label="Followers Range"
                unit=""
                formatValue={(val) => val.toLocaleString()}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                  placeholder="Enter location..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pb-20"></div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 z-50 border-t px-6 py-4 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Clear All
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={applyFilters}
                  className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                    hasTempChanges
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={!hasTempChanges}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
