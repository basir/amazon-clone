import React from 'react';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Star, User } from 'lucide-react-native';
import { Review } from '../types';

interface ReviewListProps {
    reviews: Review[];
}

const ReviewItem = ({ review }: { review: Review }) => {
    return (
        <Box className="bg-gray-50 p-4 rounded-lg mb-3">
            <HStack className="justify-between items-start mb-2">
                <HStack className="items-center gap-2">
                    <Box className="bg-gray-200 p-2 rounded-full">
                        <Icon as={User} size="sm" className="text-gray-500" />
                    </Box>
                    <Text className="font-bold text-gray-800">{review.userName}</Text>
                </HStack>
                <Text className="text-xs text-gray-500">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                </Text>
            </HStack>

            <HStack className="mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                        key={star}
                        as={Star}
                        size="xs"
                        className={`${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </HStack>

            <Text className="text-gray-700">{review.comment}</Text>
        </Box>
    );
};

export const ReviewList = ({ reviews }: ReviewListProps) => {
    if (!reviews || reviews.length === 0) {
        return (
            <Box className="py-4">
                <Text className="text-gray-500 text-center italic">No reviews yet. Be the first to review!</Text>
            </Box>
        );
    }

    return (
        <VStack className="gap-2">
            {reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
            ))}
        </VStack>
    );
};
