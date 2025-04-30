"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="cursor-pointer bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf] hover:bg-hover-background active:bg-active-background rounded-md border border-button-border-color p-1.5 [transition:background_20ms_ease-in,_color_0.15s]"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="w-4 h-4 dark:hidden" />
      <Moon className="hidden w-4 h-4 dark:block" />
    </button>
  );
}
