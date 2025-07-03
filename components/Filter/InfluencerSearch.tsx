"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function InfluencerSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setSearchTerm(query);
  }, [searchParams]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateSearchParam(searchTerm);
  }

  function updateSearchParam(query: string) {
    const params = new URLSearchParams(searchParams);

    if (query.trim()) {
      params.set("query", query.trim());
    } else {
      params.delete("query");
    }

    router.push(`?${params.toString()}`);
  }

  function clearSearch() {
    setSearchTerm("");
    updateSearchParam("");
  }

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for influencers..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FaTimes />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <FaSearch />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>
    </div>
  );
}
