import { useState, useEffect, useCallback } from "react";
import * as Consts from "../config/constants";
import { Node } from "../types/node";

/**
 * List of nodes (links/trees) component.
 *
 * @param treeNode The node to render the list from.
 * @returns {ReactNode} The list of nodes component.
 */
export function LinkList({ treeNode }: { treeNode: Node }) {
  const [node, setNode] = useState(treeNode);
  const [decimalCode, setDecimalCode] = useState("");

  // The origin node must be a tree
  if (treeNode.getType() !== Node.Type.TREE) {
    console.error("ERROR: Type is not TREE");
  }

  // Function to handle the node move to a another tree
  const handleNodeMove = useCallback(
    (node: Node, i: number) => {
      history.pushState({}, "");
      setNode(node);
      setDecimalCode(
        `${decimalCode}${i < 10 ? i : Consts.LINK_LIST_CHARS.NIL}`
      );
    },
    [decimalCode]
  );

  // Function to go back to the parent tree
  const goBack = useCallback(() => {
    if (node.parent !== undefined) {
      setNode(node.parent);
      setDecimalCode(decimalCode.slice(0, -1));
    }
  }, [node.parent, decimalCode]);

  // Function to go to a node in the tree by index
  // If the node is a link, open the link in a new tab
  // If the node is a tree, move to that tree
  const goTo = useCallback(
    (i: number) => {
      if (typeof node.data !== "string" && i < node.data.length) {
        if (typeof node.data[i].data !== "string") {
          handleNodeMove(node.data[i], i);
        } else {
          window.open(node.data[i].data);
        }
      }
    },
    [node.data, handleNodeMove]
  );

  // Add event listener for keyboard
  useEffect(() => {
    // Function to handle the keydown event
    // If the key is a digit, go to the node with that index
    // If the key is backspace, go back to the parent
    const onKeyDown = (event: KeyboardEvent) => {
      if (/^[0-9]$/i.test(event.key)) {
        console.log(event.key);
        goTo(parseInt(event.key));
      } else if (event.key == "Backspace") {
        goBack();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", goBack);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", goBack);
    };
  }, [goTo, goBack]);

  return (
    <>
      <ul>
        <li
          key={crypto.randomUUID()}
          className={node.parent ? "backspaceItem" : "backspaceItem inactive"}
        >
          {"\u00A0".repeat(decimalCode != "" ? decimalCode.length + 1 : 0)}⌫ -{" "}
          <a onClick={() => goBack()}>back</a>
        </li>
        {typeof node.data !== "string" &&
          node.data.map((object: Node, i: number) => (
            // TODO: this is possibly not very efficient
            // I still need to re-render everything, but check if there is another way
            <li key={crypto.randomUUID()}>
              {decimalCode != "" && <>{decimalCode}.</>}
              {i < 10 ? i : Consts.LINK_LIST_CHARS.NIL}
              {typeof object.data === "string" ? (
                <>
                  {Consts.LINK_LIST_CHARS.LINK}{" "}
                  <a href={object.data}>{object.name}</a>
                </>
              ) : (
                <>
                  {Consts.LINK_LIST_CHARS.TREE}{" "}
                  <a onClick={() => handleNodeMove(object, i)}>{object.name}</a>
                </>
              )}
            </li>
          ))}
      </ul>
    </>
  );
}
