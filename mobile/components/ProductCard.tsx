import React from 'react';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { Star, Heart } from 'lucide-react-native';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { router } from 'expo-router';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const handlePress = () => {
        router.push(`/product/${product.id}`);
    };

    const handleAddToCart = (e: any) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleToggleWishlist = (e: any) => {
        e.stopPropagation();
        toggleWishlist(product.id);
    };

    return (
        <Pressable onPress={handlePress} className="flex-1 m-1">
            <Box className="bg-white rounded-lg border border-gray-300">
                <Box className="relative">
                    <Box className="w-full aspect-square overflow-hidden rounded-t-lg">
                        <Image
                            source={{ uri: product.images[0] }}
                            alt={product.name}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </Box>
                    <Pressable
                        className="absolute top-2 right-2 p-1 bg-white rounded-full opacity-80"
                        onPress={handleToggleWishlist}
                    >
                        <Icon as={Heart} className={`${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                    </Pressable>
                </Box>

                <VStack className="p-2 gap-1  ">
                    <Text className="text-xs font-medium">{product.brand}</Text>
                    <Text
                        numberOfLines={3}
                        ellipsizeMode="tail" className="text-sm font-normal  min-h-[60px] line-clamp-3">{product.name}</Text>

                    <HStack className="items-center gap-1">
                        <Icon as={Star} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <Text className="text-xs text-gray-500">{product.rating.toFixed(1)}</Text>
                    </HStack>

                    <HStack className="items-center gap-1">
                        <Text className="font-bold text-lg">${product.price}</Text>
                        {product.originalPrice && (
                            <Text className="text-xs line-through text-gray-400">
                                ${product.originalPrice}
                            </Text>
                        )}
                    </HStack>

                    {product.isDeal && (
                        <Box className="bg-red-500 px-2 py-0.5 rounded-sm self-start">
                            <Text className="text-white text-2xs font-bold">Deal</Text>
                        </Box>
                    )}
                </VStack>
            </Box>
        </Pressable>
    );
};
