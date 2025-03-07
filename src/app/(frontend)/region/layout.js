import { notFound } from "next/navigation";

export default function RegionLayout({ children, params }) {
  if (params?.region==="/region") {
    notFound(); 
  }
  return <>{children}</>;
}
