import Header from "@/app/components/Header";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-white">
      <Header />
      <div className="pt-20 h-full">{children}</div>
    </div>
  );
}
