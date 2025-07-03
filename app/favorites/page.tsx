import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getFavorites } from "@/actions/favorites";
import InfluencerOverview from "@/components/Influencer/InfluencerOverview";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const { favorites } = await getFavorites();

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-900 mb-8">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💔</div>
          <p className="text-gray-500 text-lg mb-2">No favorites yet</p>
          <p className="text-gray-400">
            Start exploring influencers and add them to your favorites!
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            {favorites.length} favorite{favorites.length !== 1 ? "s" : ""}
          </div>
          <InfluencerOverview
            influencers={favorites}
            favoriteIds={favorites.map((f) => f.id)}
          />
        </>
      )}
    </section>
  );
}
