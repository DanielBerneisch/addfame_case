"use client";

import { Platform, Topic } from "@prisma/client";
import DualRangeSlider from "./DualSlider";

interface DesktopFilterProps {
  platforms: Platform[];
  topics: Topic[];
  isOpen: boolean;
  tempPlatforms: string[];
  tempTopics: string[];
  tempGender: string;
  tempAgeMin: string;
  tempAgeMax: string;
  tempEngagementMin: string;
  tempEngagementMax: string;
  tempLocation: string;
  tempFollowersMin: string;
  tempFollowersMax: string;
  onPlatformToggle: (platform: string) => void;
  onTopicToggle: (topic: string) => void;
  onGenderChange: (gender: string) => void;
  onAgeChange: (min: string, max: string) => void;
  onEngagementChange: (min: string, max: string) => void;
  onFollowersChange: (min: string, max: string) => void;
  onLocationChange: (location: string) => void;
  onApply: () => void;
  onClearAll: () => void;
  onClose: () => void;
  hasTempChanges: boolean;
}

export default function DesktopFilter({
  platforms,
  topics,
  isOpen,
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
  onPlatformToggle,
  onTopicToggle,
  onGenderChange,
  onAgeChange,
  onEngagementChange,
  onFollowersChange,
  onLocationChange,
  onApply,
  onClearAll,
  onClose,
  hasTempChanges,
}: DesktopFilterProps) {
  if (!isOpen) return null;

  return (
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
                onClick={() => onPlatformToggle(platform.name)}
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
                onClick={() => onTopicToggle(topic.name)}
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
                  onGenderChange(tempGender === gender ? "" : gender)
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
            onAgeChange(min.toString(), max.toString());
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
            onEngagementChange(min.toString(), max.toString());
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
            onFollowersChange(min.toString(), max.toString());
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
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Enter location..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={onClearAll}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
        >
          Clear All
        </button>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onApply}
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
  );
}
