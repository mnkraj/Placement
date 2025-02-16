"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import { FiBold, FiItalic, FiUnderline } from "react-icons/fi";
interface TiptapEditorProps {
  setHtmlContent: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ setHtmlContent }) => {
  const [content, setContent] = useState<string>("");

  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Underline],
    content: content,
    onUpdate: ({ editor }) => {
      const html =  editor.getHTML()
      setContent(html);
      setHtmlContent(html)
    },
  });

  if (!editor) {
    return <p>Loading editor...</p>;
  }

  return (
    <div className="w-full mb-3 mx-auto p-4 bg-[#161D29] shadow-lg rounded-xl border border-white/10">
      {/* Toolbar */}
      <div className="flex items-center gap-2 text-white border-b border-white/10 p-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md transition-all ${
            editor.isActive("bold") ? "bg-[#FFD60A] text-[#000814]" : "hover:bg-yellow-25"
          }`}
        >
          <FiBold className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md transition-all ${
            editor.isActive("italic") ? "bg-[#FFD60A] text-[#000814]" : "hover:bg-yellow-25"
          }`}
        >
          <FiItalic className="text-lg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-md transition-all ${
            editor.isActive("underline") ? "bg-[#FFD60A] text-[#000814]" : "hover:bg-yellow-25"
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
