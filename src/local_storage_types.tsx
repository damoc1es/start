/**
 * Descriptor for a node, could be a link or an array of other descriptors.
 */
export interface NodeDescriptor {
  name: string;
  link?: string;
  children?: Array<NodeDescriptor>;
}

/**
 * Descriptor for a color scheme.
 */
export interface ColorSchemeDescriptor {
  background: string;
  color: string;
  backspace: string;
  accent: string;
  inactive: string;
}
