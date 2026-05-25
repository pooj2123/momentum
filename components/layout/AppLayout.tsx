import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 min-h-screen p-8">
      <>
  {children}

  <MobileNav />
</>
      </main>
    </div>
  );
}