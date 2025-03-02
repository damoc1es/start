import { NodeDescriptor } from "./local_storage_types";

/**
 * Types for the node class.
 * Tree nodes can have children, link nodes can have a link.
 */
enum Type {
  LINK,
  TREE,
}

/**
 * Node class for the link list.
 */
export class Node {
  static readonly Type = Type;

  name: string;
  data: string | Array<Node>;
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

    if (typeof data !== "string") {
      for (const child of data) {
        child.parent = this;
      }
    }

    this.parent = parent;
  }

  public getType(): Type {
    if (typeof this.data === "string") {
      return Type.LINK;
    }

    return Type.TREE;
  }

  /**
   * Create a new node from a JSON object.
   * Used for deserialization.
   *
   * @param json JSON object to create the node from.
   * @returns The node created from the JSON object.
   */
  public static fromJson(json: NodeDescriptor): Node {
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
