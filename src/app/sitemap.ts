import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://orangemedicaltransport.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const cities = ["orlando", "kissimmee", "winter-park", "sanford", "clermont"];

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/book`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  const cityPages = cities.map((city) => ({
    url: `${BASE_URL}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...cityPages];
}
