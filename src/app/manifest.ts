import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yuva Unstoppable",
    short_name: "Yuva",
    description:
      "Yuva Unstoppable is a premier non-profit organization registered in India and the US, empowering resilient communities and government schools through digital literacy, sanitation, scholarships, and agroforestry.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5F2",
    theme_color: "#241E19",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
