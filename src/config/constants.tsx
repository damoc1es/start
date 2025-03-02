import { NodeDescriptor, ColorSchemeDescriptor } from "../types/common_types";

// Key for the local storage of the links list
export const LINKS_LOCAL_STORAGE = "linksList";

// Key for the local storage of the color scheme
export const COLOR_SCHEME_LOCAL_STORAGE = "colorScheme";

// Key for the local storage of the color scheme
export const CUSTOM_COLOR_SCHEME_LOCAL_STORAGE = "customColorScheme";

// Constants for the characters used in the list
export const LINK_LIST_CHARS = {
  LINK: " → ", // used for links
  TREE: " ⊧ ", // used for trees
  NIL: "●", // used for nodes after the 9th one in a view
};

// Default JSON for an empty link list
export const EMPTY_LINKS: NodeDescriptor = {
  name: "list",
  children: [],
};

// Default color scheme
export const DEFAULT_COLOR_SCHEME: ColorSchemeDescriptor = {
  background: "#1a1423",
  color: "#e5be9e",
  backspace: "#b4a6ab",
  accent: "#e56a75",
  inactive: "#3d314a",
};

// Default JSON for the link list
export const DEFAULT_LINKS: NodeDescriptor = {
  name: "list",
  children: [
    {
      name: "Example 1",
      link: "https://www.example.com/",
    },
    {
      name: "Example 2",
      link: "https://www.example.com/",
    },
    {
      name: "Sublist 1",
      children: [
        {
          name: "Link 1.1",
          link: "https://www.example.com/",
        },
        {
          name: "Link 1.2",
          link: "https://www.example.com/",
        },
        {
          name: "Link 1.2",
          link: "https://www.example.com/",
        },
        {
          name: "Sublist in sublist",
          children: [
            {
              name: "Link 2.1",
              link: "https://www.example.com/",
            },
            {
              name: "Link 2.2",
              link: "https://www.example.com/",
            },
          ],
        },
        {
          name: "Link 1.2",
          link: "https://www.example.com/",
        },
        {
          name: "Link 1.2",
          link: "https://www.example.com/",
        },
        {
          name: "Link 1.2",
          link: "https://www.example.com/",
        },
        {
          name: "Link 1.2",
          link: "https://www.example.com/",
        },
        {
          name: "Link 1.2",
          link: "https://www.example.com/",
        },
        {
          name: "Link 1.2",
          link: "https://www.example.com/",
        },
        {
          name: "Link 1.2",
          link: "https://www.example.com/",
        },
        {
          name: "Link 1.2",
          link: "https://www.example.com/",
        },
        {
          name: "Link 1.2",
          link: "https://www.example.com/",
        },
      ],
    },
    {
      name: "Sublist 2",
      children: [
        {
          name: "Link 2.1",
          link: "https://www.example.com/",
        },
        {
          name: "Link 2.2",
          link: "https://www.example.com/",
        },
      ],
    },
  ],
};
