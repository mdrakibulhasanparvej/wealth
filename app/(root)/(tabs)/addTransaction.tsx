import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  { id: "food", label: "Food", icon: "fast-food-outline", color: "#f59e0b" },
  {
    id: "transport",
    label: "Transport",
    icon: "car-outline",
    color: "#0ea5e9",
  },
  { id: "shopping", label: "Shopping", icon: "bag-outline", color: "#ec4899" },
  { id: "bills", label: "Bills", icon: "receipt-outline", color: "#8b5cf6" },
  {
    id: "entertainment",
    label: "Fun",
    icon: "game-controller-outline",
    color: "#ef4444",
  },
  { id: "health", label: "Health", icon: "medkit-outline", color: "#10b981" },
  { id: "salary", label: "Salary", icon: "cash-outline", color: "#22c55e" },
  {
    id: "other",
    label: "Other",
    icon: "ellipsis-horizontal",
    color: "#64748b",
  },
];

export default function AddTransaction() {
  const router = useRouter();
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [note, setNote] = useState("");

  const isIncome = type === "income";
  const accentColor = isIncome ? "#10b981" : "#e11d48";

  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    const transaction = {
      type,
      amount: parseFloat(amount),
      category,
      note,
      date: new Date().toISOString(),
    };

    console.log("Saving transaction:", transaction);
    Alert.alert("Success", "Transaction saved!");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top", "bottom"]}>
      {/* ── Header ─────────────────────────── */}
      <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center"
        >
          <Ionicons name="close" size={20} color="#334155" />
        </TouchableOpacity>

        <Text className="text-lg font-bold text-slate-900">
          Add Transaction
        </Text>

        <View className="w-10" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Type Toggle ────────────────────── */}
        <View className="mx-5 mt-4 p-1 bg-white rounded-2xl border border-slate-100 flex-row">
          <TouchableOpacity
            onPress={() => setType("expense")}
            activeOpacity={0.7}
            className={`flex-1 py-2.5 rounded-xl flex-row items-center justify-center ${
              !isIncome ? "bg-rose-500" : ""
            }`}
          >
            <Ionicons
              name="arrow-up"
              size={16}
              color={!isIncome ? "#fff" : "#64748b"}
            />
            <Text
              className={`ml-1.5 text-sm font-semibold ${
                !isIncome ? "text-white" : "text-slate-500"
              }`}
            >
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setType("income")}
            activeOpacity={0.7}
            className={`flex-1 py-2.5 rounded-xl flex-row items-center justify-center ${
              isIncome ? "bg-emerald-500" : ""
            }`}
          >
            <Ionicons
              name="arrow-down"
              size={16}
              color={isIncome ? "#fff" : "#64748b"}
            />
            <Text
              className={`ml-1.5 text-sm font-semibold ${
                isIncome ? "text-white" : "text-slate-500"
              }`}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Amount Input ───────────────────── */}
        <View className="mx-5 mt-6 bg-white rounded-3xl border border-slate-100 p-6 items-center">
          <Text className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Amount
          </Text>

          <View className="flex-row items-center mt-3">
            <Text
              className="text-3xl font-bold mr-1"
              style={{ color: accentColor }}
            >
              $
            </Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor="#cbd5e1"
              keyboardType="decimal-pad"
              className="text-5xl font-bold text-slate-900 min-w-[120px]"
              style={{ color: accentColor }}
            />
          </View>
        </View>

        {/* ── Category Picker ────────────────── */}
        <View className="mt-6">
          <Text className="px-5 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Category
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = category === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setCategory(cat.id)}
                  activeOpacity={0.7}
                  className="items-center"
                >
                  <View
                    className="w-14 h-14 rounded-2xl items-center justify-center border-2"
                    style={{
                      backgroundColor: isActive ? cat.color : `${cat.color}15`,
                      borderColor: isActive ? cat.color : "transparent",
                    }}
                  >
                    <Ionicons
                      name={cat.icon as any}
                      size={22}
                      color={isActive ? "#fff" : cat.color}
                    />
                  </View>
                  <Text
                    className={`text-xs mt-1.5 font-medium ${
                      isActive ? "text-slate-900" : "text-slate-500"
                    }`}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ── Note Input ─────────────────────── */}
        <View className="mx-5 mt-6">
          <Text className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Note (Optional)
          </Text>

          <View className="bg-white rounded-2xl border border-slate-100 flex-row items-center px-4">
            <Ionicons name="create-outline" size={18} color="#94a3b8" />
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="What was this for?"
              placeholderTextColor="#94a3b8"
              className="flex-1 py-3.5 ml-2 text-base text-slate-900"
              multiline
            />
          </View>
        </View>

        {/* ── Date Row ───────────────────────── */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="mx-5 mt-4 bg-white rounded-2xl border border-slate-100 flex-row items-center px-4 py-3.5"
        >
          <View className="w-9 h-9 rounded-xl bg-indigo-50 items-center justify-center">
            <Ionicons name="calendar-outline" size={18} color="#4f46e5" />
          </View>
          <Text className="flex-1 ml-3 text-base font-medium text-slate-800">
            Today
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
        </TouchableOpacity>

        {/* ── Save Button ────────────────────── */}
        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.8}
          className="mx-5 mt-8 py-4 rounded-2xl flex-row items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text className="ml-2 text-white text-base font-bold">
            Save {isIncome ? "Income" : "Expense"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
