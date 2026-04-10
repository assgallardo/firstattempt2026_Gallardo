import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  /** Pass true for pages that handle their own internal scroll (e.g. Messages) */
  noScroll?: boolean;
}

export function Layout({ children, noScroll = false }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      {noScroll ? (
        <div className="flex-1 flex overflow-hidden">{children}</div>
      ) : (
        <main className="flex-1 overflow-y-auto">{children}</main>
      )}
    </div>
  );
}
