import BottomNav from "@/components/BottomNav";
import BotazoAvatar from "@/components/BotazoAvatar";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, CheckCircle, SwitchCamera, X } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";

type ScanState = "idle" | "camera" | "analyzing" | "done";

const mockResult = {
  store: "Soriana - Sucursal Centro",
  total: "$850.00 MXN",
  items: [
    { name: "Leche Entera 1L", price: "$32.50" },
    { name: "Huevos (12 pzas)", price: "$58.90" },
    { name: "Pan Integral", price: "$45.00" },
  ],
  pointsEarned: 25,
};

const Scan = () => {
  const [state, setState] = useState<ScanState>("idle");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 1920 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setState("camera");
    } catch {
      // Fallback: go to analyzing with mock
      setState("analyzing");
      setTimeout(() => setState("done"), 2500);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    setCapturedImage(canvas.toDataURL("image/jpeg", 0.8));
    stopCamera();
    setState("analyzing");
    setTimeout(() => setState("done"), 2500);
  }, [stopCamera]);

  const toggleCamera = useCallback(() => {
    stopCamera();
    setFacingMode((f) => (f === "environment" ? "user" : "environment"));
  }, [stopCamera]);

  useEffect(() => {
    if (state === "camera" && facingMode) {
      startCamera();
    }
    return () => {
      if (state !== "camera") stopCamera();
    };
  }, [facingMode]);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-botazo px-5 pt-6 pb-6 rounded-b-3xl">
        <h1 className="text-primary-foreground font-extrabold text-lg">Escanear Ticket</h1>
        <p className="text-primary-foreground/70 text-xs font-semibold">Sube tu ticket y gana BOTazo Points</p>
      </div>

      <div className="px-5 mt-6 space-y-5">
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              {capturedImage ? (
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-border">
                  <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full aspect-[3/4] bg-muted rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4">
                  <Camera size={48} className="text-muted-foreground" />
                  <p className="text-muted-foreground font-semibold text-sm">Toma foto de tu ticket</p>
                </div>
              )}
              <div className="mt-5 w-full flex gap-3">
                <button
                  onClick={() => startCamera()}
                  className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground font-extrabold text-base shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <Camera size={18} />
                  Cámara
                </button>
                <button
                  onClick={() => {
                    setState("analyzing");
                    setTimeout(() => setState("done"), 2500);
                  }}
                  className="flex-1 py-4 rounded-xl bg-muted text-foreground font-extrabold text-base shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <Upload size={18} />
                  Subir
                </button>
              </div>
            </motion.div>
          )}

          {state === "camera" && (
            <motion.div
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => { stopCamera(); setState("idle"); }}
                  className="absolute top-3 right-3 bg-background/60 backdrop-blur-sm rounded-full p-2"
                >
                  <X size={20} className="text-foreground" />
                </button>
                <button
                  onClick={toggleCamera}
                  className="absolute top-3 left-3 bg-background/60 backdrop-blur-sm rounded-full p-2"
                >
                  <SwitchCamera size={20} className="text-foreground" />
                </button>
              </div>
              <button
                onClick={capturePhoto}
                className="mt-5 w-20 h-20 rounded-full bg-primary border-4 border-primary-foreground shadow-xl active:scale-90 transition-transform flex items-center justify-center"
              >
                <div className="w-14 h-14 rounded-full border-2 border-primary-foreground" />
              </button>
            </motion.div>
          )}

          {state === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-12"
            >
              <BotazoAvatar size="lg" mood="thinking" bubbleText="Analizando tu ticket... 🧐" />
              <p className="mt-4 font-bold text-foreground">Analizando tu ticket...</p>
              <p className="text-muted-foreground text-xs font-semibold mt-1">BOTazo está leyendo los datos</p>
              <div className="mt-6 w-48 h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5 }}
                />
              </div>
            </motion.div>
          )}

          {state === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary" size={20} />
                <h2 className="font-extrabold text-foreground">Resultado del OCR</h2>
              </div>

              <div className="bg-card rounded-2xl p-4 shadow-lg border border-border space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">Establecimiento</p>
                  <p className="font-bold text-foreground">{mockResult.store}</p>
                </div>
                <div className="border-t border-border pt-3 space-y-2">
                  {mockResult.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-foreground font-semibold">{item.name}</span>
                      <span className="text-muted-foreground font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-extrabold text-foreground">Total</span>
                  <span className="font-extrabold text-primary text-lg">{mockResult.total}</span>
                </div>
              </div>

              <div className="bg-primary/10 rounded-xl p-4 flex items-center gap-3">
                <BotazoAvatar size="sm" mood="success" bubbleText="¡Listo! 🎉" />
                <div>
                  <p className="font-bold text-primary text-sm">+{mockResult.pointsEarned} BOTazo Points</p>
                  <p className="text-xs text-muted-foreground font-semibold">Registrado en Monad ⚡</p>
                </div>
              </div>

              <button
                onClick={() => { setCapturedImage(null); setState("idle"); }}
                className="w-full py-3 rounded-xl bg-muted text-foreground font-bold text-sm active:scale-95 transition-transform"
              >
                Escanear otro ticket
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
};

export default Scan;
