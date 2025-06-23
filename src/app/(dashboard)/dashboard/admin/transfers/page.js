import Link from "next/link";
import { Button } from "@/components/ui/button";

const TransfersPage = () => {
  return (
    <div>
      Transfer Page
      <Button asChild>
        <Link className="" href={"/dashboard/admin/transfers/new"}>
          Create Transfer
        </Link>
      </Button>
    </div>
  );
};

export default TransfersPage;
