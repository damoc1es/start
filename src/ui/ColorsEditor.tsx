import { useState } from "react";
import { DEFAULT_COLOR_SCHEME } from "../config/constants";
import { ColorSchemes } from "../config/theme_colors";

/**
 * Component for the colors editor.
 *
 * @returns {ReactNode} The colors editor component.
 */
export function ColorsEditor() {
  const [customColorScheme, setCustomColorScheme] =
    useState(DEFAULT_COLOR_SCHEME);

  const [selectedScheme, setSelectedScheme] = useState("Original");

  // Function to save the color scheme to local storage
  const onSave = () => {
    window.location.reload();
  };

  // Function to export the scheme to the clipboard
  const onExport = () => {};

  // Function to import the scheme from the clipboard
  const onImport = () => {};

  return (
    <>
      <select
        value={selectedScheme}
        onChange={(e) => setSelectedScheme(e.target.value)}
      >
        {Object.keys(ColorSchemes).map((schemeName) => (
          <option key={schemeName}>{schemeName}</option>
        ))}
        <option key="Custom">Custom</option>
      </select>

      {selectedScheme === "Custom" ? (
        <>
          <input></input>
        </>
      ) : (
        <></>
      )}

      <br />
      <button onClick={onSave}>Save & Exit</button>
    </>
  );
}
