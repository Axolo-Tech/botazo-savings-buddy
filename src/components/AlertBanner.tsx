import { motion } from "framer-motion";
import { ArrowRight, Flame, Zap, Eye, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Alert {
  id: string;
  type: "red" | "green" | "yellow";
  title: string;
  subtitle: string;
  detail?: string;
  icon: React.ReactNode;
  actionLabel: string;
  actionColor: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "red",
    title: "🔥 ¡BOTazo del Día!",
    subtitle: "Tu viaje recurrente a Monterrey bajó $800 hoy. ¿Lo apartamos?",
    detail: "¡Ahorra $1,200 si compras este mes!",
    icon: <Flame size={20} />,
    actionLabel: "Aprovechar Ahorro",
    actionColor: "bg-primary text-primary-foreground",
  },
  {
    id: "2",
    type: "green",
    title: "💡 Ahorro de Ruta",
    subtitle: "Detecté que pagas mucho en Uber. Si usas Didi hoy, el BOTazo te regala 50 puntos.",
    icon: <Zap size={20} />,
    actionLabel: "Aprovechar Ahorro",
    actionColor: "bg-primary text-primary-foreground",
  },
  {
    id: "3",
    type: "yellow",
    title: "⚠️ Gasto innecesario detectado",
    subtitle: "Poca gasolina en Mejor Gasolinería. ¿Quieres generar recompensa?",
    icon: <AlertTriangle size={20} />,
    actionLabel: "Seguir observando",
    actionColor: "bg-accent text-accent-foreground",
  },
];

const gradientMap = {
  red: "gradient-alert-red",
  green: "gradient-alert-green",
  yellow: "gradient-alert-yellow",
};

const AlertBanner = () => {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const handleAction = (alert: Alert) => {
    setDismissed((prev) => [...prev, alert.id]);
    const txHash = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 8)}`;
    toast.success("¡Recompensa generada! 🎉", {
      description: `+50 BZP confirmados. Optimizado por Monad (Costo $0). Tx: ${txHash}`,
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
          className={`${gradientMap[alert.type]} rounded-xl p-4 shadow-lg`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">{alert.icon}</div>
            <div className="flex-1 text-primary-foreground">
              <p className="font-extrabold text-sm">{alert.title}</p>
              <p className="text-xs font-semibold opacity-90 mt-0.5">{alert.subtitle}</p>
              {alert.detail && (
                <p className="text-xs opacity-80 mt-0.5">{alert.detail}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => handleAction(alert)}
            className={`mt-3 w-full py-2 rounded-lg font-bold text-xs ${alert.actionColor} active:scale-95 transition-transform shadow-md`}
          >
            {alert.actionLabel}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default AlertBanner;
