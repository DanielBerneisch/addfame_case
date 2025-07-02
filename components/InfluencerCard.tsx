import { Influencer } from "@prisma/client";

interface InfluencerCardProps {
  influencer: Influencer;
}

export default function InfluencerCard({ influencer }: InfluencerCardProps) {
  return (
    <li key={influencer.id} className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{influencer.name}</h2>
      <p className="text-gray-600">{influencer.gender}</p>
      <div className="mt-2">
        <span className="text-sm text-gray-500">
          Followers: {influencer.followers}
        </span>
      </div>
      <div className="mt-2">
        <span className="text-sm text-gray-500">
          Engagement Rate: {influencer.engagementRate}
        </span>
      </div>
    </li>
  );
}
