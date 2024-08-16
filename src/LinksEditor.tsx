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

function LinkItem({ node, onRemove } : {node: LinkListDescriptor, onRemove: () => void}) {
    return (
        <span>
            <button onClick={onRemove}>-</button>
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

    return (
        <div className='linksEditor'>
            {
                node.children && node.children.map((subnode: LinkListDescriptor) =>
                    <LinkItem key={crypto.randomUUID()} node={subnode} onRemove={() => {removeNode(subnode)}}/>
                )
            }
            <LinkNew onAdd={addNode}/>
        </div>
    )
}

function LinksEditor() {
    const storedNode = localStorage.getItem('linksList');
    const node = storedNode != null ? JSON.parse(storedNode) : {name: 'Links', children: []};

    const onSave = () => {
        localStorage.setItem('linksList', JSON.stringify(node))
        window.location.reload();
    }

    return (
        <>
            <LinksLevel node={node}/> <br/>
            <button onClick={onSave}>Save & Exit</button>
        </>
    )
}

export default LinksEditor
