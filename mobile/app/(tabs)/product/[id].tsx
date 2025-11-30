import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import { Divider } from "@/components/ui/divider";
import { useLocalSearchParams, router } from 'expo-router';
import { Header, ReviewList, AddReviewModal, ShareModal, ProductCard } from '../../../components';
import { productAPI, reviewAPI } from '../../../services/api';
import { Product, Review } from '../../../types';
import { useCart } from '../../../context/CartContext';
import { Star, Heart, Share2, MessageSquare } from 'lucide-react-native';
import { useWishlist } from '../../../context/WishlistContext';
import { Pressable } from '@/components/ui/pressable';
import { useAuth } from '../../../context/AuthContext';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [youMightLikeProducts, setYouMightLikeProducts] = useState<Product[]>([]);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { user } = useAuth();

    useEffect(() => {
        const fetchProductAndReviews = async () => {
            try {
                const [productRes, reviewsRes] = await Promise.all([
                    productAPI.getById(Number(id)),
                    reviewAPI.getByProduct(id.toString())
                ]);
                setProduct(productRes.data);
                setReviews(reviewsRes.data);

                // Fetch related products based on category
                if (productRes.data) {
                    const categoryRes = await productAPI.getByCategory(productRes.data.categoryId);
                    const allCategoryProducts = categoryRes.data;

                    setRelatedProducts(allCategoryProducts.filter(p => p.subCategoryId === productRes.data.subCategoryId && p.id !== productRes.data.id));
                    setYouMightLikeProducts(allCategoryProducts.filter(p => p.subCategoryId !== productRes.data.subCategoryId && p.id !== productRes.data.id));
                }
            } catch (error) {
                console.error('Error fetching product or reviews:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductAndReviews();
    }, [id]);

    const handleAddReview = async (rating: number, comment: string) => {
        if (!user) {
            // Ideally show login modal or redirect
            alert('Please login to write a review');
            return;
        }

        setIsSubmittingReview(true);
        try {
            const newReview = {
                productId: id.toString(),
                userId: user.id,
                userName: user.name || 'Anonymous',
                rating,
                comment
            };
            const response = await reviewAPI.create(newReview);
            setReviews(prev => [response.data as Review, ...prev]);
            setIsReviewModalOpen(false);
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review');
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <Box className="flex-1 justify-center items-center bg-white">
                <Spinner size="large" className="text-primary-500" />
            </Box>
        );
    }

    if (!product) {
        return (
            <Box className="flex-1 justify-center items-center bg-white">
                <Text>Product not found</Text>
            </Box>
        );
    }

    const isWishlisted = isInWishlist(product.id);

    return (
        <Box className="flex-1 bg-white">
            <Header />
            <ScrollView>
                <Heading className="text-xl flex-1 px-4 m-1">{product.name}</Heading>


                <Box className="relative">
                    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                        {product.images.map((image, index) => (
                            <Box key={index} className="bg-white justify-center items-center h-[300px]" style={{ width }}>
                                <Image
                                    source={{ uri: image }}
                                    alt={product.name}
                                    className="w-full h-full"
                                    resizeMode="contain"
                                />
                            </Box>
                        ))}
                    </ScrollView>

                    <Box className="absolute top-2 right-2 flex-row">
                        <Button variant="link" onPress={() => setIsShareModalOpen(true)} className="p-2">
                            <Icon as={Share2} className="text-gray-500" />
                        </Button>
                    </Box>
                </Box>

                <VStack className="gap-4 p-4">

                    <HStack className="items-center gap-1">
                        <Text className="font-bold">{product.rating.toFixed(1)}</Text>
                        <HStack>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Icon
                                    key={star}
                                    as={Star}
                                    className={`w-3 h-3 ${star <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                            ))}
                        </HStack>
                        <Text className="text-gray-500 text-sm">({product.ratingCount} reviews)</Text>
                    </HStack>

                    <Divider />

                    <VStack className="gap-1">
                        <HStack className="items-baseline gap-1">
                            <Text className="text-sm relative -top-2">$</Text>
                            <Text className="text-4xl font-bold">{Math.floor(product.price)}</Text>
                            <Text className="text-sm relative -top-2">{(product.price % 1).toFixed(2).substring(2)}</Text>
                        </HStack>
                        {product.originalPrice && (
                            <Text className="line-through text-gray-500">
                                List Price: ${product.originalPrice}
                            </Text>
                        )}
                    </VStack>

                    {product.inStock ? (
                        <Text className="text-green-600 font-bold text-lg">In Stock</Text>
                    ) : (
                        <Text className="text-red-600 font-bold text-lg">Currently Unavailable</Text>
                    )}

                    <HStack className="items-center flex-wrap gap-1">
                        <Text className="text-gray-600">Brand:</Text>
                        <Button
                            variant='link'
                            className="font-bold text-primary-500 underline"
                            onPress={() => router.push({ pathname: '/(tabs)/search', params: { brand: product.brand } })}
                        >
                            <ButtonText>{product.brand}</ButtonText>
                        </Button>
                    </HStack>

                    <HStack className="items-center flex-wrap gap-1">
                        <Text className="text-gray-600">Category:</Text>
                        <Button
                            variant='link'
                            className="font-bold text-primary-500 underline"
                            onPress={() => router.push({ pathname: '/(tabs)/search', params: { categoryId: product.categoryId } })}
                        >
                            <ButtonText>{product.category} </ButtonText>
                        </Button>
                        <Text className="text-gray-600">/</Text>
                        <Button
                            variant='link'
                            className="font-bold text-primary-500 underline"
                            onPress={() => router.push({ pathname: '/(tabs)/search', params: { categoryId: product.categoryId, subCategoryId: product.subCategoryId } })}
                        >
                            <ButtonText>{product.subCategory}</ButtonText>
                        </Button>

                    </HStack>

                    <VStack className="gap-4 mt-4">
                        <Button
                            onPress={() => addToCart(product)}
                            className="bg-yellow-400 rounded-full h-12"
                        >
                            <ButtonText className="text-black">Add to Cart</ButtonText>
                        </Button>

                        <Button
                            onPress={() => {
                                addToCart(product);
                                router.push('/(tabs)/cart');
                            }}
                            className="bg-orange-500 rounded-full h-12"
                        >
                            <ButtonText className="text-black">Buy Now</ButtonText>
                        </Button>

                        <Button
                            variant="outline"
                            onPress={() => toggleWishlist(product.id)}
                            className="border-gray-300 rounded-md"
                        >
                            <HStack className="gap-2 items-center">
                                <Icon as={Heart} className={`${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                                <ButtonText className="text-black">{isWishlisted ? 'Remove from Wish List' : 'Add to Wish List'}</ButtonText>
                            </HStack>
                        </Button>
                    </VStack>

                    <Divider className="my-4" />

                    <Heading className="text-md">About this item</Heading>
                    <Text className="text-gray-700 leading-md">
                        {product.description || "No description available for this product."}
                    </Text>

                    <Divider className="my-4" />

                    <Divider className="my-4" />

                    {relatedProducts.length > 0 && (
                        <Box className="mb-6">
                            <Heading className="text-lg mb-2">Related Products</Heading>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {relatedProducts.map(item => (
                                    <Box key={item.id} className="w-48 mr-2">
                                        <ProductCard product={item} />
                                    </Box>
                                ))}
                            </ScrollView>
                        </Box>
                    )}

                    {youMightLikeProducts.length > 0 && (
                        <Box className="mb-6">
                            <Heading className="text-lg mb-2">You Might Also Like</Heading>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {youMightLikeProducts.map(item => (
                                    <Box key={item.id} className="w-48 mr-2">
                                        <ProductCard product={item} />
                                    </Box>
                                ))}
                            </ScrollView>
                        </Box>
                    )}

                    <HStack className="justify-between items-center mb-4">
                        <Heading className="text-md">Customer Reviews</Heading>
                        <Button
                            size="sm"
                            variant="outline"
                            onPress={() => setIsReviewModalOpen(true)}
                            className="border-gray-300"
                        >
                            <ButtonText className="text-black text-xs">Write a Review</ButtonText>
                        </Button>
                    </HStack>

                    <ReviewList reviews={reviews} />
                </VStack>
            </ScrollView>

            <AddReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleAddReview}
                isSubmitting={isSubmittingReview}
            />
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                productUrl={`https://amazon-clone.com/product/${id}`}
                productName={product.name}
            />
        </Box>
    );
}
