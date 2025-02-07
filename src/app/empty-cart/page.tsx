import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center py-90">
      <h1>Your shopping cart is empty</h1>
      <Link href={"/shop"}>Click here to visit our shop</Link>
    </div>
  );
}
