"use client";

import { DefaultJsonData } from "@/assets/default-email-json";
import { Button } from "@/components/ui/button";
import { savedCampaignAtom } from "@/store/saved-campaign-atom";
import { savedEmailContentAtom } from "@/store/saved-email-content-atom";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";

const NewEmail = () => {
  const history = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [jsonData, setJsonData] = useState<any>(DefaultJsonData);

  const [savedEmailContent, setSavedEmailContent] = useAtom(
    savedEmailContentAtom
  );
  const [savedCampaign] = useAtom(savedCampaignAtom);

  const emailEditorRef = useRef<EditorRef>(null);

  const onReady: EmailEditorProps["onReady"] = () => {
    const unlayer: any = emailEditorRef.current?.editor;

    if (savedEmailContent.isSaved) {
      unlayer.loadDesign(savedEmailContent.emailContent.design);
      setJsonData(savedEmailContent.emailContent.design);
    } else {
      unlayer.loadDesign(jsonData);
    }

    setLoading(false);
  };

  const onSaveExist = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml(async (data) => {
      const { design, html } = data;
      setJsonData(design);
      setSavedEmailContent({
        isSaved: true,
        emailContent: { design, html }
      });
      history.push(
        `/campaign/edit-campaign/${savedCampaign.campaign.campaignId}`
      );
    });
  };

  return (
    <div className="w-5/6 flex flex-col py-6">
      <div className="w-full flex items-end justify-between pb-4">
        <p className="text-3xl text-green-700 font-semibold">
          Create a new Email
        </p>
        <Button disabled={isLoading} onClick={onSaveExist}>
          Save & Exist
        </Button>
      </div>

      <EmailEditor minHeight={"80vh"} ref={emailEditorRef} onReady={onReady} />
    </div>
  );
};

export default NewEmail;
