import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
};

const SUGGESTIONS = [
  { id: "1", label: "Analyze my spending", icon: "analytics-outline" },
  { id: "2", label: "Create a budget", icon: "wallet-outline" },
  { id: "3", label: "Save more money", icon: "trending-up-outline" },
  { id: "4", label: "Investment tips", icon: "bulb-outline" },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    text: "Hi Rakibul! 👋 I'm your Welth assistant. How can I help you manage your finances today?",
    time: "09:00",
  },
];

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const userMsg: Message = {
      id: "h",
      role: "user",
      text,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Demo response — real app-এ API call করবে
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: `Got it! You asked: "${text}". Let me look into that for you.`,
        time,
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* ── Header ─────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100">
          <View className="flex-row items-center">
            <View className="w-11 h-11 rounded-full bg-indigo-600 items-center justify-center">
              <Ionicons name="sparkles" size={20} color="#fff" />
            </View>
            <View className="ml-3">
              <Text className="text-base font-bold text-slate-900">
                Welth Assistant
              </Text>
              <View className="flex-row items-center mt-0.5">
                <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <Text className="text-xs text-slate-500 ml-1.5">
                  Always online
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity className="w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center">
            <Ionicons name="ellipsis-horizontal" size={20} color="#334155" />
          </TouchableOpacity>
        </View>

        {/* ── Messages ───────────────────────── */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 12 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <View
                key={msg.id}
                className={`flex-row mb-4 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <View className="w-8 h-8 rounded-full bg-indigo-600 items-center justify-center mr-2 mt-1">
                    <Ionicons name="sparkles" size={14} color="#fff" />
                  </View>
                )}

                <View style={{ maxWidth: "78%" }}>
                  <View
                    className={`px-4 py-3 rounded-2xl ${
                      isUser
                        ? "bg-indigo-600 rounded-br-sm"
                        : "bg-white border border-slate-100 rounded-bl-sm"
                    }`}
                  >
                    <Text
                      className={`text-sm leading-5 ${
                        isUser ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {msg.text}
                    </Text>
                  </View>
                  <Text
                    className={`text-[10px] text-slate-400 mt-1 ${
                      isUser ? "text-right mr-1" : "ml-1"
                    }`}
                  >
                    {msg.time}
                  </Text>
                </View>
              </View>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <View className="flex-row mb-4">
              <View className="w-8 h-8 rounded-full bg-indigo-600 items-center justify-center mr-2 mt-1">
                <Ionicons name="sparkles" size={14} color="#fff" />
              </View>
              <View className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm flex-row items-center gap-1">
                <View className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <View className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <View className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              </View>
            </View>
          )}
        </ScrollView>

        {/* ── Suggestions ────────────────────── */}
        {messages.length <= 1 && (
          <View className="pb-2">
            <Text className="px-5 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Try asking
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
            >
              {SUGGESTIONS.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  onPress={() => sendMessage(s.label)}
                  activeOpacity={0.7}
                  className="flex-row items-center bg-white border border-slate-200 px-3.5 py-2.5 rounded-full"
                >
                  <Ionicons name={s.icon as any} size={14} color="#4f46e5" />
                  <Text className="text-xs font-medium text-slate-700 ml-1.5">
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* ── Input ──────────────────────────── */}
        <View className="px-5 py-3 border-t border-slate-100 bg-slate-50">
          <View className="flex-row items-end bg-white rounded-3xl border border-slate-200 px-2 py-1.5">
            <TouchableOpacity className="w-9 h-9 rounded-full items-center justify-center">
              <Ionicons name="add" size={22} color="#64748b" />
            </TouchableOpacity>

            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask me anything..."
              placeholderTextColor="#94a3b8"
              className="flex-1 py-2.5 px-1 text-sm text-slate-900 max-h-24"
              multiline
              onSubmitEditing={() => sendMessage(input)}
            />

            <TouchableOpacity
              onPress={() => sendMessage(input)}
              activeOpacity={0.8}
              disabled={!input.trim()}
              className={`w-10 h-10 rounded-full items-center justify-center ${
                input.trim() ? "bg-indigo-600" : "bg-slate-200"
              }`}
            >
              <Ionicons
                name="arrow-up"
                size={18}
                color={input.trim() ? "#fff" : "#94a3b8"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
