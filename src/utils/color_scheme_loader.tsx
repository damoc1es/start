import { ColorSchemes } from "../config/theme_colors";
import { getCustomColorScheme } from "./local_storage_handler";

export function loadColorScheme(colorScheme: string) {
  const scheme =
    colorScheme === "Custom"
      ? getCustomColorScheme()
      : colorScheme in ColorSchemes
      ? ColorSchemes[colorScheme]
      : ColorSchemes["Original"];

  Object.entries(scheme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--custom-${key}`, value);
  });
}
