/**
 * Types for the node class.
 * Tree nodes can have children, link nodes can have a link.
 */
export enum NodeType {
  LINK,
  TREE,
}

/**
 * Descriptor for a link list.
 */
export interface LinkListDescriptor {
  name: string;
  link?: string;
  children?: Array<LinkListDescriptor>;
}

/**
 * Node class for the link list.
 */
export class Node {
  name: string;
  data: string | Array<Node>;
  type: NodeType;
  parent?: Node;

  /**
   * Constructor for the node.
   *
   * @param name Name of the node.
   * @param data Data of the node. Can be a string for a link, or an array of nodes for a tree.
   * @param parent (optional) Parent node of this node.
   */
  constructor(name: string, data: string | Array<Node>, parent = undefined) {
    this.name = name;
    this.data = data;

    if (typeof data === "string") {
      this.type = NodeType.LINK;
    } else {
      this.type = NodeType.TREE;
      for (const child of data) {
        child.parent = this;
      }
    }

    this.parent = parent;
  }

  /**
   * Create a new node from a JSON object.
   * Used for deserialization.
   *
   * @param json JSON object to create the node from.
   * @returns The node created from the JSON object.
   */
  public static fromJson(json: LinkListDescriptor): Node {
    if (json.link !== undefined) {
      return new Node(json.name, json.link);
    }

    const arr: Array<Node> = [];

    if (json.children !== undefined) {
      for (const child of json.children) {
        arr.push(Node.fromJson(child));
      }
    }

    return new Node(json.name, arr);
  }
}
