import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/auth/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="min-h-screen max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">FMI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover and connect with top influencers across all platforms. Find
            the perfect match for your brand and campaigns.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session && (
              <Link
                href="/influencers"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Influencers
              </Link>
            )}
            {!session && (
              <Link
                href="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-blue-600 text-3xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Discover</h3>
            <p className="text-gray-600">
              Find influencers that match your brand values and target audience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-blue-600 text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600">
              View detailed engagement metrics and performance data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-blue-600 text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-600">
              Build meaningful partnerships with the right influencers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
