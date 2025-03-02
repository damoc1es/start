import { useState } from "react";
import { LinkList } from "./LinkList";
import { Node } from "../types/node";
import { getLinksList } from "../utils/local_storage_handler";
import { SettingsTab } from "./SettingsTab";
import settingsIcon from "../assets/settings.svg";

/**
 * Main component of the application.
 *
 * This component manages the state of the settings tab and the list of links.
 * It retrieves the saved links from local storage and initializes the node tree.
 * It also provides a toggle function to open and close the settings tab.
 *
 * @returns {ReactNode} The main component of the application.
 */
export function App() {
  // Initialize the node tree with the saved links or the default JSON
  const node: Node = Node.fromJson(getLinksList());
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
