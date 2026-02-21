import { motion } from "framer-motion";
import botazoLogo from "@/assets/botazo-logo.png";

interface BotazoAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  mood?: "happy" | "thinking" | "alert";
}

const sizeMap = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

const BotazoAvatar = ({ size = "md", animate = true, mood = "happy" }: BotazoAvatarProps) => {
  const animationVariants = {
    happy: {
      y: [0, -6, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
    },
    thinking: {
      rotate: [0, -3, 3, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
    },
    alert: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" as const },
    },
  };

  return (
    <motion.div
      className={`${sizeMap[size]} relative flex-shrink-0`}
      animate={animate ? animationVariants[mood] : undefined}
    >
      <img
        src={botazoLogo}
        alt="BOTazo"
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </motion.div>
  );
};

export default BotazoAvatar;
