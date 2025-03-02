import { useState } from "react";
import LinksEditor from "./LinksEditor";

/**
 * Component for the settings tab.
 * This component contains a button to toggle the links editor.
 *
 * @returns {ReactNode} The settings tab component.
 */
function SettingsTab() {
  const [linksEditorOpened, setLinksEditorOpened] = useState(false);

  // Function to toggle the links editor
  const toggleLinksEditor = () => {
    setLinksEditorOpened(linksEditorOpened ? false : true);
  };

  return (
    <>
      {!linksEditorOpened ? (
        <button onClick={toggleLinksEditor}>Go to Links Editor</button>
      ) : (
        <>
          <button onClick={toggleLinksEditor}>Back to General Settings</button>
          <br />
          <br />
          <div className="linksEditor">
            <LinksEditor />
          </div>
        </>
      )}
    </>
  );
}

export default SettingsTab;
