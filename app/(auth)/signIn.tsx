import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Clerk sign in
      // const { error } = await signIn.create({
      //   identifier: email,
      //   password,
      // });
      // if (error) throw error;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace("/(root)/(tabs)");
    } catch (err) {
      Alert.alert("Error", "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Header Section ─────────────────── */}
          <View className="px-6 pt-12 pb-8">
            <View className="w-16 h-16 rounded-2xl bg-indigo-600 items-center justify-center mb-6">
              <Ionicons name="wallet" size={30} color="#fff" />
            </View>

            <Text className="text-3xl font-bold text-slate-900">
              Welcome back 👋
            </Text>
            <Text className="text-base text-slate-500 mt-2">
              Sign in to continue managing your finances
            </Text>
          </View>

          {/* ── Form Section ───────────────────── */}
          <View className="px-6">
            {/* Email */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                Email
              </Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                <Ionicons name="mail-outline" size={18} color="#94a3b8" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="flex-1 py-3.5 ml-3 text-base text-slate-900"
                />
              </View>
            </View>

            {/* Password */}
            <View className="mb-3">
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                Password
              </Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#94a3b8"
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="flex-1 py-3.5 ml-3 text-base text-slate-900"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={18}
                    color="#94a3b8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="self-end mb-6">
              <Text className="text-sm font-semibold text-indigo-600">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleSignIn}
              disabled={isLoading}
              activeOpacity={0.8}
              className={`py-4 rounded-2xl items-center flex-row justify-center ${
                isLoading ? "bg-indigo-400" : "bg-indigo-600"
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text className="text-white text-base font-bold">
                    Sign In
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color="#fff"
                    style={{ marginLeft: 8 }}
                  />
                </>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-slate-200" />
              <Text className="text-xs text-slate-400 mx-3 font-medium">
                OR CONTINUE WITH
              </Text>
              <View className="flex-1 h-px bg-slate-200" />
            </View>

            {/* Social Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-1 flex-row items-center justify-center bg-white border border-slate-200 rounded-2xl py-3.5"
              >
                <Ionicons name="logo-google" size={18} color="#ea4335" />
                <Text className="ml-2 text-sm font-semibold text-slate-700">
                  Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-1 flex-row items-center justify-center bg-white border border-slate-200 rounded-2xl py-3.5"
              >
                <Ionicons name="logo-apple" size={18} color="#000" />
                <Text className="ml-2 text-sm font-semibold text-slate-700">
                  Apple
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Footer ─────────────────────────── */}
          <View className="flex-1 justify-end pb-6 pt-8">
            <View className="flex-row items-center justify-center">
              <Text className="text-sm text-slate-500">
                Do not have an account?{" "}
              </Text>
              <Link href="/(auth)/signUp" asChild>
                <TouchableOpacity>
                  <Text className="text-sm font-bold text-indigo-600">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
