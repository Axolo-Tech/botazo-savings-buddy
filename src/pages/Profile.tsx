import BottomNav from "@/components/BottomNav";
import BotazoAvatar from "@/components/BotazoAvatar";
import { motion } from "framer-motion";
import { MapPin, Shield, LogOut, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>("Obteniendo ubicación...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        },
        () => setLocation("Monterrey, NL, México")
      );
    } else {
      setLocation("Monterrey, NL, México");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-botazo px-5 pt-6 pb-8 rounded-b-3xl flex flex-col items-center">
        <BotazoAvatar size="lg" mood="happy" />
        <h1 className="text-primary-foreground font-extrabold text-lg mt-3">usuario.monad.eth</h1>
        <p className="text-primary-foreground/60 text-xs font-semibold">0x7a3f...e9b2</p>
      </div>

      <div className="px-5 mt-5 space-y-2.5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-4 flex items-center gap-3 shadow-sm border border-border"
        >
          <MapPin size={18} className="text-primary" />
          <div className="flex-1">
            <p className="font-bold text-sm text-foreground">Ubicación</p>
            <p className="text-xs text-muted-foreground font-semibold">{location}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-4 flex items-center gap-3 shadow-sm border border-border"
        >
          <Shield size={18} className="text-primary" />
          <div className="flex-1">
            <p className="font-bold text-sm text-foreground">Red Monad</p>
            <p className="text-xs text-muted-foreground font-semibold">Conectado ✅</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <button
            onClick={() => navigate("/")}
            className="w-full bg-destructive/10 text-destructive rounded-xl p-4 flex items-center gap-3 font-bold text-sm active:scale-[0.98] transition-transform"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
