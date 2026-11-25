import { cache } from "react";
import { fetchWPPage, resolveMediaId } from "@/lib/wordpress";
import { parseOurPeoplePage } from "@/lib/parsers/ourPeople/ourPeople.parser";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { PERSON_IMAGE_PLACEHOLDER, hasPersonImage } from "@/constants/personPlaceholder.constants";
import { OUR_PEOPLE_FALLBACK } from "@/data/ourPeople/ourPeople.fallback";
import type { OurPeoplePageScf, OurPeoplePageData } from "@/types/ourPeople/ourPeople.types";

async function resolvePersonImage(src: string): Promise<string> {
  const resolved = await resolveMediaId(src);
  return hasPersonImage(resolved) ? resolved : PERSON_IMAGE_PLACEHOLDER;
}

/**
 * Our People page service for Yuva
 * ---------------------------------------------------------------------------
 * Single entry-point used to retrieve the Our People page content.
 */
export const getOurPeoplePageData = cache(async (): Promise<OurPeoplePageData> => {
  const response = await fetchWPPage<OurPeoplePageScf>(PAGE_SLUGS.OUR_PEOPLE);

  if (!response.data) {
    console.warn(
      `[getOurPeoplePageData] Falling back to static content — ${response.error}`
    );
    return OUR_PEOPLE_FALLBACK;
  }

  const data = parseOurPeoplePage(response.data.scf ?? response.data.acf);

  data.hero.img.src = await resolveMediaId(data.hero.img.src);

  if (data.leadership?.leaders) {
    await Promise.all(
      data.leadership.leaders.map(async (leader) => {
        leader.img.src = await resolvePersonImage(leader.img.src);
      })
    );
  }

  if (data.ourTeam?.cards) {
    await Promise.all(
      data.ourTeam.cards.map(async (card) => {
        card.img.src = await resolvePersonImage(card.img.src);
      })
    );
  }

  if (data.advisorBoard?.advisors) {
    await Promise.all(
      data.advisorBoard.advisors.map(async (advisor) => {
        advisor.img.src = await resolvePersonImage(advisor.img.src);
      })
    );
  }

  // Sort people alphabetically by name
  // if (data.leadership?.leaders) {
  //   data.leadership.leaders.sort((a, b) => a.name.localeCompare(b.name));
  // }
  if (data.ourTeam?.cards) {
    data.ourTeam.cards.sort((a, b) => a.name.localeCompare(b.name));
  }
  // if (data.advisorBoard?.advisors) {
  //   data.advisorBoard.advisors.sort((a, b) => a.name.localeCompare(b.name));
  // }

  return data;
});
