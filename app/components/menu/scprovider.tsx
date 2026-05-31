import { fetchAllTrackMeta, type TrackMeta } from "@/lib/tracks";

export default async function SCProvider({
  children,
}: {
  children: (tracks: TrackMeta[]) => React.ReactNode;
}) {
  const tracks = await fetchAllTrackMeta();
  return <>{children(tracks)}</>;
}
