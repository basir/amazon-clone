import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Spinner } from "@/components/ui/spinner";
import { Heading } from "@/components/ui/heading";
import { Header, BannerCarousel, CategoryList, ProductCard } from '../../components';
import { productAPI } from '../../services/api';
import { Product, Category, Banner } from '../../types';

export default function HomeScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes, bannersRes] = await Promise.all([
                productAPI.getAll(),
                productAPI.getCategories(),
                productAPI.getBanners(),
            ]);

            setProducts(productsRes.data);
            setCategories(categoriesRes.data);
            setBanners(bannersRes.data);
        } catch (error) {
            console.error('Error fetching home data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    if (loading) {
        return (
            <Box className="flex-1 justify-center items-center bg-white">
                <Spinner size="large" className="text-primary-500" />
            </Box>
        );
    }

    const deals = products.filter(p => p.isDeal);
    const bestsellers = products.filter(p => p.isBestseller);

    return (
        <Box className="flex-1 bg-gray-100">
            <Header />
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007185" />
                }
            >
                <BannerCarousel banners={banners} />

                <VStack className="gap-4 py-4">
                    <CategoryList categories={categories} />

                    {deals.length > 0 && (
                        <Box className="bg-white p-4 mt-2">
                            <Heading className="text-md mb-2">Deals of the Day</Heading>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {deals.map(product => (
                                    <Box key={product.id} className="w-48">
                                        <ProductCard product={product} />
                                    </Box>
                                ))}
                            </ScrollView>
                        </Box>
                    )}

                    {bestsellers.length > 0 && (
                        <Box className="bg-white p-4 mt-2">
                            <Heading className="text-md mb-2">Best Sellers</Heading>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {bestsellers.map(product => (
                                    <Box key={product.id} className="w-48">
                                        <ProductCard product={product} />
                                    </Box>
                                ))}
                            </ScrollView>
                        </Box>
                    )}

                    <Box className="bg-white p-4 mt-2">
                        <Heading className="text-md mb-2">Recommended for You</Heading>
                        <Box className="flex-row flex-wrap">
                            {products.map(product => (
                                <Box key={product.id} className="w-1/2">
                                    <ProductCard product={product} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </VStack>
            </ScrollView>
        </Box>
    );
}
