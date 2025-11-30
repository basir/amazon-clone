import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const [name, setName] = useState('Demo User');
    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleRegister = async () => {
        try {
            setError('');
            if (!name || !email || !password) {
                setError('Please fill in all fields');
                return;
            }
            await register({ name, email, password });
            router.replace('/(tabs)');
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <Box className="flex-1 bg-white p-4 justify-center">
            <VStack className="gap-4">
                <Heading className="text-2xl text-center">Amazon</Heading>
                <Text className="text-xl font-bold">Create Account</Text>

                {error ? (
                    <Box className="bg-red-100 p-3 rounded-md">
                        <Text className="text-red-600">{error}</Text>
                    </Box>
                ) : null}

                <VStack className="gap-2">
                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>Your name</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <InputField value={name} onChangeText={setName} placeholder="First and last name" />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>Mobile number or email</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <InputField
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>Password</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <InputField
                                value={password}
                                onChangeText={setPassword}
                                type="password"
                                placeholder="At least 6 characters"
                            />
                        </Input>
                        <Text className="text-xs text-gray-500">Passwords must be at least 6 characters.</Text>
                    </FormControl>

                    <Button onPress={handleRegister} className="bg-yellow-400" size="lg">
                        <ButtonText className="text-black">Register</ButtonText>
                    </Button>
                </VStack>

                <Box className="flex-row items-center mt-4">
                    <Text className="text-sm">Already have an account? </Text>
                    <Button variant="link" size="sm" onPress={() => router.back()} className="p-0">
                        <ButtonText>Sign in</ButtonText>
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
}
