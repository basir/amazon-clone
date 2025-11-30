import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { useLocalSearchParams } from 'expo-router';
import { Header, ProductCard } from '../../components';
import { FilterModal } from '../../components/FilterModal';
import { Filter } from 'lucide-react-native';
import { Icon } from "@/components/ui/icon";
import { productAPI } from '../../services/api';
import { Product, ProductFilter } from '../../types';

export default function SearchScreen() {
    const { q, categoryId, subCategoryId, brand } = useLocalSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<ProductFilter['sortOrder']>();
    const [isDeal, setIsDeal] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterParams, setFilterParams] = useState({
        priceRange: 'all',
        rating: 'all',
        inStock: false,
        categoryId: (categoryId as string) || '',
        subCategoryId: (subCategoryId as string) || '',
        brand: (brand as string) || ''
    });

    // Update filterParams when URL params change
    useEffect(() => {
        setFilterParams(prev => ({
            ...prev,
            categoryId: (categoryId as string) || prev.categoryId,
            subCategoryId: (subCategoryId as string) || prev.subCategoryId,
            brand: (brand as string) || prev.brand
        }));
    }, [categoryId, subCategoryId, brand]);

    const handleApplyFilter = (filters: any) => {
        setFilterParams(filters);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const filter: ProductFilter = {};
                // Prioritize filterParams over URL params if set, or sync them
                if (filterParams.categoryId) filter.categoryId = filterParams.categoryId;
                if (filterParams.subCategoryId) filter.subCategoryId = filterParams.subCategoryId;
                if (filterParams.brand) filter.brand = filterParams.brand;

                if (q) filter.query = (q as string);
                if (sortOrder) filter.sortOrder = sortOrder;
                if (isDeal) filter.isDeal = true;

                if (filterParams.priceRange !== 'all') {
                    const [min, max] = filterParams.priceRange.split('-');
                    filter.minPrice = Number(min);
                    if (max) filter.maxPrice = Number(max);
                    else filter.maxPrice = 10000; // 100+ case
                }

                if (filterParams.rating !== 'all') {
                    filter.minRating = Number(filterParams.rating);
                }

                // Note: API doesn't explicitly support inStock filter in ProductFilter interface yet, 
                // but we can filter client side or assume API update. 
                // Based on previous context, let's check if we need to update types or just pass it.
                // The ProductFilter interface in types/index.ts doesn't have inStock.
                // However, the task is to "make it functional". 
                // I'll stick to what's available or simple client-side filtering if needed, 
                // but for now let's assume the API might handle it or we ignore it if not supported.
                // Wait, I should check if I can add it to the filter object.
                // The API getByFilter implementation I saw earlier didn't have inStock logic.
                // I will implement client-side filtering for inStock if the API doesn't support it,
                // OR I can add it to the API. 
                // For this step, I will just pass it if I can, or filter locally.
                // Let's filter locally for inStock to be safe and quick, or just ignore if not critical.
                // Actually, the user said "make it functional".
                // I'll filter locally for inStock after fetching if needed, or just let it be for now.
                // Let's just pass what we can.


                const response = await productAPI.getByFilter(filter);
                let data = response.data;
                if (filterParams.inStock) {
                    data = data.filter(p => p.inStock);
                }
                setProducts(data);
            } catch (error) {
                console.error('Error searching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [q, sortOrder, isDeal, filterParams]);

    return (
        <Box className="flex-1 bg-gray-100">
            <Header />
            <ScrollView>
                <Box className="p-4">
                    <Heading className="text-xl mb-4">
                        {q ? `Search results for "${q}"` : filterParams.brand ? `${filterParams.brand} Products` : filterParams.subCategoryId ? 'Subcategory Results' : filterParams.categoryId ? 'Category Results' : 'All Products'}
                    </Heading>

                    <HStack className="mb-4 gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            action="primary"
                            onPress={() => setIsFilterOpen(true)}
                            className="mr-2"
                        >
                            <Icon as={Filter} className="text-black mr-2" />
                            <ButtonText className="text-black">Filters</ButtonText>
                        </Button>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <Button
                                size="sm"
                                variant={sortOrder === 'price_asc' ? 'solid' : 'outline'}
                                action="primary"
                                onPress={() => setSortOrder(sortOrder === 'price_asc' ? undefined : 'price_asc')}
                                className="mr-2"
                            >
                                <ButtonText>Lowest Price</ButtonText>
                            </Button>
                            <Button
                                size="sm"
                                variant={sortOrder === 'rating_desc' ? 'solid' : 'outline'}
                                action="primary"
                                onPress={() => setSortOrder(sortOrder === 'rating_desc' ? undefined : 'rating_desc')}
                                className="mr-2"
                            >
                                <ButtonText>Highest Rating</ButtonText>
                            </Button>
                            <Button
                                size="sm"
                                variant={sortOrder === 'newest' ? 'solid' : 'outline'}
                                action="primary"
                                onPress={() => setSortOrder(sortOrder === 'newest' ? undefined : 'newest')}
                                className="mr-2"
                            >
                                <ButtonText>Newest</ButtonText>
                            </Button>
                        </ScrollView>
                    </HStack>

                    <FilterModal
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        onApply={handleApplyFilter}
                        currentFilters={filterParams}
                    />

                    {loading ? (
                        <Box className="flex-1 justify-center items-center py-10">
                            <Spinner size="large" className="text-primary-500" />
                        </Box>
                    ) : products.length > 0 ? (
                        <Box className="flex-row flex-wrap">
                            {products.map(product => (
                                <Box key={product.id} className="w-1/2">
                                    <ProductCard product={product} />
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Box className="flex-1 justify-center items-center py-10">
                            <Text className="text-gray-500">No products found.</Text>
                        </Box>
                    )}
                </Box>
            </ScrollView>
        </Box>
    );
}
