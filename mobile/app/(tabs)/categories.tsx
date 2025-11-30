import React, { useEffect, useState } from 'react';
import { ScrollView, Pressable, View } from 'react-native';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import { Header } from '../../components';
import { productAPI } from '../../services/api';
import { Category } from '../../types';
import { router } from 'expo-router';
import { Accordion, AccordionContent, AccordionContentText, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';
import { Divider } from '@/components/ui/divider';

export default function CategoriesScreen() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productAPI.getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <Box className="flex-1 justify-center items-center bg-white">
                <Spinner size="large" className="text-primary-500" />
            </Box>
        );
    }

    return (
        <Box className="flex-1 bg-white">
            <Header />
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Heading className="text-xl mb-4">Shop by Category</Heading>

                <Accordion
                    size="md"
                    variant="filled"
                    type="single"
                    isCollapsible={true}
                    isDisabled={false}
                    className="border-none shadow-none"
                >{categories
                    .map((category: Category) => (
                        <AccordionItem className='border border-gray-300 rounded-lg my-1' key={category.id} value={category.id} >
                            <AccordionHeader>
                                <AccordionTrigger className='w-full'>
                                    {({ isExpanded }: { isExpanded: boolean }) => {
                                        return (<View key={category.id} className='w-full flex flex-row justify-between items-center'>
                                            <View className='flex flex-row items-center gap-2'>

                                                <Image
                                                    source={{ uri: category.image }}
                                                    alt={category.name}
                                                    className="h-[50px] w-[50px] rounded-lg"
                                                />
                                                <AccordionTitleText>
                                                    {category.name}
                                                </AccordionTitleText>
                                            </View>
                                            {isExpanded ? (
                                                <AccordionIcon as={ChevronUpIcon} className="-ml-3" />
                                            ) : (
                                                <AccordionIcon as={ChevronDownIcon} className="-ml-3" />
                                            )}
                                        </View>
                                        );
                                    }}
                                </AccordionTrigger>
                            </AccordionHeader>
                            <AccordionContent>
                                {category.subCategories?.map((subCategory) => (
                                    <Pressable
                                        key={subCategory.id}
                                        onPress={() => router.push({ pathname: '/search', params: { categoryId: category.id, subCategoryId: subCategory.id } })}
                                    >
                                        <Box
                                            className="  p-2 rounded-lg border border-gray-300  m-1 flex-row items-center"
                                        >
                                            {subCategory.image &&
                                                <Image
                                                    source={{ uri: subCategory.image }}
                                                    alt={subCategory.name}
                                                    className="h-[60px] w-[60px] rounded-md mr-4"
                                                />
                                            }
                                            <Text>{subCategory.name}</Text>
                                        </Box>
                                    </Pressable>
                                ))}

                                {/* <AccordionContentText>
                                    To place an order, simply select the products you want, proceed to
                                    checkout, provide shipping and payment information, and finalize
                                    your purchase.
                                </AccordionContentText> */}
                            </AccordionContent>
                        </AccordionItem>

                    ))}
                </Accordion>

                {/*                 
                <VStack className="gap-4">
                    {categories.map((category) => (
                        <Pressable
                            key={category.id}
                            onPress={() => router.push({ pathname: '/search', params: { categoryId: category.id } })}
                        >
                            <Box
                                className="bg-white p-4 rounded-lg shadow-sm flex-row items-center"
                            >
                                <Image
                                    source={{ uri: category.image }}
                                    alt={category.name}
                                    className="h-[60px] w-[60px] rounded-md mr-4"
                                />
                                <Text className="text-lg font-bold">{category.name}</Text>
                            </Box>
                        </Pressable>
                    ))}
                </VStack> */}
            </ScrollView>
        </Box >
    );
}
