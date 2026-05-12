import { FaPlay } from "react-icons/fa6";

export default function LangPlayerButton() {
  return (
    <div className="flex gap-2 font-label langPlayerButton absolute top-5 right-5">
      <button className="altColor cursor-pointer">en</button>
      <button className="cursor-pointer">
        <FaPlay className="altColor"></FaPlay>
      </button>
    </div>
  );
}
