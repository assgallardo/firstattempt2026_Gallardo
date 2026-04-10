import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ToastContainer } from "./components/Toast";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d1e3d] flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #0d1e3d 0%, #1a3a6b 50%, #0d2657 100%)" }}
    >
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}
