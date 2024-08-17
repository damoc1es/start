import { useState } from 'react'
import LinksEditor from './LinksEditor';

function SettingsTab() {
    const [linksEditorOpened, setLinksEditorOpened] = useState(false);

    const toggleLinksEditor = () => {
        setLinksEditorOpened(linksEditorOpened ? false : true);
    }

    return (
        <>
            {
                linksEditorOpened
                ?
                    <button onClick={toggleLinksEditor}>Go to Links Editor</button>
                :
                    <>
                        <button onClick={toggleLinksEditor}>Back to All Settings</button>
                        <br/><br/>
                        <div className='linksEditor'>
                            <LinksEditor/>
                        </div>
                    </>
            }
        </>
    )
}

export default SettingsTab
