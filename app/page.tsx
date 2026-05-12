import Image from "next/image";
import Link from "next/link";
import CompositeLogo from "./components/compositelogo";
import SimpleDropdown from "./components/simpledropdown";

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
      <div className="absolute w-screen h-screen max-sm:bg-mi-neutral-200/68 max-sm:mix-blend-lighten"></div>
      <div className="h-screen w-screen flex items-center justify-center flex-col z-10">
        <div className="absolute top-30">
          <CompositeLogo
            className="w-22 h-22 mb-1"
            // TEST:
            // bgCol="fill-mi-mint-100"
            // mCol="fill-mi-tomato-500"
            // iCol="fill-mi-mint-500"
            // iTittleCol="fill-mi-yellow-500"
          ></CompositeLogo>
          <h1 className="hidden">Mother Interior</h1>
        </div>
        <nav>
          <ul className="flex flex-col mt-5 gap-5 items-center font-semibold">
            {/* <li>
              <Link href="/items?categories=interior">Interior</Link>
            </li>
            <li>
              <Link href="/items?categories=vinyls">Vinyls</Link>
            </li>
            <li>
              <Link href="/items?categories=blogposts">Blog</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li> */}
            <SimpleDropdown
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
            <Link href="/about">About</Link>
          </ul>
        </nav>
      </div>
    </>
  );
}
