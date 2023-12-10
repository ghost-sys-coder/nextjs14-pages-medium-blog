import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { modules, formats } from "@/constants";

import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const UpdateDescription = ({setDescription, description}) => {
 
  return (
    <ReactQuill
      theme="snow"
      value={description}
      onChange={setDescription}
      formats={formats}
      modules={modules}
      placeholder="Add post Description..."
      className="text-dark-1 dark:text-light-1 focus-within:min-h-[150px]"
    />
  );
};

export default UpdateDescription;
