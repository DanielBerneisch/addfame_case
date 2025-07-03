import InfluencerCard from "./InfluencerCard";
import { InfluencerWithRelations } from "@/types";

interface InfluencerOverviewProps {
  influencers: InfluencerWithRelations[];
  favoriteIds?: string[];
}

export default async function InfluencerOverview({
  influencers,
  favoriteIds = [],
}: InfluencerOverviewProps) {
  return (
    <div className="min-h-screen py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {influencers.map((influencer, index) => (
          <InfluencerCard
            key={influencer.id}
            influencer={influencer}
            index={index}
            isFavorited={favoriteIds.includes(influencer.id)}
          />
        ))}
      </div>
    </div>
  );
}
