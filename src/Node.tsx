export enum NodeType {
    LINK,
    TREE
}

export interface LinkListDescriptor {
    name: string;
    link?: string;
    children?: Array<LinkListDescriptor>;
}

export class Node {
    name: string;
    data: string | Array<Node>;
    type: NodeType;
    parent?: Node;

    constructor(name: string, data: string | Array<Node>, parent = undefined) {
        this.name = name;
        this.data = data;

        if(typeof data === 'string') {
            this.type = NodeType.LINK;
        } else {
            this.type = NodeType.TREE;
        }

        this.parent = parent;
    }

    public static fromJson(json: LinkListDescriptor): Node {
        if(json.link !== undefined) {
            return new Node(json.name, json.link);
        }

        const arr: Array<Node> = [];

        if(json.children !== undefined) {
            for(const child of json.children) {
                arr.push(Node.fromJson(child));
            }
        }

        const retVal = new Node(json.name, arr);

        for(const child of arr) {
            child.parent = retVal;
        }

        return retVal;
    }
}
