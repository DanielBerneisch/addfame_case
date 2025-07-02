import { Influencer } from "@prisma/client";
import InfluencerCard from "./InfluencerCard";

interface InfluencerOverviewProps {
  influencers: Influencer[];
}

export default async function InfluencerOverview({
  influencers,
}: InfluencerOverviewProps) {
  return (
    <div>
      {influencers.length > 0 ? (
        <ul className="space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 lg:px-20">
          {influencers.map((influencer) => (
            <InfluencerCard key={influencer.id} influencer={influencer} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No influencers found.</p>
      )}
    </div>
  );
}
