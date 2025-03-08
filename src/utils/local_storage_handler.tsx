import { NodeDescriptor, ColorSchemeDescriptor } from "../types/common_types";
import * as Consts from "../config/constants";

/// Query the links list from the local storage.

export function getLinksList(): NodeDescriptor {
  const fromLocal = localStorage.getItem(Consts.LINKS_LOCAL_STORAGE);
  return fromLocal ? JSON.parse(fromLocal) : Consts.DEFAULT_LINKS;
}

export function saveLinksList(links: NodeDescriptor) {
  localStorage.setItem(Consts.LINKS_LOCAL_STORAGE, JSON.stringify(links));
}

export function existsLinksList(): boolean {
  return localStorage.getItem(Consts.LINKS_LOCAL_STORAGE) !== null;
}

/// Query the color scheme from the local storage.

export function getColorScheme(): string {
  const fromLocal = localStorage.getItem(Consts.COLOR_SCHEME_LOCAL_STORAGE);
  return fromLocal ? fromLocal : "Original";
}

export function saveColorScheme(colorScheme: string) {
  localStorage.setItem(Consts.COLOR_SCHEME_LOCAL_STORAGE, colorScheme);
}

export function existsColorScheme(): boolean {
  return localStorage.getItem(Consts.COLOR_SCHEME_LOCAL_STORAGE) !== null;
}

/// Query the custom color scheme from the local storage.

export function getCustomColorScheme(): ColorSchemeDescriptor {
  const fromLocal = localStorage.getItem(
    Consts.CUSTOM_COLOR_SCHEME_LOCAL_STORAGE
  );
  return fromLocal ? JSON.parse(fromLocal) : Consts.DEFAULT_CUSTOM_COLOR_SCHEME;
}

export function saveCustomColorScheme(colorScheme: ColorSchemeDescriptor) {
  localStorage.setItem(
    Consts.CUSTOM_COLOR_SCHEME_LOCAL_STORAGE,
    JSON.stringify(colorScheme)
  );
}

export function existsCustomColorScheme(): boolean {
  return (
    localStorage.getItem(Consts.CUSTOM_COLOR_SCHEME_LOCAL_STORAGE) !== null
  );
}
