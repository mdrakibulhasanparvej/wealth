import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const USER = {
  name: "Rakibul Hasan",
  email: "rakibul@example.com",
  initials: "RH",
  memberSince: "Jan 2024",
};

const STATS = [
  { label: "Transactions", value: "247" },
  { label: "Budgets", value: "8" },
  { label: "Goals", value: "3" },
];

const MENU_SECTIONS = [
  {
    title: "Account",
    items: [
      {
        id: "personal",
        label: "Personal Info",
        icon: "person-outline",
        color: "#4f46e5",
      },
      {
        id: "security",
        label: "Security",
        icon: "shield-checkmark-outline",
        color: "#10b981",
      },
      {
        id: "payment",
        label: "Payment Methods",
        icon: "card-outline",
        color: "#f59e0b",
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: "notifications-outline",
        color: "#0ea5e9",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        id: "currency",
        label: "Currency",
        icon: "cash-outline",
        color: "#8b5cf6",
        badge: "USD",
      },
      {
        id: "language",
        label: "Language",
        icon: "globe-outline",
        color: "#ec4899",
        badge: "English",
      },
      {
        id: "theme",
        label: "Appearance",
        icon: "color-palette-outline",
        color: "#14b8a6",
        badge: "Light",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        id: "help",
        label: "Help Center",
        icon: "help-circle-outline",
        color: "#64748b",
      },
      {
        id: "feedback",
        label: "Send Feedback",
        icon: "chatbubble-outline",
        color: "#f97316",
      },
      {
        id: "about",
        label: "About Welth",
        icon: "information-circle-outline",
        color: "#64748b",
      },
    ],
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ── Header ─────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <Text className="text-2xl font-bold text-slate-900">Profile</Text>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center">
            <Ionicons name="settings-outline" size={20} color="#334155" />
          </TouchableOpacity>
        </View>

        {/* ── Profile Card ───────────────────── */}
        <View className="mx-5 mt-4 p-5 bg-white rounded-3xl border border-slate-100">
          <View className="flex-row items-center">
            <View className="w-16 h-16 rounded-full bg-indigo-600 items-center justify-center">
              <Text className="text-white text-2xl font-bold">
                {USER.initials}
              </Text>
            </View>

            <View className="flex-1 ml-4">
              <Text className="text-lg font-bold text-slate-900">
                {USER.name}
              </Text>
              <Text className="text-sm text-slate-500 mt-0.5">
                {USER.email}
              </Text>
              <View className="flex-row items-center mt-1.5">
                <Ionicons name="ribbon-outline" size={12} color="#f59e0b" />
                <Text className="text-xs text-slate-500 ml-1">
                  Member since {USER.memberSince}
                </Text>
              </View>
            </View>

            <TouchableOpacity className="w-9 h-9 rounded-full bg-slate-100 items-center justify-center">
              <Ionicons name="pencil" size={16} color="#334155" />
            </TouchableOpacity>
          </View>

          {/* Stats Row */}
          <View className="flex-row mt-5 pt-4 border-t border-slate-100">
            {STATS.map((stat, idx) => (
              <View
                key={stat.label}
                className={`flex-1 items-center ${
                  idx < STATS.length - 1 ? "border-r border-slate-100" : ""
                }`}
              >
                <Text className="text-xl font-bold text-slate-900">
                  {stat.value}
                </Text>
                <Text className="text-xs text-slate-500 mt-0.5">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Menu Sections ──────────────────── */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} className="mt-6">
            <Text className="px-5 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {section.title}
            </Text>

            <View className="mx-5 bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.6}
                  className={`flex-row items-center px-4 py-3.5 ${
                    idx < section.items.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <View
                    className="w-9 h-9 rounded-xl items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={18}
                      color={item.color}
                    />
                  </View>

                  <Text className="flex-1 ml-3 text-base font-medium text-slate-800">
                    {item.label}
                  </Text>

                  <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* ── Logout Button ──────────────────── */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="mx-5 mt-6 py-3.5 bg-rose-50 border border-rose-100 rounded-2xl flex-row items-center justify-center"
        >
          <Ionicons name="log-out-outline" size={18} color="#e11d48" />
          <Text className="ml-2 text-base font-semibold text-rose-600">
            Log Out
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-xs text-slate-400 mt-4">
          Welth v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
