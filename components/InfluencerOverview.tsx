import InfluencerCard from "./InfluencerCard";
import { InfluencerWithRelations } from "@/types";

interface InfluencerOverviewProps {
  influencers: InfluencerWithRelations[];
}

export default async function InfluencerOverview({
  influencers,
}: InfluencerOverviewProps) {
  console.log(influencers);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-gray-900 text-center mb-12">
          Our Top Influencers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {influencers.map((influencer, index) => (
            <InfluencerCard
              key={influencer.id}
              influencer={influencer}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
