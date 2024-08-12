import { useState } from 'react'
import { NodeType, Node } from './Node';

function LinkList({ treeNode } : {treeNode: Node}) {
    const [node, setNode] = useState(treeNode);

    if(treeNode.type !== NodeType.TREE) {
        console.error('ERROR: NodeType is not TREE');
    }

    const moveTo = (node: Node) => {
        setNode(node);
    }

    const goBack = () => {
        if(node.parent !== undefined) {
            setNode(node.parent);
        }
    }

    return (
        <>
            <ul>
                {typeof node.data !== "string" &&
                    node.data.map((object: Node, i: number) =>
                    typeof object.data === "string" ?
                        <li key={i}><a href={object.data}>{object.name}</a></li> :
                        <li key={i} onClick={() => moveTo(object)}><a>{object.name}</a></li>
                )}
            </ul>
            {
                node.parent &&
                <button onClick={() => goBack()}>Back</button>
            }
        </>
    )
}

export default LinkList
