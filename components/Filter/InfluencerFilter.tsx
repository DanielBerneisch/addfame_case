"use client";

import { Platform, Topic } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";
import MobileFilter from "./MobileFilter";
import DesktopFilter from "./DesktopFilter";
import { applyFilters } from "@/helpers/filters";

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

  function clearAllFilters() {
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
  }

  function handlePlatformToggle(platformName: string) {
    if (tempPlatforms.includes(platformName)) {
      setTempPlatforms(tempPlatforms.filter((p) => p !== platformName));
    } else {
      setTempPlatforms([...tempPlatforms, platformName]);
    }
  }

  function handleTopicToggle(topicName: string) {
    if (tempTopics.includes(topicName)) {
      setTempTopics(tempTopics.filter((t) => t !== topicName));
    } else {
      setTempTopics([...tempTopics, topicName]);
    }
  }

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

  const activeFiltersCount = [
    currentPlatforms.length > 0 && currentPlatforms.length,
    currentTopics.length > 0 && currentTopics.length,
    currentGender && 1,
    (currentAgeMin || currentAgeMax) && 1,
    (currentEngagementMin || currentEngagementMax) && 1,
    currentLocation && 1,
    (currentFollowersMin || currentFollowersMax) && 1,
  ]
    .filter(Boolean)
    .reduce((a, b) => Number(a) + Number(b), 0);

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
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors md:hidden cursor-pointer"
        >
          <FaFilter />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="bg-blue-800 text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
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
              {activeFiltersCount}
            </span>
          )}
          {isFilterOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="px-3 py-2 text-red-600 hover:text-red-800 text-sm font-medium transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      <DesktopFilter
        platforms={platforms}
        topics={topics}
        isOpen={isFilterOpen}
        tempPlatforms={tempPlatforms}
        tempTopics={tempTopics}
        tempGender={tempGender}
        tempAgeMin={tempAgeMin}
        tempAgeMax={tempAgeMax}
        tempEngagementMin={tempEngagementMin}
        tempEngagementMax={tempEngagementMax}
        tempLocation={tempLocation}
        tempFollowersMin={tempFollowersMin}
        tempFollowersMax={tempFollowersMax}
        onPlatformToggle={handlePlatformToggle}
        onTopicToggle={handleTopicToggle}
        onGenderChange={setTempGender}
        onAgeChange={(min, max) => {
          setTempAgeMin(min);
          setTempAgeMax(max);
        }}
        onEngagementChange={(min, max) => {
          setTempEngagementMin(min);
          setTempEngagementMax(max);
        }}
        onFollowersChange={(min, max) => {
          setTempFollowersMin(min);
          setTempFollowersMax(max);
        }}
        onLocationChange={setTempLocation}
        onApply={() =>
          applyFilters({
            searchParams,
            tempPlatforms,
            tempTopics,
            tempGender,
            tempAgeMin,
            tempAgeMax,
            tempEngagementMin,
            tempEngagementMax,
            tempLocation,
            tempFollowersMin,
            tempFollowersMax,
            router,
            setIsFilterOpen,
          })
        }
        onClearAll={clearAllFilters}
        onClose={() => setIsFilterOpen(false)}
        hasTempChanges={hasTempChanges}
      />

      <MobileFilter
        platforms={platforms}
        topics={topics}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        tempPlatforms={tempPlatforms}
        tempTopics={tempTopics}
        tempGender={tempGender}
        tempAgeMin={tempAgeMin}
        tempAgeMax={tempAgeMax}
        tempEngagementMin={tempEngagementMin}
        tempEngagementMax={tempEngagementMax}
        tempLocation={tempLocation}
        tempFollowersMin={tempFollowersMin}
        tempFollowersMax={tempFollowersMax}
        onPlatformToggle={handlePlatformToggle}
        onTopicToggle={handleTopicToggle}
        onGenderChange={setTempGender}
        onAgeChange={(min, max) => {
          setTempAgeMin(min);
          setTempAgeMax(max);
        }}
        onEngagementChange={(min, max) => {
          setTempEngagementMin(min);
          setTempEngagementMax(max);
        }}
        onFollowersChange={(min, max) => {
          setTempFollowersMin(min);
          setTempFollowersMax(max);
        }}
        onLocationChange={setTempLocation}
        onApply={() =>
          applyFilters({
            searchParams,
            tempPlatforms,
            tempTopics,
            tempGender,
            tempAgeMin,
            tempAgeMax,
            tempEngagementMin,
            tempEngagementMax,
            tempLocation,
            tempFollowersMin,
            tempFollowersMax,
            router,
            setIsFilterOpen,
          })
        }
        onClearAll={clearAllFilters}
        hasTempChanges={hasTempChanges}
      />
    </div>
  );
}
