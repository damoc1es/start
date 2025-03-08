import { useState } from "react";
import * as Consts from "../config/constants";
import { ColorSchemes } from "../config/theme_colors";
import * as Storage from "../utils/local_storage_handler";

/**
 * Component for the colors editor.
 *
 * @returns {ReactNode} The colors editor component.
 */
export function ColorsEditor() {
  const [selectedScheme, setSelectedScheme] = useState(
    Storage.getColorScheme()
  );

  const customColorScheme = Storage.getCustomColorScheme();

  // TODO: find a way to dynamically create the keys for the custom colors
  const customColors = {
    background: useState(customColorScheme.background),
    color: useState(customColorScheme.color),
    backspace: useState(customColorScheme.backspace),
    accent: useState(customColorScheme.accent),
    inactive: useState(customColorScheme.inactive),
  };

  const ColorInput = ({ color }: { color: keyof typeof customColors }) => {
    return (
      <input
        type="color"
        value={customColors[color][0]}
        onChange={(e) => customColors[color][1](e.target.value)}
      />
    );
  };

  // Function to save the color scheme to local storage
  const onSave = () => {
    if (selectedScheme === Consts.CUSTOM_SCHEME_NAME) {
      Storage.saveColorScheme(selectedScheme);

      // TODO: find a way to dynamically create the keys for the custom colors
      Storage.saveCustomColorScheme({
        background: customColors.background[0],
        color: customColors.color[0],
        backspace: customColors.backspace[0],
        accent: customColors.accent[0],
        inactive: customColors.inactive[0],
      });
    } else {
      Storage.saveColorScheme(selectedScheme);
    }
    window.location.reload();
  };

  return (
    <>
      <select
        value={selectedScheme}
        onChange={(e) => setSelectedScheme(e.target.value)}
      >
        {Object.keys(ColorSchemes).map((schemeName) => (
          <option key={schemeName}>{schemeName}</option>
        ))}
        <option key={Consts.CUSTOM_SCHEME_NAME}>Custom</option>
      </select>

      {selectedScheme === Consts.CUSTOM_SCHEME_NAME ? (
        Object.keys(customColors).map((key) => (
          <div key={key}>
            <label>{key}: </label>
            <ColorInput color={key as keyof typeof customColors} />
          </div>
        ))
      ) : (
        <br />
      )}

      <br />
      <button onClick={onSave}>Save & Exit</button>
    </>
  );
}
