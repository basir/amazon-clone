import React, { useState, useEffect } from 'react';
import { Modal, Pressable, ScrollView } from 'react-native';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { X, ChevronDown, ChevronUp } from 'lucide-react-native';
import { productAPI } from '../services/api';
import { Category } from '../types';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: any) => void;
    currentFilters: any;
}

export const FilterModal = ({ isOpen, onClose, onApply, currentFilters }: FilterModalProps) => {
    const [priceRange, setPriceRange] = useState(currentFilters.priceRange || 'all');
    const [rating, setRating] = useState(currentFilters.rating || 'all');
    const [inStock, setInStock] = useState(currentFilters.inStock || false);
    const [selectedCategory, setSelectedCategory] = useState<string>(currentFilters.categoryId || '');
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>(currentFilters.subCategoryId || '');
    const [selectedBrand, setSelectedBrand] = useState<string>(currentFilters.brand || '');

    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Collapsible states
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isBrandOpen, setIsBrandOpen] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, brandsRes] = await Promise.all([
                    productAPI.getCategories(),
                    productAPI.getBrands()
                ]);
                setCategories(categoriesRes.data);
                setBrands(brandsRes.data);
            } catch (error) {
                console.error('Error fetching filter data:', error);
            } finally {
                setLoading(false);
            }
        };
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    // Update local state when currentFilters change (e.g. from URL)
    useEffect(() => {
        if (isOpen) {
            setPriceRange(currentFilters.priceRange || 'all');
            setRating(currentFilters.rating || 'all');
            setInStock(currentFilters.inStock || false);
            setSelectedCategory(currentFilters.categoryId || '');
            setSelectedSubCategory(currentFilters.subCategoryId || '');
            setSelectedBrand(currentFilters.brand || '');
        }
    }, [isOpen, currentFilters]);

    const handleApply = () => {
        onApply({
            priceRange,
            rating,
            inStock,
            categoryId: selectedCategory,
            subCategoryId: selectedSubCategory,
            brand: selectedBrand
        });
        onClose();
    };

    const handleCategorySelect = (catId: string) => {
        if (selectedCategory === catId) {
            setSelectedCategory('');
            setSelectedSubCategory('');
        } else {
            setSelectedCategory(catId);
            setSelectedSubCategory('');
        }
    };

    const activeCategory = categories.find(c => c.id === selectedCategory);

    return (
        <Modal visible={isOpen} animationType="slide" transparent>
            <Box className="flex-1 bg-black/50 justify-end">
                <Box className="bg-white rounded-t-2xl p-4 h-[85%]">
                    <HStack className="justify-between items-center mb-4 border-b border-gray-200 pb-2">
                        <Heading className="text-md">Filters</Heading>
                        <Pressable onPress={onClose}>
                            <Icon as={X} className="w-6 h-6 text-gray-500" />
                        </Pressable>
                    </HStack>

                    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                        <VStack className="gap-6 pb-4">
                            {/* Category Filter */}
                            <VStack className="gap-2">
                                <Pressable onPress={() => setIsCategoryOpen(!isCategoryOpen)} className="flex-row justify-between items-center">
                                    <Text className="font-bold text-lg">Category</Text>
                                    <Icon as={isCategoryOpen ? ChevronUp : ChevronDown} size="sm" />
                                </Pressable>
                                {isCategoryOpen && (
                                    <VStack className="gap-2 pl-2">
                                        <HStack className="flex-wrap gap-2">
                                            {categories.map((cat) => (
                                                <Button
                                                    key={cat.id}
                                                    size="xs"
                                                    variant={selectedCategory === cat.id ? 'solid' : 'outline'}
                                                    onPress={() => handleCategorySelect(cat.id)}
                                                    className={`rounded-full ${selectedCategory === cat.id ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}
                                                >
                                                    <ButtonText className={selectedCategory === cat.id ? 'text-white' : 'text-gray-700'}>
                                                        {cat.name}
                                                    </ButtonText>
                                                </Button>
                                            ))}
                                        </HStack>

                                        {/* Subcategories */}
                                        {activeCategory && activeCategory.subCategories && (
                                            <Box className="mt-2 bg-gray-50 p-3 rounded-md">
                                                <Text className="text-sm font-bold mb-2 text-gray-600">Subcategory</Text>
                                                <HStack className="flex-wrap gap-2">
                                                    {activeCategory.subCategories.map((sub: { id: string; name: string }) => (
                                                        <Pressable
                                                            key={sub.id}
                                                            onPress={() => setSelectedSubCategory(selectedSubCategory === sub.id ? '' : sub.id)}
                                                            className={`px-3 py-1 rounded-full border ${selectedSubCategory === sub.id ? 'bg-primary-100 border-primary-500' : 'bg-white border-gray-300'}`}
                                                        >
                                                            <Text className={`text-xs ${selectedSubCategory === sub.id ? 'text-primary-700 font-bold' : 'text-gray-600'}`}>
                                                                {sub.name}
                                                            </Text>
                                                        </Pressable>
                                                    ))}
                                                </HStack>
                                            </Box>
                                        )}
                                    </VStack>
                                )}
                            </VStack>

                            <Box className="h-[1px] bg-gray-200" />

                            {/* Brand Filter */}
                            <VStack className="gap-2">
                                <Pressable onPress={() => setIsBrandOpen(!isBrandOpen)} className="flex-row justify-between items-center">
                                    <Text className="font-bold text-lg">Brand</Text>
                                    <Icon as={isBrandOpen ? ChevronUp : ChevronDown} size="sm" />
                                </Pressable>
                                {isBrandOpen && (
                                    <HStack className="flex-wrap gap-2 pl-2">
                                        {brands.map((brand) => (
                                            <Button
                                                key={brand}
                                                size="xs"
                                                variant={selectedBrand === brand ? 'solid' : 'outline'}
                                                onPress={() => setSelectedBrand(selectedBrand === brand ? '' : brand)}
                                                className={`rounded-full ${selectedBrand === brand ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}
                                            >
                                                <ButtonText className={selectedBrand === brand ? 'text-white' : 'text-gray-700'}>
                                                    {brand}
                                                </ButtonText>
                                            </Button>
                                        ))}
                                    </HStack>
                                )}
                            </VStack>

                            <Box className="h-[1px] bg-gray-200" />

                            {/* Price Range */}
                            <VStack className="gap-2">
                                <Text className="font-bold text-lg">Price Range</Text>
                                <HStack className="gap-2 flex-wrap pl-2">
                                    {['all', '0-50', '50-100', '100+'].map((range) => (
                                        <Button
                                            key={range}
                                            size="sm"
                                            variant={priceRange === range ? 'solid' : 'outline'}
                                            onPress={() => setPriceRange(range)}
                                            className={`rounded-full ${priceRange === range ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}
                                        >
                                            <ButtonText className={priceRange === range ? 'text-white' : 'text-gray-700'}>
                                                {range === 'all' ? 'All' : `$${range}`}
                                            </ButtonText>
                                        </Button>
                                    ))}
                                </HStack>
                            </VStack>

                            <Box className="h-[1px] bg-gray-200" />

                            {/* Rating */}
                            <VStack className="gap-2">
                                <Text className="font-bold text-lg">Rating</Text>
                                <HStack className="gap-2 flex-wrap pl-2">
                                    {['all', '4', '3'].map((r) => (
                                        <Button
                                            key={r}
                                            size="sm"
                                            variant={rating === r ? 'solid' : 'outline'}
                                            onPress={() => setRating(r)}
                                            className={`rounded-full ${rating === r ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`}
                                        >
                                            <ButtonText className={rating === r ? 'text-white' : 'text-gray-700'}>
                                                {r === 'all' ? 'All' : `${r}+ Stars`}
                                            </ButtonText>
                                        </Button>
                                    ))}
                                </HStack>
                            </VStack>

                            <Box className="h-[1px] bg-gray-200" />

                            {/* Availability */}
                            <VStack className="gap-2">
                                <Text className="font-bold text-lg">Availability</Text>
                                <Box className="pl-2">
                                    <Checkbox
                                        value="instock"
                                        isChecked={inStock}
                                        onChange={(isSelected: boolean) => setInStock(isSelected)}
                                    >
                                        <CheckboxIndicator className="mr-2">
                                            <CheckboxIcon as={CheckIcon} />
                                        </CheckboxIndicator>
                                        <CheckboxLabel>In Stock Only</CheckboxLabel>
                                    </Checkbox>
                                </Box>
                            </VStack>
                        </VStack>
                    </ScrollView>

                    <HStack className="justify-between gap-4 mt-4 pt-2 border-t border-gray-200">
                        <Button
                            variant="outline"
                            onPress={() => {
                                setPriceRange('all');
                                setRating('all');
                                setInStock(false);
                                setSelectedCategory('');
                                setSelectedSubCategory('');
                                setSelectedBrand('');
                            }}
                            className="flex-1 border-gray-300"
                        >
                            <ButtonText className="text-gray-700">Reset</ButtonText>
                        </Button>
                        <Button onPress={handleApply} className="flex-1 bg-primary-500">
                            <ButtonText className="text-white">Apply Filters</ButtonText>
                        </Button>
                    </HStack>
                </Box>
            </Box>
        </Modal>
    );
};
