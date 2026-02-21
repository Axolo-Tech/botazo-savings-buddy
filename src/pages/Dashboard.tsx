import BotazoAvatar from "@/components/BotazoAvatar";
import AlertBanner from "@/components/AlertBanner";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { ChevronRight, Plane, Car, BookOpen, Star } from "lucide-react";
import { useENS } from "@/hooks/useENS";

const cycles = [
  { icon: Plane, label: "Viajes a Monterrey", detail: "Cada 2 meses", color: "bg-primary/10 text-primary" },
  { icon: Car, label: "Gasto en Didi/Uber", detail: "~$500/mes", color: "bg-accent/20 text-accent-foreground" },
  { icon: BookOpen, label: "Compras de Libros", detail: "~$400/mes", color: "bg-destructive/10 text-destructive" },
];

const Dashboard = () => {
  const { ensName } = useENS();
  const displayName = ensName || "";
  const greeting = displayName
    ? `Hola, ${displayName}, hoy tu BOTazo está activo`
    : "¡Bienvenido de vuelta!";

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-botazo px-5 pt-6 pb-8 rounded-b-3xl">
        {displayName && (
          <div className="flex items-center justify-between mb-1">
            <p className="text-primary-foreground/70 text-xs font-semibold">{displayName}</p>
            <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <Star size={14} className="text-accent" />
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <BotazoAvatar size="sm" mood="happy" showBubble bubbleText={greeting} />
          <div>
            <h1 className="text-primary-foreground font-extrabold text-lg">¡Soy BOTazo! 🤖</h1>
            <p className="text-primary-foreground/70 text-xs font-semibold">Tu agente de ahorro inteligente</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-4 shadow-lg border border-border"
        >
          <AlertBanner />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-base font-extrabold text-foreground mb-3">Mis Ciclos de Consumo</h2>
          <div className="space-y-2.5">
            {cycles.map((cycle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-card rounded-xl p-3.5 flex items-center gap-3 shadow-sm border border-border active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cycle.color}`}>
                  <cycle.icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-foreground">{cycle.label}</p>
                  <p className="text-xs text-muted-foreground font-semibold">{cycle.detail}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card rounded-2xl p-4 shadow-lg border border-border"
        >
          <h2 className="text-base font-extrabold text-foreground mb-2">Saldo BOTazo</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BotazoAvatar size="sm" mood="happy" animate={false} />
              <div>
                <p className="text-3xl font-black text-primary">150</p>
                <p className="text-xs text-muted-foreground font-semibold">BZP disponibles</p>
              </div>
            </div>
            <button className="bg-destructive text-destructive-foreground px-4 py-2.5 rounded-xl font-bold text-xs active:scale-95 transition-transform shadow-md">
              Canjear Puntos
            </button>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
