import { useState, useReducer } from "react";
import { NodeDescriptor } from "../types/common_types";
import { EMPTY_LINKS } from "../config/constants";
import {
  existsLinksList,
  getLinksList,
  saveLinksList,
} from "../utils/local_storage_handler";

/**
 * Component for the add new node item.
 *
 * @param onAdd Function to add a new node.
 * @returns {ReactNode} The add new node item component.
 */
function LinkNew({ onAdd }: { onAdd: (name: string, link: string) => void }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // Function to add a new node
  const addNode = () => {
    onAdd(name, link);
    setName("");
    setLink("");
  };

  return (
    <span>
      <button onClick={addNode} disabled={name == ""}>
        +
      </button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />{" "}
      <br />
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Link, or empty for sublist"
      />
    </span>
  );
}

/**
 * Properties for the link item component.
 */
interface LinkItemProps {
  node: NodeDescriptor;
  onRemove: () => void;
  onSave: () => void;
  onUp?: () => void;
  onDown?: () => void;
}

/**
 * Component for a link item in the links editor.
 *
 * @param props Node to render and functions to modify place within list.
 * @returns {ReactNode} The link item component.
 */
function LinkItem({ node, onRemove, onSave, onUp, onDown }: LinkItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(node.name);
  const [link, setLink] = useState(node.link);

  // Function to edit the node
  const onEdit = () => {
    if (editMode) {
      node.name = name;
      if (node.link) {
        node.link = link;
      }
      onSave();
    }

    setEditMode(!editMode);
  };

  // Function to cancel the edit
  const onCancelEdit = () => {
    setEditMode(!editMode);
    setName(node.name);
    if (node.link) {
      setLink(node.link);
    }
  };

  return (
    <span>
      <button onClick={onRemove}>-</button>
      <button disabled={onUp ? false : true} onClick={onUp}>
        ↑
      </button>
      <button disabled={onDown ? false : true} onClick={onDown}>
        ↓
      </button>

      {!editMode ? (
        <>
          {node.name} <a onClick={onEdit}>✎</a>
        </>
      ) : (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          {node.link && (
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Link"
            />
          )}
          <a onClick={onEdit}>🖫</a> <a onClick={onCancelEdit}>🗙</a>
        </>
      )}
      {node.children && <LinksLevel node={node} />}
    </span>
  );
}

/**
 * Component for the links level editor.
 *
 * @param node The node to render and edit.
 * @returns {ReactNode} The links level component.
 */
function LinksLevel({ node }: { node: NodeDescriptor }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // Function to remove a node
  const removeNode = (subnode: NodeDescriptor) => {
    if (node.children) {
      const index = node.children.indexOf(subnode);
      node.children.splice(index, 1);
      forceUpdate();
    }
  };

  // Function to add a new node
  const addNode = (name: string, link: string) => {
    if (node.children) {
      if (link == "") {
        node.children.push({ name: name, children: [] });
      } else {
        node.children.push({ name: name, link: link });
      }
      forceUpdate();
    }
  };

  // Function to update the links
  const updateLinks = () => {
    forceUpdate();
  };

  // Function to move a node up
  const moveNodeUp = (subnode: NodeDescriptor) => {
    if (node.children) {
      const index = node.children.indexOf(subnode);
      if (index > 0) {
        [node.children[index], node.children[index - 1]] = [
          node.children[index - 1],
          node.children[index],
        ];
        forceUpdate();
      }
    }
  };

  // Function to move a node down
  const moveNodeDown = (subnode: NodeDescriptor) => {
    if (node.children) {
      const index = node.children.indexOf(subnode);
      if (index >= 0 && index != node.children.length - 1) {
        [node.children[index], node.children[index + 1]] = [
          node.children[index + 1],
          node.children[index],
        ];
        forceUpdate();
      }
    }
  };

  return (
    <div className="linksEditor">
      {node.children &&
        node.children.map(
          (subnode: NodeDescriptor, index: number, arr: NodeDescriptor[]) => (
            <LinkItem
              key={crypto.randomUUID()}
              node={subnode}
              onRemove={() => {
                removeNode(subnode);
              }}
              onSave={updateLinks}
              onUp={
                index == 0 || arr.length == 1
                  ? undefined
                  : () => {
                      moveNodeUp(subnode);
                    }
              }
              onDown={
                index == arr.length - 1 || arr.length == 1
                  ? undefined
                  : () => {
                      moveNodeDown(subnode);
                    }
              }
            />
          )
        )}
      <LinkNew onAdd={addNode} />
    </div>
  );
}

/**
 * Component for the links editor.
 *
 * @returns {ReactNode} The links editor component.
 */
export function LinksEditor() {
  const [node, setNode] = useState(
    existsLinksList() ? getLinksList() : EMPTY_LINKS
  );

  // Function to save the links to local storage
  const onSave = () => {
    saveLinksList(node);
    window.location.reload();
  };

  // Function to export the links to the clipboard
  const onExport = () => {
    navigator.clipboard.writeText(JSON.stringify(node));
  };

  // Function to import the links from the clipboard
  const onImport = () => {
    navigator.clipboard.readText().then((clipboardText) => {
      setNode(JSON.parse(clipboardText));
    });
  };

  return (
    <>
      <button onClick={onExport}>Export to Clipboard</button>{" "}
      <button onClick={onImport}>Import from Clipboard</button>
      <br />
      <br />
      <LinksLevel node={node} /> <br />
      <button onClick={onSave}>Save & Exit</button>
    </>
  );
}
