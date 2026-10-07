import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BALANCE = {
  total: 12450.75,
  income: 4200.0,
  expense: 1875.5,
};

const QUICK_ACTIONS = [
  { id: "send", label: "Send", icon: "arrow-up-circle", color: "#4f46e5" },
  {
    id: "request",
    label: "Request",
    icon: "arrow-down-circle",
    color: "#10b981",
  },
  { id: "topup", label: "Top Up", icon: "add-circle", color: "#f59e0b" },
  {
    id: "more",
    label: "More",
    icon: "ellipsis-horizontal-circle",
    color: "#64748b",
  },
];

const TRANSACTIONS = [
  {
    id: 1,
    title: "Spotify Premium",
    category: "Entertainment",
    amount: -9.99,
    icon: "musical-notes",
    color: "#1db954",
    date: "Today",
  },
  {
    id: 2,
    title: "Salary",
    category: "Income",
    amount: 3200.0,
    icon: "cash",
    color: "#10b981",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Coffee Shop",
    category: "Food & Drink",
    amount: -4.5,
    icon: "cafe",
    color: "#f59e0b",
    date: "Yesterday",
  },
  {
    id: 4,
    title: "Uber Ride",
    category: "Transport",
    amount: -12.75,
    icon: "car",
    color: "#0ea5e9",
    date: "2 days ago",
  },
  {
    id: 5,
    title: "Netflix",
    category: "Entertainment",
    amount: -15.99,
    icon: "film",
    color: "#e50914",
    date: "3 days ago",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ── Header ────────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <View>
            <Text className="text-sm text-slate-500">Good morning 👋</Text>
            <Text className="text-xl font-bold text-slate-900 mt-0.5">
              Rakibul Hasan
            </Text>
          </View>
          <TouchableOpacity className="w-11 h-11 rounded-full bg-white border border-slate-200 items-center justify-center">
            <Ionicons name="notifications-outline" size={20} color="#334155" />
          </TouchableOpacity>
        </View>

        {/* ── Balance Card ──────────────────────── */}
        <View className="mx-5 mt-4 p-6 bg-indigo-600 rounded-3xl">
          <View className="flex-row items-center justify-between">
            <Text className="text-indigo-100 text-sm font-medium">
              Total Balance
            </Text>
            <View className="bg-indigo-500/60 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-medium">USD</Text>
            </View>
          </View>

          <Text className="text-white text-4xl font-bold mt-2">
            $
            {BALANCE.total.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </Text>

          <View className="flex-row gap-3 mt-5">
            <View className="flex-1 flex-row items-center gap-2 bg-indigo-500/40 rounded-xl px-3 py-2.5">
              <View className="w-7 h-7 rounded-full bg-emerald-400 items-center justify-center">
                <Ionicons name="arrow-down" size={14} color="#fff" />
              </View>
              <View>
                <Text className="text-indigo-100 text-xs">Income</Text>
                <Text className="text-white text-sm font-semibold">
                  +${BALANCE.income.toFixed(2)}
                </Text>
              </View>
            </View>

            <View className="flex-1 flex-row items-center gap-2 bg-indigo-500/40 rounded-xl px-3 py-2.5">
              <View className="w-7 h-7 rounded-full bg-rose-400 items-center justify-center">
                <Ionicons name="arrow-up" size={14} color="#fff" />
              </View>
              <View>
                <Text className="text-indigo-100 text-xs">Expense</Text>
                <Text className="text-white text-sm font-semibold">
                  -${BALANCE.expense.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Quick Actions ─────────────────────── */}
        <View className="flex-row justify-between px-5 mt-6">
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              activeOpacity={0.7}
              className="items-center"
            >
              <View
                className="w-14 h-14 rounded-2xl items-center justify-center bg-white border border-slate-100"
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 2 },
                }}
              >
                <Ionicons
                  name={action.icon as any}
                  size={24}
                  color={action.color}
                />
              </View>
              <Text className="text-xs font-medium text-slate-700 mt-2">
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Recent Transactions ───────────────── */}
        <View className="flex-row items-center justify-between px-5 mt-7 mb-3">
          <Text className="text-lg font-bold text-slate-900">
            Recent Transactions
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-sm font-medium text-indigo-600">See all</Text>
          </TouchableOpacity>
        </View>

        <View className="px-5">
          {TRANSACTIONS.map((tx) => (
            <TouchableOpacity
              key={tx.id}
              activeOpacity={0.7}
              className="flex-row items-center bg-white rounded-2xl p-3.5 mb-3 border border-slate-100"
            >
              <View
                className="w-11 h-11 rounded-xl items-center justify-center"
                style={{ backgroundColor: `${tx.color}20` }}
              >
                <Ionicons name={tx.icon as any} size={20} color={tx.color} />
              </View>

              <View className="flex-1 ml-3">
                <Text className="text-base font-semibold text-slate-900">
                  {tx.title}
                </Text>
                <Text className="text-xs text-slate-500 mt-0.5">
                  {tx.category} • {tx.date}
                </Text>
              </View>

              <Text
                className={`text-base font-bold ${
                  tx.amount > 0 ? "text-emerald-600" : "text-slate-900"
                }`}
              >
                {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
