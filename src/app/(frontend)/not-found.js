import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound({ message }) {
  return (
    <div className="h-[50vh] flex items-center flex-col justify-center gap-4">
      <h2 className="text-Blueish font-semibold text-base sm:text-2xl ">Not Found</h2>
      <p>Could not find requested resource</p>
      {!message && (
        <Link className={buttonVariants() + " bg-secondaryDark"} href="/">
          Return Home
        </Link>
      )}
      
    </div>
  );
}
