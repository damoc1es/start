import { useState } from 'react'
import LinksEditor from './LinksEditor';

function SettingsTab() {
    const [linksEditorOpened, setLinksEditorOpened] = useState(false);

    const toggleLinksEditor = () => {
        setLinksEditorOpened(linksEditorOpened ? false : true);
    }

    return (
        <>
            <button onClick={toggleLinksEditor}>Toggle Links Editor</button>
            <br/><br/>

            {
                linksEditorOpened
                ?
                    <div className='linksEditor'>
                        <LinksEditor/>
                    </div>
                :
                    <>
                    </>
            }
        </>
    )
}

export default SettingsTab
