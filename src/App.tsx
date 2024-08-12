import LinkList from './LinkList'
import { Node } from './Node';
import defaultJson from './defaultJson';


function App() {
  const node: Node = Node.fromJson(defaultJson);

  return (
    <>
      <div className="card">
        <LinkList treeNode={node}/>
      </div>
    </>
  )
}

export default App
