// "use client";
// http://localhost:3000/posts?category=vinyls&category=interior&category=blogposts

// import { useSearchParams, usePathname } from "next/navigation";
import CompositeLogo from "../compositelogo";
import Link from "next/link";
export default function NavLogo({
  className = "Home",
  ariaLabel,
}: {
  className?: string;
  ariaLabel?: string;
}) {
  // const searchParams = useSearchParams();
  // const categories = searchParams.getAll("category");
  // console.log("Current Pathname:", usePathname());
  // console.log("Categories:", categories);
  return (
    <Link href="/" aria-label={ariaLabel} className={className}>
      <CompositeLogo
        // bgCol="navLogoBgCol"
        // mCol="navLogoMCol"
        // iCol="navLogoICol"
        // iTittleCol="navLogoITittleCol"
        fillAll="navLogoFillAll"
      />
    </Link>
  );
}
