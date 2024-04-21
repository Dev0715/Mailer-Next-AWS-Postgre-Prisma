"use client";

import { useRef } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";

const NewEmail = () => {
  const emailEditorRef = useRef<EditorRef>(null);

  const onReady: EmailEditorProps["onReady"] = () => {
    const unlayer: any = emailEditorRef.current?.editor;
    console.log(unlayer);
  };

  return (
    <div className="w-5/6 flex flex-col py-6">
      <p className="text-5xl text-green-700 font-semibold mb-4">
        Create a new Email
      </p>
      <EmailEditor minHeight={"80vh"} ref={emailEditorRef} onReady={onReady} />
    </div>
  );
};

export default NewEmail;
