// "use client";
// http://localhost:3000/items?category=vinyls&category=interior&category=blogposts

// import { useSearchParams, usePathname } from "next/navigation";
import CompositeLogo from "../compositelogo";

export default function NavLogo() {
  // const searchParams = useSearchParams();
  // const categories = searchParams.getAll("category");
  // console.log("Current Pathname:", usePathname());
  // console.log("Categories:", categories);
  return (
    <CompositeLogo
      bgCol="navLogoBgCol"
      mCol="navLogoMCol"
      iCol="navLogoICol"
      iTittleCol="navLogoITittleCol"
    />
  );
}
