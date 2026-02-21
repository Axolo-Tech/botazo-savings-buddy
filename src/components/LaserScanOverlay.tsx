import { motion } from "framer-motion";
import BotazoAvatar from "./BotazoAvatar";

interface LaserScanOverlayProps {
  capturedImage: string | null;
}

const LaserScanOverlay = ({ capturedImage }: LaserScanOverlayProps) => (
  <motion.div
    key="scanning"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center"
  >
    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative bg-black">
      {capturedImage ? (
        <img src={capturedImage} alt="Scanning" className="w-full h-full object-cover opacity-70" />
      ) : (
        <div className="w-full h-full bg-muted" />
      )}

      {/* Laser scan line */}
      <motion.div
        className="absolute left-0 right-0 h-1 z-10"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(145 100% 50%), hsl(145 100% 70%), hsl(145 100% 50%), transparent)",
          boxShadow: "0 0 20px hsl(145 100% 50% / 0.8), 0 0 60px hsl(145 100% 50% / 0.4)",
        }}
        initial={{ top: "5%" }}
        animate={{ top: ["5%", "90%", "5%"] }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      {/* Green grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(hsl(145 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(145 100% 50% / 0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Corner markers */}
      {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-6 h-6`}
          style={{
            borderTop: i < 2 ? "2px solid hsl(145 100% 50%)" : "none",
            borderBottom: i >= 2 ? "2px solid hsl(145 100% 50%)" : "none",
            borderLeft: i % 2 === 0 ? "2px solid hsl(145 100% 50%)" : "none",
            borderRight: i % 2 === 1 ? "2px solid hsl(145 100% 50%)" : "none",
          }}
        />
      ))}
    </div>

    <div className="mt-4 flex items-center gap-3">
      <BotazoAvatar size="sm" mood="thinking" bubbleText="¡Escaneando! 🔍" />
      <p className="font-bold text-primary text-sm animate-pulse">Escaneando ticket...</p>
    </div>
  </motion.div>
);

export default LaserScanOverlay;
