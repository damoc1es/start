import { useState } from "react";
import { LinksEditor } from "./LinksEditor";
import { ColorsEditor } from "./ColorsEditor";

enum SettingsTabState {
  GENERAL,
  LINKS_EDITOR,
  COLORS_EDITOR,
}

/**
 * Component for the settings tab.
 * This component contains a button to toggle the links editor.
 *
 * @returns {ReactNode} The settings tab component.
 */
export function SettingsTab() {
  const [tabState, setTabState] = useState(SettingsTabState.GENERAL);

  const TabBtn = ({
    state,
    label,
  }: {
    state: SettingsTabState;
    label: string;
  }) => {
    return (
      <button
        className={tabState == state ? "selected" : ""}
        onClick={() => setTabState(state)}
      >
        {label}
      </button>
    );
  };

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
      case SettingsTabState.COLORS_EDITOR:
        return (
          <div className="colorsEditor">
            <ColorsEditor />
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
      <TabBtn state={SettingsTabState.GENERAL} label="General Settings" />{" "}
      <TabBtn state={SettingsTabState.LINKS_EDITOR} label="Links Editor" />{" "}
      <TabBtn state={SettingsTabState.COLORS_EDITOR} label="Colors Editor" />
      <br /> <br />
      {settingsTabContent()}
    </>
  );
}
