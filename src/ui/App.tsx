import { useState } from "react";
import { LinkList } from "./LinkList";
import { SettingsTab } from "./SettingsTab";
import { Node } from "../types/node";
import { loadColorScheme } from "../utils/color_scheme_loader";
import * as Storage from "../utils/local_storage_handler";
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
  const node: Node = Node.fromJson(Storage.getLinksList());
  const [settingsTabOpened, setSettingsTabOpened] = useState(false);

  // Load the color scheme from local storage
  loadColorScheme(Storage.getColorScheme());

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
