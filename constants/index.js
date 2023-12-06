export const errorOptions = {
  position: "top-right",
  duration: 5000,
  style: {
    backgroundColor: "red",
    color: "#fff",
    borderRadius: "10px",
    marginTop: "1rem",
  },
};

export const successOptions = {
  position: "top-right",
  duration: 5000,
  style: {
    backgroundColor: "green",
    color: "#fff",
    borderRadius: "10px",
    marginTop: "1rem",
  },
};

export const links = [
  {
    text: 'Homepage',
    link: '/'
  },
  {
    text: 'Write',
    link: '/write'
  },
  {
    text: 'Profile',
    link: '/profile'
  }
];

export const tags = [
  {
    text: 'Style',
    link: '/style'
  },
  {
    text: 'Fashion',
    link: '/fashion'
  },
  {
    text: 'Coding',
    link: '/coding'
  },
  {
    text: 'Food',
    link: '/food'
  },
  {
    text: 'Culture',
    link: '/culture'
  },
  {
    text: 'Travel',
    link:  '/travel'
  }
]

export const socials = [
  {
    text: 'Facebook',
    link: 'https://www.facebook.com/'
  },
  {
    text: 'Instagram',
    link: 'https://www.instagram.com/'
  },
  {
    text: 'Tiktok',
    link: 'https://www.tiktok.com/'
  },
  {
    text: 'Youtube',
    link: 'https://www.youtube.com/'
  },
]

/** react-quill text editor modifications */
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export const modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
