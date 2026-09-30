import { useState, type ReactNode } from "react";
import { CommandPalette } from "@/components/command-palette";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export function SiteShell({
  children,
  footer = true,
}: {
  children: ReactNode;
  footer?: boolean;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navbar onSearch={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      {children}
      {footer ? <Footer /> : null}
    </div>
  );
}
