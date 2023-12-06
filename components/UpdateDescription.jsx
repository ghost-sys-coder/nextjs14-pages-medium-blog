import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { modules, formats } from "@/constants";

import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const UpdateDescription = ({formData, setFormData}) => {
    const [value, setValue] = useState(formData.description);
    
    useEffect(() => {
        setFormData((values) => ({
            ...values,
            description: value
        }))
    }, [setFormData, value])
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

export default UpdateDescription;
