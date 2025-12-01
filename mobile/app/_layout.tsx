import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import '@/global.css'
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, CartProvider, WishlistProvider } from "../context";
import * as Linking from 'expo-linking';

import { StripeProvider } from "@/utils/stripe";

export default function RootLayout() {
    const urlScheme = Linking.createURL('/');
    return (
        <SafeAreaProvider>
            <StripeProvider
                publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
                urlScheme={urlScheme}
            >
                <GluestackUIProvider mode="light">
                    <AuthProvider>
                        <CartProvider>
                            <WishlistProvider>
                                <Stack  >
                                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                                    <Stack.Screen name="(auth)/login" options={{ headerShown: true, title: "Login" }} />
                                    <Stack.Screen name="(auth)/register" options={{ headerShown: true, title: "Register" }} />
                                    <Stack.Screen name="index" options={{ headerShown: false }} />
                                    <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
                                    <Stack.Screen name="checkout" options={{ headerShown: false }} />
                                    <Stack.Screen name="orders/index" options={{ headerShown: true, title: "Orders" }} />
                                    <Stack.Screen name="orders/[id]" options={{ headerShown: true, title: "Order" }} />

                                </Stack>
                            </WishlistProvider>
                        </CartProvider>
                    </AuthProvider>
                </GluestackUIProvider>
            </StripeProvider>
        </SafeAreaProvider>
    );
}
