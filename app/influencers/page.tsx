import InfluencerOverview from "@/components/Influencer/InfluencerOverview";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getInfluencers } from "@/actions/influencers";
import { getPlatforms } from "@/actions/platforms";
import { getTopics } from "@/actions/topics";
import InfluencerFilter from "@/components/Influencer/InfluencerFilter";
import InfluencerSearch from "@/components/Influencer/InfluencerSearch";

interface PageProps {
  searchParams: {
    query?: string;
    platforms?: string;
    topics?: string;
    gender?: string;
    ageMin?: string;
    ageMax?: string;
    engagementMin?: string;
    engagementMax?: string;
    location?: string;
    followersMin?: string;
    followersMax?: string;
  };
}

export default async function Influencers({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const {
    query,
    platforms,
    topics,
    gender,
    ageMin,
    ageMax,
    engagementMin,
    engagementMax,
    location,
    followersMin,
    followersMax,
  } = await searchParams;

  const platformNames = platforms ? platforms.split(",") : undefined;
  const topicNames = topics ? topics.split(",") : undefined;

  const filters = {
    query,
    platformNames,
    topicNames,
    gender,
    ageMin: ageMin ? parseInt(ageMin) : undefined,
    ageMax: ageMax ? parseInt(ageMax) : undefined,
    engagementMin: engagementMin ? parseFloat(engagementMin) : undefined,
    engagementMax: engagementMax ? parseFloat(engagementMax) : undefined,
    location,
    followersMin: followersMin ? parseInt(followersMin) : undefined,
    followersMax: followersMax ? parseInt(followersMax) : undefined,
  };

  const [influencersResult, platformsResult, topicsResult] = await Promise.all([
    getInfluencers(filters),
    getPlatforms(),
    getTopics(),
  ]);

  const { influencers } = influencersResult;
  const { platforms: availablePlatforms } = platformsResult;
  const { topics: availableTopics } = topicsResult;

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-900 mb-8">Influencers</h1>

      <InfluencerSearch />

      <InfluencerFilter
        platforms={availablePlatforms}
        topics={availableTopics}
      />

      {influencers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {query
              ? `No influencers found matching "${query}".`
              : "No influencers found matching your criteria."}
          </p>
        </div>
      ) : (
        <>
          {query && (
            <div className="mb-4 text-sm text-gray-600">
              Showing {influencers.length} results for &quot;{query}&quot;
            </div>
          )}
          <InfluencerOverview influencers={influencers} />
        </>
      )}
    </section>
  );
}
