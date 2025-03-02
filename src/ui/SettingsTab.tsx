import { useState } from "react";
import { LinksEditor } from "./LinksEditor";

enum SettingsTabState {
  GENERAL,
  LINKS_EDITOR,
}

/**
 * Component for the settings tab.
 * This component contains a button to toggle the links editor.
 *
 * @returns {ReactNode} The settings tab component.
 */
export function SettingsTab() {
  const [tabState, setTabState] = useState(SettingsTabState.GENERAL);

  const settingsTabContent = () => {
    switch (tabState) {
      case SettingsTabState.GENERAL:
        return <></>;
      case SettingsTabState.LINKS_EDITOR:
        return (
          <div className="linksEditor">
            <LinksEditor />
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      This website can be used as a start page for your browser.
      <br />
      The only data stored is in local storage, not sent to any server.
      <br />
      Code for this is available at{" "}
      <a href="https://github.com/damoc1es/start">damoc1es/start</a>.<br />
      <br />
      {tabState == SettingsTabState.GENERAL ? (
        <button className="selected">General Settings</button>
      ) : (
        <button onClick={() => setTabState(SettingsTabState.GENERAL)}>
          General Settings
        </button>
      )}{" "}
      {tabState == SettingsTabState.LINKS_EDITOR ? (
        <button className="selected">Links Editor</button>
      ) : (
        <button onClick={() => setTabState(SettingsTabState.LINKS_EDITOR)}>
          Links Editor
        </button>
      )}{" "}
      <br /> <br />
      {settingsTabContent()}
    </>
  );
}
