export const TRACKS = [
  "https://soundcloud.com/christian-dor/in-absentia-mix-10-the",
  "https://soundcloud.com/christian-dor/jah-will-save-us-all-2",
  "https://soundcloud.com/christian-dor/in-absentia-mix-21-my-autumns-done-come",
  "https://soundcloud.com/christian-dor/this-is-my-gift-to-you",
  "https://soundcloud.com/christian-dor/in-absentia-mixtape-12-du-er-min-allerbedste-ven",
  "https://soundcloud.com/radio-panini/christian-dor-radio-panini-15",
];

export interface TrackMeta {
  url: string;
  title: string;
  artist: string;
  artwork: string;
  durationMs: number;
}

export async function fetchTrackMeta(url: string): Promise<TrackMeta> {
  const oembed = await fetch(
    `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`,
    { next: { revalidate: 3600 } }
  ).then((r) => r.json());

  const thumbnailWithoutParams = (oembed.thumbnail_url as string).split("?")[0];
  const thumbnailParts = thumbnailWithoutParams.split("-");
  thumbnailParts[thumbnailParts.length - 1] = "t500x500";
  const artwork = thumbnailParts.join("-");

  const title = (oembed.title as string).split(" by ")[0].trim();

  console.log({
    url,
    title: title,
    artist: oembed.author_name,
    artwork,
  });

  return {
    url,
    title: title,
    artist: oembed.author_name,
    artwork,
    durationMs: 0,
  };
}

export async function fetchAllTrackMeta(): Promise<TrackMeta[]> {
  const results = await Promise.allSettled(TRACKS.map(fetchTrackMeta));
  return results
    .filter(
      (r): r is PromiseFulfilledResult<TrackMeta> => r.status === "fulfilled"
    )
    .map((r) => r.value);
}
