// The four product divisions. `category` must match the product category
// stored in the database (admin panel → Categories).
export type Division = {
  slug: string;
  category: string;
  short: string;
  number: string;
  tagline: string;
  intro: string;
  applications: string[];
  capabilities: { title: string; text: string }[];
};

export const DIVISIONS: Division[] = [
  {
    slug: "facade-lighting",
    category: "Facade Lighting",
    short: "Facade",
    number: "01",
    tagline: "Wall washers, grazers and linear profiles for building exteriors.",
    intro:
      "Exterior lighting systems that reveal the form, texture and rhythm of a building after dark. From uniform wall washing to tight grazing on stone and glass, every luminaire is specified for outdoor duty and controlled glare.",
    applications: ["Commercial towers", "Hotels & hospitality", "Heritage & institutional buildings", "Retail frontages", "Bridges & infrastructure", "Residential facades"],
    capabilities: [
      { title: "Precise optics", text: "Narrow to wide beam options and asymmetric lenses to place light on the surface, not the sky." },
      { title: "Built for exteriors", text: "Weather-sealed aluminium housings with ingress ratings suited to permanent outdoor installation." },
      { title: "Dynamic control", text: "Static white or colour-changing versions with DMX / DALI control on request." },
    ],
  },
  {
    slug: "fiber-optic-lighting",
    category: "Fiber Optic Lighting",
    short: "Fiber Optic",
    number: "02",
    tagline: "Star ceilings, pool fibres and showcase lighting.",
    intro:
      "Fibre optic systems move light, not electricity: the light engine sits safely out of sight while the fibres carry illumination to ceilings, water and display cases. Ideal where heat, maintenance access or water make conventional fittings impractical.",
    applications: ["Star-sky ceilings", "Home theatres & lounges", "Swimming pools & spas", "Museum & jewellery showcases", "Hospitality interiors", "Feature walls"],
    capabilities: [
      { title: "No voltage at the point of light", text: "Fibre ends carry no electricity or heat, which suits pools, spas and delicate displays." },
      { title: "Remote light engine", text: "The illuminator is installed in an accessible location, so maintenance never disturbs the finished ceiling or pool." },
      { title: "Effects on demand", text: "Twinkle, colour change and dimming effects controlled from the light source." },
    ],
  },
  {
    slug: "landscape-lighting",
    category: "Landscape Lighting",
    short: "Landscape",
    number: "03",
    tagline: "Path lights, bollards, spikes and underwater fittings.",
    intro:
      "Outdoor lighting for gardens, pathways and open spaces that guides people safely and brings planting and water features to life, while keeping glare and upward light spill under control.",
    applications: ["Gardens & lawns", "Pathways & driveways", "Parks & public spaces", "Resorts & villas", "Water features & pools", "Building perimeters"],
    capabilities: [
      { title: "Wayfinding & safety", text: "Low-level path lights and bollards that light the ground where people walk." },
      { title: "Durable outdoor finishes", text: "Corrosion-resistant bodies and sealed optics for year-round exposure." },
      { title: "Discreet by day", text: "Compact forms that sit quietly in the landscape until the lights come on." },
    ],
  },
  {
    slug: "indoor-architectural-lighting",
    category: "Indoor Architectural Lighting",
    short: "Indoor",
    number: "04",
    tagline: "Downlights, track spots, cove and suspended linear lighting.",
    intro:
      "Architectural interior lighting that balances visual comfort with precise accenting: concealed coves, low-glare downlights, flexible track spots and suspended linear systems for workspaces, hospitality and homes.",
    applications: ["Offices & workspaces", "Hotels & restaurants", "Retail & showrooms", "Residences", "Galleries & museums", "Lobbies & corridors"],
    capabilities: [
      { title: "Visual comfort", text: "Deep-set optics and glare control so the space is lit, not the eye." },
      { title: "Accurate colour", text: "High colour-rendering LEDs that show materials, finishes and skin tones as they are." },
      { title: "Integrated design", text: "Recessed, surface, track and suspended options that disappear into the architecture." },
    ],
  },
];

export const divisionBySlug = (slug: string) => DIVISIONS.find((d) => d.slug === slug);
export const divisionByCategory = (category: string) => DIVISIONS.find((d) => d.category === category);
export const divisionHref = (category: string) => {
  const d = divisionByCategory(category);
  return d ? `/products/${d.slug}` : `/products?cat=${encodeURIComponent(category)}`;
};
