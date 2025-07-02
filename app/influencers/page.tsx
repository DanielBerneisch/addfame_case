import InfluencerOverview from "@/components/InfluencerOverview";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getInfluencers } from "@/actions/influencers";

export default async function Influencers() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const { influencers } = await getInfluencers();

  if (influencers.length === 0) {
    return (
      <section>
        <p>No influencers found.</p>
      </section>
    );
  }

  return (
    <section>
      <InfluencerOverview influencers={influencers} />
    </section>
  );
}
