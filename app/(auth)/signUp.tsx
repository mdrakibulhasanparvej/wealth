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

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (password.length === 0) return { label: "", color: "", width: "0%" };
    if (password.length < 6)
      return { label: "Weak", color: "#e11d48", width: "33%" };
    if (password.length < 10)
      return { label: "Fair", color: "#f59e0b", width: "66%" };
    return { label: "Strong", color: "#10b981", width: "100%" };
  };

  const strength = getPasswordStrength();

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    if (!agreeTerms) {
      Alert.alert("Error", "Please agree to Terms & Conditions");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Clerk sign up
      // const { createdSessionId, setActive } = await signUp.create({
      //   emailAddress: email,
      //   password,
      //   firstName: name.split(" ")[0],
      //   lastName: name.split(" ").slice(1).join(" "),
      // });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace("/(root)/(tabs)");
    } catch (err: any) {
      Alert.alert("Error", err?.message || "Something went wrong");
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
          {/* ── Back Button ────────────────────── */}
          <View className="px-6 pt-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center"
            >
              <Ionicons name="arrow-back" size={20} color="#334155" />
            </TouchableOpacity>
          </View>

          {/* ── Header Section ─────────────────── */}
          <View className="px-6 pt-6 pb-8">
            <Text className="text-3xl font-bold text-slate-900">
              Create Account
            </Text>
            <Text className="text-base text-slate-500 mt-2">
              Join Welth and start managing your finances smartly
            </Text>
          </View>

          {/* ── Form Section ───────────────────── */}
          <View className="px-6">
            {/* Full Name */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                <Ionicons name="person-outline" size={18} color="#94a3b8" />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Rakibul Hasan"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="words"
                  className="flex-1 py-3.5 ml-3 text-base text-slate-900"
                />
              </View>
            </View>

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
            <View className="mb-2">
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
                  placeholder="Create a strong password"
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

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <View className="mt-2">
                  <View className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <View
                      style={{
                        width: strength.width,
                        backgroundColor: strength.color,
                      }}
                      className="h-full rounded-full"
                    />
                  </View>
                  <Text
                    className="text-xs font-medium mt-1"
                    style={{ color: strength.color }}
                  >
                    {strength.label} password
                  </Text>
                </View>
              )}
            </View>

            {/* Confirm Password */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </Text>
              <View
                className={`flex-row items-center bg-slate-50 border rounded-2xl px-4 ${
                  confirmPassword && confirmPassword !== password
                    ? "border-rose-300"
                    : "border-slate-200"
                }`}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#94a3b8"
                />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Re-enter your password"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="flex-1 py-3.5 ml-3 text-base text-slate-900"
                />
                {confirmPassword.length > 0 && (
                  <Ionicons
                    name={
                      confirmPassword === password
                        ? "checkmark-circle"
                        : "close-circle"
                    }
                    size={18}
                    color={confirmPassword === password ? "#10b981" : "#e11d48"}
                  />
                )}
              </View>
            </View>

            {/* Terms Checkbox */}
            <TouchableOpacity
              onPress={() => setAgreeTerms(!agreeTerms)}
              activeOpacity={0.7}
              className="flex-row items-start mb-6"
            >
              <View
                className={`w-5 h-5 rounded-md border-2 items-center justify-center mt-0.5 ${
                  agreeTerms
                    ? "bg-indigo-600 border-indigo-600"
                    : "border-slate-300"
                }`}
              >
                {agreeTerms && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </View>
              <Text className="text-sm text-slate-600 ml-3 flex-1 leading-5">
                I agree to the{" "}
                <Text className="text-indigo-600 font-semibold">
                  Terms & Conditions
                </Text>{" "}
                and{" "}
                <Text className="text-indigo-600 font-semibold">
                  Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
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
                    Create Account
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
                Already have an account?{" "}
              </Text>
              <Link href="/(auth)/signIn" asChild>
                <TouchableOpacity>
                  <Text className="text-sm font-bold text-indigo-600">
                    Sign In
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
