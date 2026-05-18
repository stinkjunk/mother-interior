import { div } from "motion/react-client";
import CompositeLogo from "./compositelogo";
export default function LoaderThing({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="bg-blogposts p-5 rounded-full loaderThingLayer aspect-square1">
        <div className="bg-vinyls p-5 rounded-full loaderThingLayer2 aspect-square">
          <div className="bg-interior p-5 rounded-full loaderThingLayer3 h-19 w-19">
            {/* <div className="bg-background rounded-full h-22 w-22 loaderThingLayer4"></div> */}
          </div>
        </div>
      </div>
      <CompositeLogo
        className="h-full w-full absolute -translate-y-full"
        // mCol="loaderThingLayer1 fill-mi-blue-700"
        // iCol="loaderThingLayer2 fill-mi-blue-700"
        // iTittleCol="loaderThingLayer3 fill-mi-blue-700"
        stroke="stroke-background"
      ></CompositeLogo>
    </div>
  );
}
