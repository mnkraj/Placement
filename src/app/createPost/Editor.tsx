"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import { FiBold, FiItalic, FiUnderline } from "react-icons/fi";

const TiptapEditor = () => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Underline],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return <p>Loading editor...</p>;
  }

  return (
    <div className="w-[80%] md:max-w-2xl mx-auto p-4 bg-[#151b23] shadow-lg rounded-xl border border-white/10">
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-white/10 p-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md transition-all ${
            editor.isActive("bold") ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <FiBold className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md transition-all ${
            editor.isActive("italic") ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <FiItalic className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-md transition-all ${
            editor.isActive("underline") ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <FiUnderline className="text-lg" />
        </button>
      </div>

      {/* Editor */}
      <div className="p-3">
        <EditorContent
          editor={editor}
          className="prose min-h-[150px] p-2 border border-white/10 rounded-lg focus:border-none"
        />
      </div>
    </div>
  );
};

export default TiptapEditor;
