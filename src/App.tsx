import { useState } from 'react';
import LinkList from './LinkList'
import { Node } from './Node';
import defaultJson from './defaultJson';
import SettingsTab from './SettingsTab';
import settingsIcon from './assets/settings.svg'


function App() {
  const savedLinks = localStorage.getItem('linksList');
  const node: Node = Node.fromJson(savedLinks ? JSON.parse(savedLinks) : defaultJson);
  const [settingsTabOpened, setSettingsTabOpened] = useState(false);

  const toggleSettings = () => {
    setSettingsTabOpened(settingsTabOpened ? false : true);
  }

  return (
    <>
      <nav>
        <img onClick={toggleSettings} src={settingsIcon} alt='settings icon' title='Settings'></img>
      </nav>
      {
        settingsTabOpened
        ?
          <section className='settingsTab'>
            <SettingsTab/>
          </section>
        :
          <section>
            <LinkList treeNode={node}/>
          </section>
      }
    </>
  )
}

export default App
