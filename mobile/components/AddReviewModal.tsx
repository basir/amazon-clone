import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Star, X } from 'lucide-react-native';
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";

interface AddReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, comment: string) => void;
    isSubmitting: boolean;
}

export const AddReviewModal = ({ isOpen, onClose, onSubmit, isSubmitting }: AddReviewModalProps) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        onSubmit(rating, comment);
        setComment('');
        setRating(5);
    };

    return (
        <Modal
            visible={isOpen}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View className="flex-1 justify-end bg-black/50">
                        <TouchableWithoutFeedback>
                            <Box className="bg-white rounded-t-3xl p-6">
                                <HStack className="justify-between items-center mb-6">
                                    <Heading size="md" className="text-typography-950">
                                        Write a Review
                                    </Heading>
                                    <Pressable onPress={onClose}>
                                        <Icon as={X} size="md" className="text-gray-500" />
                                    </Pressable>
                                </HStack>

                                <Box className="mb-6">
                                    <Text className="mb-2 font-bold text-gray-700">Rating</Text>
                                    <HStack className="gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Pressable key={star} onPress={() => setRating(star)}>
                                                <Icon
                                                    as={Star}
                                                    size="xl"
                                                    className={`${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                                />
                                            </Pressable>
                                        ))}
                                    </HStack>
                                </Box>

                                <Box className="mb-6">
                                    <Text className="mb-2 font-bold text-gray-700">Review</Text>
                                    <Input className="h-32 p-2 border border-gray-300 rounded-md">
                                        <InputField
                                            placeholder="Share your thoughts about this product..."
                                            value={comment}
                                            onChangeText={setComment}
                                            multiline={true}
                                            textAlignVertical="top"
                                            className="text-black"
                                        />
                                    </Input>
                                </Box>

                                <HStack className="justify-end gap-3">
                                    <Button
                                        variant="outline"
                                        onPress={onClose}
                                        className="border-gray-300"
                                    >
                                        <ButtonText className="text-gray-700">Cancel</ButtonText>
                                    </Button>
                                    <Button
                                        onPress={handleSubmit}
                                        isDisabled={isSubmitting || !comment.trim()}
                                        className="bg-yellow-400"
                                    >
                                        <ButtonText className="text-black">
                                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                        </ButtonText>
                                    </Button>
                                </HStack>
                            </Box>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};
