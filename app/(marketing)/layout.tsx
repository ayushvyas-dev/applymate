import MarketingNavbar from '@/components/marketing/Navbar';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MarketingNavbar />
      <main>{children}</main>
    </div>
  );
}
