import LinkList from './LinkList'
import { Node } from './Node';

const exampleJson = {
  name: "list",
  children: [
    {
      name: "Example 1",
      link: "https://www.example.com/"
    },
    {
      name: "Example 2",
      link: "https://www.example.com/"
    },
    {
      name: "Sublist 1",
      children: [
        {
          name: "Link 1.1",
          link: "https://www.example.com/"
        },
        {
          name: "Link 1.2",
          link: "https://www.example.com/"
        }
      ]
    },
    {
      name: "Sublist 2",
      children: [
        {
          name: "Link 2.1",
          link: "https://www.example.com/"
        },
        {
          name: "Link 2.2",
          link: "https://www.example.com/"
        }
      ]
    }
  ]
}

function App() {
  const node: Node = Node.fromJson(exampleJson);

  return (
    <>
      <div className="card">
        <LinkList treeNode={node}/>
      </div>
    </>
  )
}

export default App
