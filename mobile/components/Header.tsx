import React, { useState } from 'react';
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { Search, ShoppingCart, Menu, Sparkle, Camera, ArrowLeft } from 'lucide-react-native';
import { router, usePathname } from 'expo-router';
import { useCart } from '../context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, View } from 'react-native';
import { showAlert } from '@/utils';

export const Header = () => {
    const pathName = usePathname()
    const { itemCount } = useCart();
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim()) {
            router.push({
                pathname: '/(tabs)/search',
                params: { q: query }
            });
        }
    };
    return (
        <View style={{ backgroundColor: '#ff6200' }} className="py-4">
            <SafeAreaView edges={['top']}>
                <Box className="px-4 flex flex-row items-center">
                    {pathName !== '/' && (
                        <Pressable onPress={() => router.back()}>
                            <Icon as={ArrowLeft} size='xl' className="text-white px-1" style={{ width: 32, height: 32 }} />
                        </Pressable>
                    )}
                    <Input className="bg-white rounded-full h-12 flex-1 "    >
                        <InputSlot className="ps-3">
                            <InputIcon as={Search} className="text-gray-500" />
                        </InputSlot>
                        <InputField
                            placeholder="Search or ask a question"
                            className="text-black"
                            value={query}
                            onChangeText={setQuery}
                            onSubmitEditing={handleSearch}
                            returnKeyType="search"
                        />

                        <InputSlot className="pe-3">
                            <Pressable onPress={() => showAlert('Find it with an image')}>
                                <InputIcon as={Camera} className="text-gray-500" />
                            </Pressable>
                        </InputSlot>
                    </Input>

                </Box>
            </SafeAreaView>
        </View>
    );
};
