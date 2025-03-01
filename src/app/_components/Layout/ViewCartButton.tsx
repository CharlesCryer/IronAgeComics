import { Button } from "@/lib/shadcn/components/ui/button";
import Link from "next/link";

const ViewCartButton = () => {
  return (
    <div>
      <Link href={"/cart"} className="flex items-center">
        <Button>{"View shopping cart"}</Button>
      </Link>
    </div>
  );
};

export default ViewCartButton;
