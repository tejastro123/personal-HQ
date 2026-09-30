import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/use-theme";

export function ThemeToggle({
  className,
  labeled = false,
}: {
  className?: string;
  labeled?: boolean;
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Button
      type="button"
      variant={labeled ? "outline" : "ghost"}
      size={labeled ? "sm" : "icon"}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      data-theme-toggle="true"
      className={cn(labeled && "gap-2 px-3", className)}
    >
      {isDark ? <Sun /> : <Moon />}
      {labeled ? <span>{isDark ? "Light" : "Dark"}</span> : null}
    </Button>
  );
}
