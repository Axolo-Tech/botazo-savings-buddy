import { motion } from "framer-motion";
import { ArrowRight, Flame, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Alert {
  id: string;
  type: "red" | "green" | "yellow";
  title: string;
  subtitle: string;
  detail?: string;
  icon: React.ReactNode;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "red",
    title: "¡OPORTUNIDAD ÚNICA!",
    subtitle: "-20% en Aerolíneas hacia Monterrey",
    detail: "¡Ahorra $1,200 si compras este mes!",
    icon: <Flame size={20} />,
  },
  {
    id: "2",
    type: "green",
    title: "¡Oferta en tus libros favoritos!",
    subtitle: "¡Ahorra $400 en tu próxima compra!",
    icon: <Zap size={20} />,
  },
  {
    id: "3",
    type: "yellow",
    title: "Poca gasolina en Mejor Gasolinería",
    subtitle: "¿Quieres minar BOTazo Points?",
    icon: <Zap size={20} />,
  },
];

const gradientMap = {
  red: "gradient-alert-red",
  green: "gradient-alert-green",
  yellow: "gradient-alert-yellow",
};

const AlertBanner = () => {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const handleApprove = (alertId: string) => {
    setDismissed((prev) => [...prev, alertId]);
    const txHash = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 8)}`;
    toast.success("¡BOTazo Points minteados!", {
      description: `+50 BZP confirmados en Monad. TxID: ${txHash}`,
      duration: 5000,
    });
  };

  const visibleAlerts = alerts.filter((a) => !dismissed.includes(a.id));
  if (visibleAlerts.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Flame className="text-destructive" size={18} />
        <h2 className="text-base font-extrabold text-foreground">¡BOTAZO DETECTADO!</h2>
        <Flame className="text-destructive" size={18} />
      </div>
      {visibleAlerts.map((alert, i) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 300, damping: 25 }}
          className={`${gradientMap[alert.type]} rounded-xl p-4 flex items-center gap-3 shadow-lg`}
        >
          <div className="flex-1 text-primary-foreground">
            <p className="font-extrabold text-sm">{alert.title}</p>
            <p className="text-xs font-semibold opacity-90">{alert.subtitle}</p>
            {alert.detail && (
              <p className="text-xs opacity-80 mt-0.5">{alert.detail}</p>
            )}
          </div>
          <button
            onClick={() => handleApprove(alert.id)}
            className="bg-card/20 backdrop-blur-sm rounded-full p-2 hover:bg-card/40 transition-colors"
          >
            <ArrowRight size={18} className="text-primary-foreground" />
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default AlertBanner;
