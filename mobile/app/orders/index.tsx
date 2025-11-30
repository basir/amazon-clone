import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";
import { Spinner } from "@/components/ui/spinner";
import { Header, EmptyState } from '../../components';
import { orderAPI } from '../../services/api';
import { Order } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';
import { Package } from 'lucide-react-native';

export default function OrdersScreen() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async () => {
        if (!user) return;
        try {
            const response = await orderAPI.getByUser(user.id);
            // Sort by date desc
            const sortedOrders = response.data.sort((a: Order, b: Order) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setOrders(sortedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchOrders();
    };

    if (loading) {
        return (
            <Box className="flex-1 justify-center items-center bg-white">
                <Spinner size="large" className="text-primary-500" />
            </Box>
        );
    }

    if (orders.length === 0) {
        return (
            <Box className="flex-1 bg-white">
                {/* <Header /> */}
                <EmptyState
                    icon={Package}
                    title="No Orders Yet"
                    message="You haven't placed any orders yet."
                    actionLabel="Start Shopping"
                    onAction={() => router.push('/(tabs)')}
                />
            </Box>
        );
    }

    return (
        <Box className="flex-1 bg-gray-100">
            {/* <Header /> */}
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007185" />
                }
            >
                <VStack className="gap-4 p-4">
                    <Heading className="text-xl">Your Orders</Heading>

                    {orders.map((order) => (
                        <Pressable key={order.id} onPress={() => router.push(`/orders/${order.id}`)}>
                            <Box className="bg-white p-4 rounded-md shadow-sm">
                                <HStack className="justify-between mb-2">
                                    <VStack>
                                        <Text className="text-xs text-gray-500">ORDER PLACED</Text>
                                        <Text className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</Text>
                                    </VStack>
                                    <VStack className="items-end">
                                        <Text className="text-xs text-gray-500">TOTAL</Text>
                                        <Text className="text-sm font-bold">${order.totalAmount.toFixed(2)}</Text>
                                    </VStack>
                                </HStack>

                                <VStack className="gap-4 mt-2">
                                    <HStack className="gap-4 items-center">
                                        <Box className="bg-green-100 px-2 py-1 rounded-sm">
                                            <Text className="text-green-800 text-xs font-bold uppercase">
                                                {order.status}
                                            </Text>
                                        </Box>
                                        <Text className="text-sm text-gray-500">Order # {order.orderNumber}</Text>
                                    </HStack>

                                    <HStack className="gap-2">
                                        {order.items.slice(0, 3).map((item, index) => (
                                            <Image
                                                key={index}
                                                source={{ uri: item.productImage }}
                                                alt={item.productName}
                                                className="h-[60px] w-[60px] rounded-sm border border-gray-200"
                                                resizeMode="contain"
                                            />
                                        ))}
                                        {order.items.length > 3 && (
                                            <Box className="h-[60px] w-[60px] bg-gray-100 justify-center items-center rounded-sm">
                                                <Text className="text-gray-500">+{order.items.length - 3}</Text>
                                            </Box>
                                        )}
                                    </HStack>
                                </VStack>
                            </Box>
                        </Pressable>
                    ))}
                </VStack>
            </ScrollView>
        </Box>
    );
}
