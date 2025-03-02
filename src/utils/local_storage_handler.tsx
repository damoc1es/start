import { NodeDescriptor, ColorSchemeDescriptor } from "../types/common_types";
import * as Consts from "../config/constants";

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

export function getColorScheme(): ColorSchemeDescriptor {
  const fromLocal = localStorage.getItem(Consts.COLOR_SCHEME_LOCAL_STORAGE);
  return fromLocal ? JSON.parse(fromLocal) : Consts.DEFAULT_COLOR_SCHEME;
}

export function saveColorScheme(colorScheme: ColorSchemeDescriptor) {
  localStorage.setItem(
    Consts.COLOR_SCHEME_LOCAL_STORAGE,
    JSON.stringify(colorScheme)
  );
}

export function existsColorScheme(): boolean {
  return localStorage.getItem(Consts.COLOR_SCHEME_LOCAL_STORAGE) !== null;
}
