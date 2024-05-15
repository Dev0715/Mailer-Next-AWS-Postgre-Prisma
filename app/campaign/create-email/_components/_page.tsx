"use client";

import { DEFAULT_EMAIL_DESIGN } from "@/assets/default-email-json";
import { Button } from "@/components/ui/button";
import { savedCampaignAtom } from "@/store/saved-campaign-atom";
import { savedEmailAtom } from "@/store/saved-email-atom";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";

export const NewEmail = () => {
  const history = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [savedEmail, setSavedEmail] = useAtom(savedEmailAtom);
  const [savedCampaign] = useAtom(savedCampaignAtom);

  const emailEditorRef = useRef<EditorRef>(null);

  const onReady: EmailEditorProps["onReady"] = () => {
    const editor = emailEditorRef.current?.editor;
    editor?.loadDesign(
      savedEmail.isSaved ? savedEmail.email.design : DEFAULT_EMAIL_DESIGN
    );
    setLoading(false);
  };

  const onSaveExist = () => {
    const editor = emailEditorRef.current?.editor;
    editor?.exportHtml(async (data) => {
      const { design, html } = data;
      setSavedEmail({
        isSaved: true,
        email: { design, html }
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
