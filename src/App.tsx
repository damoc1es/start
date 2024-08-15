import LinkList from './LinkList'
import { Node } from './Node';
import defaultJson from './defaultJson';


function App() {
  const node: Node = Node.fromJson(defaultJson);

  return (
    <>
      <section>
        <LinkList treeNode={node}/>
      </section>
    </>
  )
}

export default App
