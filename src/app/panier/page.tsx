import { getProducts } from "@/lib/catalog";
import { CartView } from "@/components/cart-view";

export default async function CartPage() {
  const products = await getProducts();
  return <CartView products={products} />;
}
