import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, X, ChevronRight } from "lucide-react";
import { useMembers } from "@/hooks/useMembers";
import { motion, AnimatePresence } from "framer-motion";

export const ExpiredNotification = () => {
  const { expiredMembers } = useMembers();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (expiredMembers.length > 0 && !dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [expiredMembers.length, dismissed]);

  const handleViewExpired = () => {
    setIsVisible(false);
    navigate("/expired");
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
  };

  if (expiredMembers.length === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative overflow-hidden rounded-2xl border border-destructive/30 bg-card p-6 shadow-2xl glow-danger">
            {/* Animated background pulse */}
            <div className="absolute inset-0 bg-destructive/5 animate-pulse" />
            
            <button
              onClick={handleDismiss}
              className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-destructive/20 animate-shake">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>

              <div className="flex-1 pr-6">
                <h3 className="font-display text-xl tracking-wide text-foreground">
                  FEE EXPIRED ALERT!
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-bold text-destructive">{expiredMembers.length}</span>{" "}
                  {expiredMembers.length === 1 ? "member has" : "members have"} expired membership
                </p>

                <button
                  onClick={handleViewExpired}
                  className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/20 px-4 py-2 text-sm font-medium text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground"
                >
                  View Expired Members
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
