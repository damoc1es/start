import { useState, useEffect, useCallback } from 'react'
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

    const handleNodeMove = useCallback((node: Node, i: number) => {
        setNode(node);
        setDecimalCode(`${decimalCode}${i < 10 ? i : NIL_CHARACTER}`);
    }, [decimalCode]);


    const goBack = useCallback(() => {
        if(node.parent !== undefined) {
            setNode(node.parent);
            setDecimalCode(decimalCode.slice(0, -1));
        }
    }, [node.parent, decimalCode]);


    const goTo = useCallback((i: number) => {
        if(typeof node.data !== "string" && i < node.data.length) {
            if(typeof node.data[i].data !== "string") {
                handleNodeMove(node.data[i], i);
            } else {
                window.open(node.data[i].data);
            }
        }
    }, [node.data, handleNodeMove]);


    useEffect(()=>{
        const onKeyDown = (event: KeyboardEvent) => {
            if(/^[0-9]$/i.test(event.key)) {
                console.log(event.key);
                goTo(parseInt(event.key));
            } else if(event.key == 'Backspace') {
                goBack();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [goTo, goBack]);


    return (
        <>
            <ul>
                <li key={crypto.randomUUID()} className={node.parent ? "backspaceItem" : "backspaceItem inactive"}>
                    {'\u00A0'.repeat(decimalCode != "" ? decimalCode.length+1 : 0)}⌫ - <a onClick={() => goBack()}>back</a>
                </li>
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
                                <>{TREE_CHARACTER} <a onClick={() => handleNodeMove(object, i)}>{object.name}</a></>
                            }
                        </li>
                )}
            </ul>
        </>
    )
}

export default LinkList
