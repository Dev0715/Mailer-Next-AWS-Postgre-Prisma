"use client";

import { DefaultJsonData } from "@/assets/default-email-json";
import { useEffect, useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";

const NewEmail = () => {
  const [isLoading, setLoading] = useState(true);
  const [jsonData, setJsonData] = useState<any>(DefaultJsonData);

  const emailEditorRef = useRef<EditorRef>(null);

  useEffect(() => {}, []);

  const onReady: EmailEditorProps["onReady"] = () => {
    const unlayer: any = emailEditorRef.current?.editor;
    unlayer.loadDesign(jsonData);
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
