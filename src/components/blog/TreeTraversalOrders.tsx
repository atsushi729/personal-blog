import Image from "next/image";

export function TreeTraversalOrders() {
  return (
    <div className="not-prose my-8 overflow-x-auto">
      <Image
        src="/images/tree_traversal_orders.svg"
        alt="Pre-Order・In-Order・Post-Orderの走査順序比較図"
        width={680}
        height={520}
        className="max-w-full h-auto"
        unoptimized
      />
    </div>
  );
}
