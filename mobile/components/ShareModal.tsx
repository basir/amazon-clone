import React, { useState } from 'react';
import { Modal, Pressable, Share, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { X, Copy, Share2, Check } from 'lucide-react-native';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    productUrl: string;
    productName: string;
}

export const ShareModal = ({ isOpen, onClose, productUrl, productName }: ShareModalProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        await Clipboard.setStringAsync(productUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Check out this product: ${productName} - ${productUrl}`,
                url: productUrl, // iOS
                title: `Share ${productName}`, // Android
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <Modal visible={isOpen} animationType="slide" transparent>
            <Box className="flex-1 bg-black/50 justify-end">
                <Box className="bg-white rounded-t-2xl p-4">
                    <HStack className="justify-between items-center mb-4 border-b border-gray-200 pb-2">
                        <Heading className="text-md">Share Product</Heading>
                        <Pressable onPress={onClose}>
                            <Icon as={X} className="w-6 h-6 text-gray-500" />
                        </Pressable>
                    </HStack>

                    <VStack className="gap-4 pb-4">
                        <Button
                            variant="outline"
                            onPress={handleCopyLink}
                            className="justify-start border-gray-300"
                        >
                            <HStack className="items-center gap-3">
                                <Icon as={copied ? Check : Copy} className={copied ? "text-green-600" : "text-gray-700"} />
                                <ButtonText className={copied ? "text-green-600" : "text-gray-700"}>
                                    {copied ? "Link Copied!" : "Copy Link"}
                                </ButtonText>
                            </HStack>
                        </Button>

                        <Button
                            variant="outline"
                            onPress={handleShare}
                            className="justify-start border-gray-300"
                        >
                            <HStack className="items-center gap-3">
                                <Icon as={Share2} className="text-gray-700" />
                                <ButtonText className="text-gray-700">Share via...</ButtonText>
                            </HStack>
                        </Button>
                    </VStack>
                </Box>
            </Box>
        </Modal>
    );
};
