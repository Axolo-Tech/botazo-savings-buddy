import { motion, AnimatePresence } from "framer-motion";
import botazoLogo from "@/assets/botazo-logo.png";
import { useState, useEffect, useRef } from "react";

interface BotazoAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  mood?: "happy" | "thinking" | "alert" | "success";
  showBubble?: boolean;
  bubbleText?: string;
}

const sizeMap = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

const bubbleSizeMap = {
  sm: "text-[9px] -top-6 max-w-[100px]",
  md: "text-[10px] -top-8 max-w-[140px]",
  lg: "text-xs -top-10 max-w-[180px]",
  xl: "text-xs -top-12 max-w-[220px]",
};

const pushMessages = [
  "¡Oye! He visto que Uber está caro, ¿checamos Didi?",
  "¡Ese ticket de Soriana me dio mucha info, gracias!",
  "¿Sabías que puedes ahorrar $200 en gasolina esta semana?",
  "¡Encontré una oferta en libros para ti! 📚",
  "Tu gasto en transporte subió 15% este mes 🚗",
  "¡Hay un 2x1 en tu tienda favorita! 🛒",
  "Recuerda canjear tus BOTazo Points ⚡",
];

// Typewriter hook
const useTypewriter = (text: string, speed = 30) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!text) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
};

const BotazoAvatar = ({
  size = "md",
  animate = true,
  mood = "happy",
  showBubble = false,
  bubbleText,
}: BotazoAvatarProps) => {
  const [currentMessage, setCurrentMessage] = useState(bubbleText || pushMessages[0]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMsg, setShowMsg] = useState(showBubble);
  const { displayed: typedText } = useTypewriter(showMsg ? currentMessage : "");

  useEffect(() => {
    if (!showBubble) return;
    const interval = setInterval(() => {
      setShowMsg(false);
      setTimeout(() => {
        setMessageIndex((prev) => {
          const next = (prev + 1) % pushMessages.length;
          setCurrentMessage(pushMessages[next]);
          return next;
        });
        setShowMsg(true);
      }, 400);
    }, 10000);
    return () => clearInterval(interval);
  }, [showBubble]);

  useEffect(() => {
    if (bubbleText) {
      setCurrentMessage(bubbleText);
      setShowMsg(true);
    }
  }, [bubbleText]);

  const animationVariants = {
    happy: {
      y: [0, -6, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
    },
    thinking: {
      rotate: [0, -5, 5, -3, 3, 0],
      scale: [1, 1.02, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
    },
    alert: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" as const },
    },
    success: {
      y: [0, -14, 0, -8, 0],
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.8, repeat: Infinity, repeatDelay: 1.5, ease: "easeOut" as const },
    },
  };

  return (
    <div className={`${sizeMap[size]} relative flex-shrink-0`}>
      {animate && mood === "thinking" && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      {animate && mood === "success" && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }}
        />
      )}

      {/* Chat bubble with typewriter */}
      <AnimatePresence>
        {showMsg && (showBubble || bubbleText) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 5 }}
            className={`absolute left-1/2 -translate-x-1/2 ${bubbleSizeMap[size]} bg-card border border-border rounded-lg px-2 py-1 shadow-lg z-10 text-center font-semibold text-foreground`}
          >
            {typedText}
            <span className="inline-block w-[2px] h-[1em] bg-primary ml-[1px] animate-pulse align-middle" />
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar image */}
      <motion.div
        className="w-full h-full"
        animate={animate ? animationVariants[mood] : undefined}
      >
        <img
          src={botazoLogo}
          alt="BOTazo"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default BotazoAvatar;
