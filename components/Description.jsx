import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

/** react-quill text editor modifications */
const formats = [
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

const modules = {
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

const Description = ({setDetails}) => {
    const [value, setValue] = useState("");
    
    useEffect(() => {
        setDetails((values) => ({
            ...values, 
            description: value
        }))
    }, [setDetails, value])

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            formats={formats}
            modules={modules}
            placeholder="Add post Description..."
            className="text-dark-1 dark:text-light-1 focus-within:min-h-[150px]"
        />
  );
};

export default Description;
