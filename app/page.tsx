import Image from "next/image";
import Link from "next/link";
import CompositeLogo from "./components/compositelogo";
import SimpleDropdown from "./components/simpledropdown";
import LineDrawer from "./components/linedrawer";

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen absolute">
        <Image
          className="h-full object-cover -z-10"
          src="/media/heroimg-placeholder.jpg"
          alt="Mother Interior"
          priority
          fill
        ></Image>
      </div>
      {/* BOUNDING BOX OVERLAY FOR HERO IMAGE - DESKTOP ONLY */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
        style={{
          width: "max(100vw, calc(100vh * 637 / 478))",
          aspectRatio: "637/ 478",
        }}
      >
        <Link
          href="/items?categories=interior"
          className="absolute bBox Interior"
          style={{ top: "50%", left: "45%", width: "60%", height: "50%" }}
        />
        <Link
          href="/items?categories=vinyls"
          className="absolute bBox Vinyls"
          style={{ top: "30%", left: "25%", width: "35%", height: "30%" }}
        />
      </div>
      <div className="absolute w-screen h-screen sm:hidden bg-mi-neutral-200/68 mix-blend-lighten -z-10"></div>
      <div className="max-sm:h-screen  z-10 flex flex-col max-sm:items-center max-sm:justify-center sm:w-fit sm:ml-10 sm:mt-10 sm:text-mi-neutral-50">
        <div className="max-sm:absolute max-sm:top-20 flex flex-col items-center">
          <CompositeLogo
            className="w-22 h-22 mb-1"
            fillAll="sm:fill-mi-yellow-300 fill-mi-blue-700"
          ></CompositeLogo>
          <h1 className="text-xl font-display">Mother Interior</h1>
        </div>
        <nav>
          <ul className="flex flex-col mt-5 gap-5 max-sm:items-center font-semibold">
            <SimpleDropdown
              topClassName="sm:hidden"
              ulClassName="gap-5 items-center mt-5 font-normal"
              title="Items"
              titleURL="/items"
              options={[
                { label: "Interior", url: "/items?categories=interior" },
                { label: "Vinyls", url: "/items?categories=vinyls" },
                { label: "Blog", url: "/items?categories=blogposts" },
              ]}
              id="items-dropdown"
            ></SimpleDropdown>
            <Link href="/items" className="max-sm:hidden dskHeroLink">
              All items
            </Link>
            <Link
              href="/items?categories=vinyls"
              className="max-sm:hidden dskHeroLink Vinyls"
            >
              Vinyls
            </Link>
            <Link
              href="/items?categories=interior"
              className="max-sm:hidden dskHeroLink Interior"
            >
              Interior
            </Link>
            <Link
              href="/items?categories=blogposts"
              className="max-sm:hidden dskHeroLink"
            >
              Blog
            </Link>
            <Link href="/about" className="dskHeroLink">
              About
            </Link>
          </ul>
        </nav>
      </div>
      <LineDrawer />
    </>
  );
}
