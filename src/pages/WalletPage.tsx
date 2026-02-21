import BottomNav from "@/components/BottomNav";
import BotazoAvatar from "@/components/BotazoAvatar";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react";

const transactions = [
  {
    type: "earned" as const,
    label: "Escaneo de ticket - Soriana",
    points: "+50 BZP",
    txHash: "0x7a3f...e9b2",
    date: "Hace 2 horas",
    note: "Optimizado por Monad (Costo $0)",
  },
  {
    type: "earned" as const,
    label: "Alerta aprovechada - Vuelo MTY",
    points: "+30 BZP",
    txHash: "0x1c8d...4f7a",
    date: "Hace 1 día",
    note: "Optimizado por Monad (Costo $0)",
  },
  {
    type: "redeemed" as const,
    label: "Canje - Descuento Didi",
    points: "-20 BZP",
    txHash: "0x9e2b...3c1d",
    date: "Hace 3 días",
    note: "Recompensa canjeada",
  },
  {
    type: "earned" as const,
    label: "Escaneo de ticket - OXXO",
    points: "+25 BZP",
    txHash: "0x4f1a...8e5c",
    date: "Hace 5 días",
    note: "Optimizado por Monad (Costo $0)",
  },
  {
    type: "earned" as const,
    label: "Bonus de registro",
    points: "+65 BZP",
    txHash: "0x2d7c...a3f9",
    date: "Hace 1 semana",
    note: "Recompensa generada automáticamente",
  },
];

const WalletPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-botazo px-5 pt-6 pb-8 rounded-b-3xl">
        <h1 className="text-primary-foreground font-extrabold text-lg mb-4">Mi Alcancía BOTazo</h1>
        <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4">
          <BotazoAvatar size="sm" mood="happy" animate={false} />
          <div>
            <p className="text-primary-foreground/70 text-xs font-semibold">Saldo BOTazo</p>
            <p className="text-primary-foreground font-black text-3xl">150 <span className="text-base">BZP</span></p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <h2 className="text-base font-extrabold text-foreground mb-3">Historial de Recompensas</h2>
        <div className="space-y-2.5">
          {transactions.map((tx, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl p-3.5 shadow-sm border border-border"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    tx.type === "earned" ? "bg-primary/10" : "bg-destructive/10"
                  }`}
                >
                  {tx.type === "earned" ? (
                    <ArrowDownLeft size={16} className="text-primary" />
                  ) : (
                    <ArrowUpRight size={16} className="text-destructive" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">{tx.label}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-muted-foreground font-semibold">{tx.date}</span>
                    <span className="text-[10px] text-muted-foreground">•</span>
                    <span className="text-[10px] text-primary font-semibold flex items-center gap-0.5">
                      {tx.txHash} <ExternalLink size={8} />
                    </span>
                  </div>
                </div>
                <span
                  className={`font-extrabold text-sm ${
                    tx.type === "earned" ? "text-primary" : "text-destructive"
                  }`}
                >
                  {tx.points}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground font-semibold mt-1.5 ml-12">{tx.note}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default WalletPage;
