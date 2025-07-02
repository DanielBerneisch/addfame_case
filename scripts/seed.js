const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🌱 Starting to seed database...");

    // Read the JSON file
    const jsonPath = path.join(__dirname, "..", "influencer_liste.json");
    const influencersData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    // Get all unique platforms and topics
    const allPlatforms = [
      ...new Set(influencersData.flatMap((inf) => inf.platform || [])),
    ];
    const allTopics = [
      ...new Set(influencersData.flatMap((inf) => inf.topics || [])),
    ];

    console.log(`📱 Creating ${allPlatforms.length} platforms...`);
    // Create platforms
    for (const platformName of allPlatforms) {
      await prisma.platform.upsert({
        where: { name: platformName },
        update: {},
        create: { name: platformName },
      });
    }

    console.log(`🏷️ Creating ${allTopics.length} topics...`);
    // Create topics
    for (const topicName of allTopics) {
      await prisma.topic.upsert({
        where: { name: topicName },
        update: {},
        create: { name: topicName },
      });
    }

    console.log(`👥 Creating ${influencersData.length} influencers...`);
    // Create influencers
    for (const influencer of influencersData) {
      // Skip if missing required fields
      if (!influencer.id || !influencer.name) continue;

      await prisma.influencer.upsert({
        where: { id: influencer.id },
        update: {},
        create: {
          id: influencer.id,
          name: influencer.name,
          gender: influencer.gender || "male",
          age: influencer.age || 25,
          followers: influencer.followers || 0,
          engagementRate: influencer.engagementRate || 0,
          avgLikes: influencer.avgLikes || 0,
          avgComments: influencer.avgComments || 0,
          location: influencer.location || "Unknown",
        },
      });

      // Connect platforms
      if (influencer.platform) {
        for (const platformName of influencer.platform) {
          const platform = await prisma.platform.findUnique({
            where: { name: platformName },
          });

          if (platform) {
            await prisma.influencerPlatform.upsert({
              where: {
                influencerId_platformId: {
                  influencerId: influencer.id,
                  platformId: platform.id,
                },
              },
              update: {},
              create: {
                influencerId: influencer.id,
                platformId: platform.id,
              },
            });
          }
        }
      }

      // Connect topics
      if (influencer.topics) {
        for (const topicName of influencer.topics) {
          const topic = await prisma.topic.findUnique({
            where: { name: topicName },
          });

          if (topic) {
            await prisma.influencerTopic.upsert({
              where: {
                influencerId_topicId: {
                  influencerId: influencer.id,
                  topicId: topic.id,
                },
              },
              update: {},
              create: {
                influencerId: influencer.id,
                topicId: topic.id,
              },
            });
          }
        }
      }
    }

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
