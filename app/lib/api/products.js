


const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ======= Get All Products =======
export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products/all`, {
      next: { revalidate: 60 },
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error("API Error (Products):", error);
    return { products: [] };
  }
}