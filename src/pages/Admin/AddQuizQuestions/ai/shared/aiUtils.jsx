export const IMAGES = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=70",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=500&q=70",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=70",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=70",
];
export const ALL_LEVELS = Array.from({ length: 8 }, (_, i) => `Level ${i + 1}`);
export const COUNTS = [5, 10, 12, 15, 20, 25];
export const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export const distribute = (total, k) =>
  k ? Array.from({ length: k }, (_, i) => Math.floor(total / k) + (i < total % k ? 1 : 0)) : [];

const randm = (a) => a[Math.floor(Math.random() * a.length)];

export const randomImage = (not) => randm(IMAGES.filter((i) => i !== not));

export const randomSample = (samples, not) => {
  const pool = samples.filter((s) => s.q !== not);
  return randm(pool.length ? pool : samples);
};

export const makePreview = (samples, levels) =>
  (levels.length ? levels : ["Level 1", "Level 2"]).slice(0, 2).map((level, i) => ({
    id: crypto.randomUUID(),
    level,
    selected: true,
    img: IMAGES[i % IMAGES.length],
    ...(samples[0].pair ? { img2: IMAGES[(i + 2) % IMAGES.length] } : {}),
    ...samples[i % samples.length],
  }));