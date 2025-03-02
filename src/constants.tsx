// Key for the local storage of the links list
export const LINKS_LOCAL_STORAGE = "linksList";

// Constants for the characters used in the list
export const LINK_LIST_CHARS = {
  LINK: " → ", // used for links
  TREE: " ⊧ ", // used for trees
  NIL: "●", // used for nodes after the 9th one in a view
};

// Default JSON for the list
export const DEFAULT_JSON = {
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
