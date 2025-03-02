import { NodeDescriptor } from "../types/common_types";
import { LINKS_LOCAL_STORAGE, DEFAULT_LINKS } from "../config/constants";

export function getLinksList(): NodeDescriptor {
  const fromLocal = localStorage.getItem(LINKS_LOCAL_STORAGE);
  return fromLocal ? JSON.parse(fromLocal) : DEFAULT_LINKS;
}

export function saveLinksList(links: NodeDescriptor) {
  localStorage.setItem(LINKS_LOCAL_STORAGE, JSON.stringify(links));
}

export function existsLinksList(): boolean {
  return localStorage.getItem(LINKS_LOCAL_STORAGE) !== null;
}
