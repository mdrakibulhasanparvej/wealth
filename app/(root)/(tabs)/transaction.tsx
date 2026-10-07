import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TxType = "income" | "expense";

type Transaction = {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: TxType;
  icon: string;
  color: string;
  date: string;
};

const TRANSACTIONS: Transaction[] = [
  // Today
  {
    id: "1",
    title: "Spotify Premium",
    category: "Entertainment",
    amount: 9.99,
    type: "expense",
    icon: "musical-notes",
    color: "#1db954",
    date: "Today",
  },
  {
    id: "2",
    title: "Coffee Shop",
    category: "Food & Drink",
    amount: 4.5,
    type: "expense",
    icon: "cafe",
    color: "#f59e0b",
    date: "Today",
  },
  {
    id: "3",
    title: "Salary",
    category: "Income",
    amount: 3200,
    type: "income",
    icon: "cash",
    color: "#10b981",
    date: "Today",
  },

  // Yesterday
  {
    id: "4",
    title: "Uber Ride",
    category: "Transport",
    amount: 12.75,
    type: "expense",
    icon: "car",
    color: "#0ea5e9",
    date: "Yesterday",
  },
  {
    id: "5",
    title: "Grocery Store",
    category: "Shopping",
    amount: 87.3,
    type: "expense",
    icon: "cart",
    color: "#ec4899",
    date: "Yesterday",
  },
  {
    id: "6",
    title: "Freelance Work",
    category: "Income",
    amount: 850,
    type: "income",
    icon: "laptop",
    color: "#22c55e",
    date: "Yesterday",
  },

  // This Week
  {
    id: "7",
    title: "Netflix",
    category: "Entertainment",
    amount: 15.99,
    type: "expense",
    icon: "film",
    color: "#e50914",
    date: "This Week",
  },
  {
    id: "8",
    title: "Electricity Bill",
    category: "Bills",
    amount: 125.4,
    type: "expense",
    icon: "flash",
    color: "#8b5cf6",
    date: "This Week",
  },
  {
    id: "9",
    title: "Pharmacy",
    category: "Health",
    amount: 45.2,
    type: "expense",
    icon: "medkit",
    color: "#ef4444",
    date: "This Week",
  },
  {
    id: "10",
    title: "Gym Membership",
    category: "Health",
    amount: 35,
    type: "expense",
    icon: "barbell",
    color: "#14b8a6",
    date: "This Week",
  },
];

const FILTERS = ["All", "Income", "Expense"];

export default function TransactionScreen() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return TRANSACTIONS.filter((tx) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Income" && tx.type === "income") ||
        (filter === "Expense" && tx.type === "expense");

      const matchesSearch =
        tx.title.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  // Date অনুযায়ী group করা
  const grouped = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};
    filtered.forEach((tx) => {
      if (!groups[tx.date]) groups[tx.date] = [];
      groups[tx.date].push(tx);
    });
    return groups;
  }, [filtered]);

  // Summary calculations
  const totalIncome = filtered
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      {/* ── Header ─────────────────────────── */}
      <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
        <View>
          <Text className="text-2xl font-bold text-slate-900">
            Transactions
          </Text>
          <Text className="text-sm text-slate-500 mt-0.5">
            {filtered.length} total records
          </Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center">
          <Ionicons name="funnel-outline" size={18} color="#334155" />
        </TouchableOpacity>
      </View>

      {/* ── Summary Cards ──────────────────── */}
      <View className="flex-row px-5 mt-3 gap-3">
        <View className="flex-1 bg-white rounded-2xl border border-slate-100 p-3.5">
          <View className="flex-row items-center">
            <View className="w-7 h-7 rounded-full bg-emerald-100 items-center justify-center">
              <Ionicons name="arrow-down" size={14} color="#10b981" />
            </View>
            <Text className="text-xs text-slate-500 ml-2 font-medium">
              Income
            </Text>
          </View>
          <Text className="text-lg font-bold text-emerald-600 mt-2">
            +${totalIncome.toFixed(2)}
          </Text>
        </View>

        <View className="flex-1 bg-white rounded-2xl border border-slate-100 p-3.5">
          <View className="flex-row items-center">
            <View className="w-7 h-7 rounded-full bg-rose-100 items-center justify-center">
              <Ionicons name="arrow-up" size={14} color="#e11d48" />
            </View>
            <Text className="text-xs text-slate-500 ml-2 font-medium">
              Expense
            </Text>
          </View>
          <Text className="text-lg font-bold text-rose-600 mt-2">
            -${totalExpense.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* ── Search Bar ─────────────────────── */}
      <View className="mx-5 mt-4 bg-white rounded-2xl border border-slate-100 flex-row items-center px-4">
        <Ionicons name="search" size={18} color="#94a3b8" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search transactions..."
          placeholderTextColor="#94a3b8"
          className="flex-1 py-3 ml-2 text-sm text-slate-900"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={18} color="#cbd5e1" />
          </TouchableOpacity>
        )}
      </View>

      {/* ── Filter Tabs ────────────────────── */}
      <View className="flex-row px-5 mt-4 gap-2">
        {FILTERS.map((f) => {
          const isActive = filter === f;
          return (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              activeOpacity={0.7}
              className={`px-4 py-2 rounded-full ${
                isActive ? "bg-indigo-600" : "bg-white border border-slate-200"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  isActive ? "text-white" : "text-slate-600"
                }`}
              >
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Transaction List ───────────────── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        {Object.keys(grouped).length === 0 ? (
          <View className="items-center justify-center py-16 px-10">
            <View className="w-20 h-20 rounded-full bg-slate-100 items-center justify-center mb-4">
              <Ionicons name="receipt-outline" size={36} color="#94a3b8" />
            </View>
            <Text className="text-base font-semibold text-slate-700">
              No transactions found
            </Text>
            <Text className="text-sm text-slate-500 text-center mt-1">
              Try adjusting your search or filter
            </Text>
          </View>
        ) : (
          Object.entries(grouped).map(([date, items]) => (
            <View key={date} className="mb-4">
              {/* Date Header */}
              <View className="flex-row items-center justify-between px-5 mb-2">
                <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {date}
                </Text>
                <Text className="text-xs text-slate-400">
                  {items.length} items
                </Text>
              </View>

              {/* Items */}
              <View className="mx-5 bg-white rounded-2xl border border-slate-100 overflow-hidden">
                {items.map((tx, idx) => (
                  <TouchableOpacity
                    key={tx.id}
                    activeOpacity={0.6}
                    className={`flex-row items-center p-3.5 ${
                      idx < items.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    {/* Icon */}
                    <View
                      className="w-11 h-11 rounded-xl items-center justify-center"
                      style={{ backgroundColor: `${tx.color}15` }}
                    >
                      <Ionicons
                        name={tx.icon as any}
                        size={20}
                        color={tx.color}
                      />
                    </View>

                    {/* Info */}
                    <View className="flex-1 ml-3">
                      <Text className="text-base font-semibold text-slate-900">
                        {tx.title}
                      </Text>
                      <Text className="text-xs text-slate-500 mt-0.5">
                        {tx.category}
                      </Text>
                    </View>

                    {/* Amount */}
                    <View className="items-end">
                      <Text
                        className={`text-base font-bold ${
                          tx.type === "income"
                            ? "text-emerald-600"
                            : "text-slate-900"
                        }`}
                      >
                        {tx.type === "income" ? "+" : "-"}$
                        {tx.amount.toFixed(2)}
                      </Text>
                      <View
                        className={`mt-1 px-1.5 py-0.5 rounded ${
                          tx.type === "income"
                            ? "bg-emerald-50"
                            : "bg-slate-100"
                        }`}
                      >
                        <Text
                          className={`text-[9px] font-bold uppercase ${
                            tx.type === "income"
                              ? "text-emerald-600"
                              : "text-slate-500"
                          }`}
                        >
                          {tx.type}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
