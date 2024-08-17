import { useState, useReducer } from 'react'
import { LinkListDescriptor } from './Node'

function LinkNew({ onAdd } : {onAdd: (name: string, link: string) => void}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const addNode = () => {
        onAdd(name, link);
        setName('');
        setLink('');
    }

    return (
        <span>
            <button onClick={addNode} disabled={name == ''}>+</button>
            <input value={name} onChange={e => setName(e.target.value)} placeholder='Name'/> <br/>
            <input value={link} onChange={e => setLink(e.target.value)} placeholder='Link, or empty for sublist'/>
        </span>
    )
}

interface LinkItemProps {
    node: LinkListDescriptor,
    onRemove: () => void,
    onUp?: () => void,
    onDown?: () => void
}

function LinkItem({ node, onRemove, onUp, onDown} : LinkItemProps) {
    return (
        <span>
            <button onClick={onRemove}>-</button>
            <button disabled={onUp ? false : true} onClick={onUp}>↑</button>
            <button disabled={onDown ? false : true} onClick={onDown}>↓</button>
            {node.name}
            {
                node.children &&
                <LinksLevel node={node}/>
            }
        </span>
    )
}

function LinksLevel({ node } : {node: LinkListDescriptor}) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const removeNode = (subnode: LinkListDescriptor) => {
        if(node.children) {
            const index = node.children.indexOf(subnode);
            node.children.splice(index, 1);
            forceUpdate();
        }
    }

    const addNode = (name: string, link: string) => {
        if(node.children) {
            if(link == '') {
                node.children.push({name: name, children: []});
            } else {
                node.children.push({name: name, link: link});
            }
            forceUpdate();
        }
    }

    const moveNodeUp = (subnode: LinkListDescriptor) => {
        if(node.children) {
            const index = node.children.indexOf(subnode);
            if(index > 0) {
                [node.children[index], node.children[index-1]] = [node.children[index-1], node.children[index]];
                forceUpdate();
            }
        }
    }

    const moveNodeDown = (subnode: LinkListDescriptor) => {
        if(node.children) {
            const index = node.children.indexOf(subnode);
            if(index >= 0 && index != node.children.length-1) {
                [node.children[index], node.children[index+1]] = [node.children[index+1], node.children[index]];
                forceUpdate();
            }
        }
    }

    return (
        <div className='linksEditor'>
            {
                node.children && node.children.map((subnode: LinkListDescriptor, index: number, arr: LinkListDescriptor[]) =>
                    <LinkItem key={crypto.randomUUID()}
                        node={subnode}
                        onRemove={() => {removeNode(subnode)}}
                        onUp={index == 0 || arr.length == 1 ? undefined : () => {moveNodeUp(subnode)}}
                        onDown={index == arr.length-1 || arr.length == 1 ? undefined : () => {moveNodeDown(subnode)}}/>
                )
            }
            <LinkNew onAdd={addNode}/>
        </div>
    )
}

function LinksEditor() {
    const storedNode = localStorage.getItem('linksList');
    const [node, setNode] = useState(storedNode != null ? JSON.parse(storedNode) : {name: 'Links', children: []});

    const onSave = () => {
        localStorage.setItem('linksList', JSON.stringify(node))
        window.location.reload();
    }

    const onExport = () => {
        navigator.clipboard.writeText(JSON.stringify(node));
    }

    const onImport = () => {
        navigator.clipboard.readText().then((clipboardText) => {
            setNode(JSON.parse(clipboardText));
        });
    }

    return (
        <>
            <button onClick={onExport}>Export to Clipboard</button> <button onClick={onImport}>Import from Clipboard</button>
            <br/><br/>
            <LinksLevel node={node}/> <br/>
            <button onClick={onSave}>Save & Exit</button>
        </>
    )
}

export default LinksEditor
