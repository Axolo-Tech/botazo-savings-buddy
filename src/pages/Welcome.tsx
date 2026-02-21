import BotazoAvatar from "@/components/BotazoAvatar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useENS } from "@/hooks/useENS";

const Welcome = () => {
  const navigate = useNavigate();
  const { login } = useENS();
  const [showInput, setShowInput] = useState(false);
  const [ensInput, setEnsInput] = useState("");

  const handleENSLogin = () => {
    if (showInput && ensInput.trim()) {
      const name = ensInput.includes(".monad.eth") ? ensInput.trim() : `${ensInput.trim()}.monad.eth`;
      login(name);
      navigate("/dashboard");
    } else {
      setShowInput(true);
    }
  };

  const handleSocialLogin = () => {
    login("usuario.monad.eth");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-botazo flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-10 -left-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-8"
      >
        <BotazoAvatar size="xl" mood="happy" showBubble bubbleText="¡Bienvenido! 🤖" />
      </motion.div>

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-black text-primary-foreground text-center text-shadow-bold tracking-tight"
      >
        BOTazo
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-primary-foreground/80 text-center mt-3 text-sm max-w-xs font-semibold"
      >
        Tu agente de arbitraje de consumo impulsado por IA y Monad
      </motion.p>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-10 w-full max-w-xs space-y-3"
      >
        {showInput && (
          <motion.input
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            type="text"
            placeholder="tu_nombre"
            value={ensInput}
            onChange={(e) => setEnsInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleENSLogin()}
            className="w-full py-3 px-4 rounded-xl bg-card text-foreground font-bold text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        )}
        <button
          onClick={handleENSLogin}
          className="w-full py-4 rounded-xl bg-card text-primary font-extrabold text-base shadow-xl hover:shadow-2xl transition-all active:scale-95"
        >
          {showInput ? "Entrar →" : "Login con tu .monad.eth"}
        </button>
        <button
          onClick={handleSocialLogin}
          className="w-full py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground font-bold text-sm backdrop-blur-sm active:scale-95 transition-transform"
        >
          Login con Gmail / Apple
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-primary-foreground/50 text-xs font-semibold"
      >
        Powered by Monad ⚡
      </motion.p>
    </div>
  );
};

export default Welcome;
