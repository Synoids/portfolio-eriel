export const PROVIDERS = [
  "Supabase",
  "Firebase",
  "Neon",
  "PlanetScale",
  "PostgreSQL",
] as const;

export type Provider = typeof PROVIDERS[number];

export const ENVIRONMENTS = [
  "Development",
  "Production",
  "Testing",
  "Archive",
] as const;

export type Environment = typeof ENVIRONMENTS[number];
