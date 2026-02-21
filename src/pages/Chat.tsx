import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BotazoAvatar from "@/components/BotazoAvatar";
import BottomNav from "@/components/BottomNav";

type Message = {
  id: number;
  role: "user" | "bot";
  text: string;
};

const mockPriceDB: Record<string, { product: string; results: { store: string; price: string }[] }> = {
  "coca-cola": {
    product: "Coca-Cola 600ml",
    results: [
      { store: "COFFEEFY WORKAFÉ", price: "$24" },
      { store: "LA MANSIÓN", price: "$62" },
      { store: "SUNTORY", price: "$85" },
    ],
  },
  "coca cola": {
    product: "Coca-Cola 600ml",
    results: [
      { store: "COFFEEFY WORKAFÉ", price: "$24" },
      { store: "LA MANSIÓN", price: "$62" },
      { store: "SUNTORY", price: "$85" },
    ],
  },
  "agua": {
    product: "Agua Natural 1L",
    results: [
      { store: "OXXO", price: "$15" },
      { store: "7-ELEVEN", price: "$18" },
      { store: "Soriana", price: "$12" },
    ],
  },
  "cerveza": {
    product: "Cerveza Corona 355ml",
    results: [
      { store: "Modelorama", price: "$22" },
      { store: "OXXO", price: "$28" },
      { store: "Walmart", price: "$19" },
    ],
  },
  "café": {
    product: "Café Americano Grande",
    results: [
      { store: "COFFEEFY WORKAFÉ", price: "$35" },
      { store: "Starbucks", price: "$72" },
      { store: "Italian Coffee", price: "$45" },
    ],
  },
  "cafe": {
    product: "Café Americano Grande",
    results: [
      { store: "COFFEEFY WORKAFÉ", price: "$35" },
      { store: "Starbucks", price: "$72" },
      { store: "Italian Coffee", price: "$45" },
    ],
  },
  "sandwich": {
    product: "Sandwich de Jamón",
    results: [
      { store: "OXXO", price: "$45" },
      { store: "Subway 15cm", price: "$89" },
      { store: "7-ELEVEN", price: "$52" },
    ],
  },
  "leche": {
    product: "Leche Entera 1L",
    results: [
      { store: "Soriana", price: "$28" },
      { store: "Walmart", price: "$26" },
      { store: "OXXO", price: "$35" },
    ],
  },
  "chips": {
    product: "Papas Sabritas 170g",
    results: [
      { store: "Bodega Aurrerá", price: "$22" },
      { store: "OXXO", price: "$32" },
      { store: "Soriana", price: "$25" },
    ],
  },
  "papas": {
    product: "Papas Sabritas 170g",
    results: [
      { store: "Bodega Aurrerá", price: "$22" },
      { store: "OXXO", price: "$32" },
      { store: "Soriana", price: "$25" },
    ],
  },
};

function findProduct(input: string): { product: string; results: { store: string; price: string }[] } | null {
  const lower = input.toLowerCase();
  for (const key of Object.keys(mockPriceDB)) {
    if (lower.includes(key)) return mockPriceDB[key];
  }
  return null;
}

function generateBotResponse(input: string): string {
  const match = findProduct(input);
  if (match) {
    const best = match.results[0];
    const others = match.results.slice(1).map(r => `${r.store} en ${r.price}`).join(" y ");
    return `¡Claro! 🔍 De acuerdo a tu ubicación he detectado que el mejor precio para **${match.product}** es **${best.store}** en **${best.price}**! 🎉 Comparado con ${others}. ¡Te ahorras un BOTazo! 💰`;
  }

  const greetings = ["hola", "hey", "buenas", "qué onda", "que onda"];
  if (greetings.some(g => input.toLowerCase().includes(g))) {
    return "¡Hola! 👋 Soy BOTazo, tu agente de ahorro. Pregúntame por cualquier producto y te encuentro el mejor precio cerca de ti. Prueba con: \"Quiero una Coca-Cola\" 🥤";
  }

  if (input.toLowerCase().includes("gracias")) {
    return "¡De nada! Para eso estoy 🤖💚 ¿Quieres buscar otro producto?";
  }

  return "🤔 No encontré ese producto en mi base de datos, pero estoy aprendiendo. Prueba preguntarme por: Coca-Cola, agua, cerveza, café, sandwich, leche o papas. ¡Pronto tendré más! ⚡";
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", text: "¡Hola! 🤖 Soy BOTazo. Dime qué producto buscas y te encuentro el mejor precio cerca de ti. ¡Pruébame!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let nextId = useRef(1);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: nextId.current++, role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot "thinking"
    setTimeout(() => {
      const response = generateBotResponse(text);
      const botMsg: Message = { id: nextId.current++, role: "bot", text: response };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="gradient-botazo px-4 pt-5 pb-4 flex items-center gap-3">
        <button onClick={() => navigate("/dashboard")} className="text-primary-foreground">
          <ArrowLeft size={22} />
        </button>
        <BotazoAvatar size="sm" mood="happy" animate />
        <div>
          <h1 className="text-primary-foreground font-extrabold text-base">Chat con BOTazo</h1>
          <p className="text-primary-foreground/70 text-[10px] font-semibold">Tu agente de ahorro en vivo</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm font-semibold shadow-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border text-foreground rounded-bl-md"
                }`}
              >
                {msg.role === "bot" ? (
                  <BotMessage text={msg.text} />
                ) : (
                  msg.text
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-2 h-2 rounded-full bg-primary" />
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full bg-primary" />
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 rounded-full bg-primary" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-background border-t border-border px-3 py-2.5">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Pregúntame un producto..."
            className="flex-1 bg-card border border-border rounded-xl px-3.5 py-2.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center active:scale-95 transition-transform disabled:opacity-40"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

/** Renders bold **text** segments */
const BotMessage = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span key={i} className="font-extrabold text-primary">{part.slice(2, -2)}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export default Chat;
