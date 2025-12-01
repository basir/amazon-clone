"use client";

import { useEffect, useState } from "react";
import { Plus, MoreHorizontal, Search } from "lucide-react";
import Image from "next/image";
import { api, Product } from "@/lib/api";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await api.getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="p-8">Loading products...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Products
                </h2>
                <button className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                    <Plus className="h-4 w-4" />
                    Add Product
                </button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-50"
                    />
                </div>
            </div>

            <div className="rounded-xl border bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-zinc-100/50 data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800">
                                <th className="h-12 px-4 align-middle font-medium text-zinc-500 dark:text-zinc-400">
                                    Image
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-zinc-500 dark:text-zinc-400">
                                    Name
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-zinc-500 dark:text-zinc-400">
                                    Category
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-zinc-500 dark:text-zinc-400">
                                    Price
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-zinc-500 dark:text-zinc-400">
                                    Stock
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-zinc-500 dark:text-zinc-400">
                                    Rating
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-zinc-500 dark:text-zinc-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b transition-colors hover:bg-zinc-100/50 data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800"
                                >
                                    <td className="p-4 align-middle">
                                        <div className="relative h-10 w-10 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
                                            {product.image ? (
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
                                                    IMG
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle font-medium text-zinc-900 dark:text-white">
                                        {product.name}
                                    </td>
                                    <td className="p-4 align-middle text-zinc-500 dark:text-zinc-400">
                                        {product.category}
                                    </td>
                                    <td className="p-4 align-middle text-zinc-900 dark:text-white">
                                        ${product.price}
                                    </td>
                                    <td className="p-4 align-middle text-zinc-500 dark:text-zinc-400">
                                        {product.countInStock}
                                    </td>
                                    <td className="p-4 align-middle text-zinc-500 dark:text-zinc-400">
                                        {product.rating}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                            <MoreHorizontal className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
