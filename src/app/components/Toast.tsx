import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastData {
  id: number;
  message: string;
  type: ToastType;
}

let toastIdCounter = 0;
let globalSetToasts: React.Dispatch<React.SetStateAction<ToastData[]>> | null = null;

export function showToast(message: string, type: ToastType = "info") {
  if (globalSetToasts) {
    const id = ++toastIdCounter;
    globalSetToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      globalSetToasts?.((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }
}

function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const icons = {
    success: <CheckCircle2 size={18} className="text-green-500 shrink-0" />,
    error: <XCircle size={18} className="text-red-500 shrink-0" />,
    info: <Info size={18} className="text-blue-500 shrink-0" />,
  };

  const borders = {
    success: "border-l-4 border-green-500",
    error: "border-l-4 border-red-500",
    info: "border-l-4 border-blue-500",
  };

  return (
    <div
      className={`flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-lg ${borders[toast.type]} transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {icons[toast.type]}
      <span className="text-sm text-gray-700 flex-1">{toast.message}</span>
      <button onClick={onDismiss} className="text-gray-300 hover:text-gray-500">
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    globalSetToasts = setToasts;
    return () => { globalSetToasts = null; };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-80">
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          toast={t}
          onDismiss={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
        />
      ))}
    </div>
  );
}
