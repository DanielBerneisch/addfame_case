import { useRouter } from "next/navigation";

export function applyFilters({
  searchParams,
  tempPlatforms,
  tempTopics,
  tempGender,
  tempAgeMin,
  tempAgeMax,
  tempEngagementMin,
  tempEngagementMax,
  tempLocation,
  tempFollowersMin,
  tempFollowersMax,
  router,
  setIsFilterOpen,
}: {
  searchParams: URLSearchParams;
  tempPlatforms: string[];
  tempTopics: string[];

  tempGender: string | null;
  tempAgeMin: string | null;
  tempAgeMax: string | null;
  tempEngagementMin: string | null;
  tempEngagementMax: string | null;
  tempLocation: string | null;
  tempFollowersMin: string | null;
  tempFollowersMax: string | null;
  router: ReturnType<typeof useRouter>;
  setIsFilterOpen: (isOpen: boolean) => void;
}) {
  const params = new URLSearchParams(searchParams);

  if (tempPlatforms.length > 0) {
    params.set("platforms", tempPlatforms.join(","));
  } else {
    params.delete("platforms");
  }

  if (tempTopics.length > 0) {
    params.set("topics", tempTopics.join(","));
  } else {
    params.delete("topics");
  }

  if (tempGender) {
    params.set("gender", tempGender);
  } else {
    params.delete("gender");
  }

  if (tempAgeMin) {
    params.set("ageMin", tempAgeMin);
  } else {
    params.delete("ageMin");
  }

  if (tempAgeMax) {
    params.set("ageMax", tempAgeMax);
  } else {
    params.delete("ageMax");
  }

  if (tempEngagementMin) {
    params.set("engagementMin", tempEngagementMin);
  } else {
    params.delete("engagementMin");
  }

  if (tempEngagementMax) {
    params.set("engagementMax", tempEngagementMax);
  } else {
    params.delete("engagementMax");
  }

  if (tempLocation) {
    params.set("location", tempLocation);
  } else {
    params.delete("location");
  }

  if (tempFollowersMin) {
    params.set("followersMin", tempFollowersMin);
  } else {
    params.delete("followersMin");
  }

  if (tempFollowersMax) {
    params.set("followersMax", tempFollowersMax);
  } else {
    params.delete("followersMax");
  }

  router.push(`?${params.toString()}`);
  setIsFilterOpen(false);
}
