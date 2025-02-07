import Link from "next/link";

const ViewCartButton = () => {
  return (
    <div>
      <Link href={"/cart"} className="flex items-center">
        {"View shopping cart"}
      </Link>
    </div>
  );
};

export default ViewCartButton;
