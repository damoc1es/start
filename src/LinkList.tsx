import { useState } from 'react'
import { NodeType, Node } from './Node';

const LINK_CHARACTER = ' → ';
const TREE_CHARACTER = ' ⊧ ';
const NIL_CHARACTER = '●';

function LinkList({ treeNode } : {treeNode: Node}) {
    const [node, setNode] = useState(treeNode);
    const [decimalCode, setDecimalCode] = useState("");

    if(treeNode.type !== NodeType.TREE) {
        console.error('ERROR: NodeType is not TREE');
    }

    const moveTo = (node: Node, i: number) => {
        setNode(node);
        setDecimalCode(`${decimalCode}${i < 10 ? i : NIL_CHARACTER}`);
    }

    const goBack = () => {
        if(node.parent !== undefined) {
            setNode(node.parent);
            setDecimalCode(decimalCode.slice(0, -1));
        }
    }

    return (
        <>
            <ul>
                {typeof node.data !== "string" &&
                    node.data.map((object: Node, i: number) =>
                        // TODO: this is possibly not very efficient
                        // I still need to re-render everything, but check if there is another way
                        <li key={crypto.randomUUID()}>
                            {decimalCode != "" && <>{decimalCode}.</>}
                            {i < 10 ? i : NIL_CHARACTER}
                            {typeof object.data === "string" ?
                                <>{LINK_CHARACTER} <a href={object.data}>{object.name}</a></>
                                :
                                <>{TREE_CHARACTER} <a onClick={() => moveTo(object, i)}>{object.name}</a></>
                            }
                        </li>
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
