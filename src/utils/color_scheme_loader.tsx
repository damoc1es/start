import * as Storage from "./local_storage_handler";
import { ColorSchemes } from "../config/theme_colors";

export function loadColorScheme(colorScheme: string) {
  const scheme =
    colorScheme === "Custom"
      ? Storage.getCustomColorScheme()
      : colorScheme in ColorSchemes
      ? ColorSchemes[colorScheme]
      : ColorSchemes["Original"];

  Object.entries(scheme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--custom-${key}`, value);
  });
}
