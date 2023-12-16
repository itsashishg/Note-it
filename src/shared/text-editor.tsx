"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
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

export default function TextEditor() {
  const [value, setValue] = useState("");
  return (
    <>
      <div>Note-It</div>
      <div>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          id="title"
          type="text"
          name="Title"
          placeholder="Title your masterpiece..."
        />
      </div>
      <ReactQuill
        formats={formats}
        modules={modules}
        value={value}
        placeholder="Insert your thoughts..."
        onChange={setValue}
        theme="snow"
        className="border-none"
      />
    </>
  );
}
