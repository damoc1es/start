import { useState } from "react";
import LinkList from "./LinkList";
import { Node } from "./Node";
import { LINKS_LOCAL_STORAGE, DEFAULT_JSON } from "./constants";
import SettingsTab from "./SettingsTab";
import settingsIcon from "./assets/settings.svg";

/**
 * Main component of the application.
 *
 * This component manages the state of the settings tab and the list of links.
 * It retrieves the saved links from local storage and initializes the node tree.
 * It also provides a toggle function to open and close the settings tab.
 *
 * @returns {ReactNode} The main component of the application.
 */
function App() {
  const savedLinks = localStorage.getItem(LINKS_LOCAL_STORAGE);
  // Initialize the node tree with the saved links or the default JSON
  const node: Node = Node.fromJson(
    savedLinks ? JSON.parse(savedLinks) : DEFAULT_JSON
  );
  const [settingsTabOpened, setSettingsTabOpened] = useState(false);

  // Function to toggle the settings tab
  const toggleSettings = () => {
    setSettingsTabOpened(settingsTabOpened ? false : true);
  };

  return (
    <>
      <nav>
        <img
          onClick={toggleSettings}
          src={settingsIcon}
          alt="settings icon"
          title="Settings"
        ></img>
      </nav>
      {settingsTabOpened ? (
        <section className="settingsTab">
          <SettingsTab />
        </section>
      ) : (
        <section>
          <LinkList treeNode={node} />
        </section>
      )}
    </>
  );
}

export default App;
