import { Prisma } from "@prisma/client";

export type InfluencerWithRelations = Prisma.InfluencerGetPayload<{
  include: {
    platforms: {
      include: {
        platform: true;
      };
    };
    topics: {
      include: {
        topic: true;
      };
    };
    favorites: true;
  };
}>;
