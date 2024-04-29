"use client";

import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaFileUpload } from "react-icons/fa";
import Link from "next/link";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { createSubscriberFromStr } from "@/shared/feature/subscriber-create-from-str";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { useRouter } from "next/navigation";

const FromFile = () => {
  const user = useCurrentUser();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const history = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isConfirming, setConfirming] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>("");

  const processText = (text: string, splitter: string) => {
    setLoading(true);

    const lines = text.split("\n");
    Promise.all(
      lines.map(async (line) => {
        const res = await createSubscriberFromStr(
          user?.email as string,
          line,
          splitter
        );
        return res;
      })
    ).then((res) => {
      const successedCnt = res.reduce(
        (accumulator, cur) => accumulator + cur,
        0
      );
      setLoading(false);
      setConfirming(true);
      setConfirmText(
        `${successedCnt} contacts out of ${lines.length} were added successfully.`
      );
    });
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        const splitter = file.type === "text/csv" ? "\t" : ",";
        processText(text as string, splitter);
      };
      reader.readAsText(file);
    }
  };

  const onBack = () => {
    history.push("/audience/contacts/add");
  };

  return (
    <main className="w-5/6 flex flex-col py-6">
      <ConfirmAlert
        open={isConfirming}
        title="Result"
        description={confirmText}
        onAlertDialogClosed={() => setConfirming(false)}
      />
      <p className="text-4xl font-semibold mb-6">Upload a File.</p>
      <p className="text-xl mb-8">Not sure how to format your file?</p>
      <Link
        href="/"
        className="underline underline-offset-2 mb-2 text-blue-500"
      >
        Help me format my CSV
      </Link>
      <Link
        href="/"
        className="underline underline-offset-2 mb-2 text-blue-500 mb-8"
      >
        Watch a tutorial
      </Link>
      <Input
        className="hidden"
        type="file"
        accept="text/*"
        ref={hiddenFileInput}
        onChange={onFileSelected}
      />
      <Button
        disabled={isLoading}
        variant="outline"
        className="w-96 h-32 flex gap-x-2 border-green-700 mb-8"
        onClick={() => hiddenFileInput.current?.click()}
      >
        <FaFileUpload />
        Browse
      </Button>
      <Button
        disabled={isLoading}
        onClick={onBack}
        className="w-64 flex gap-x-2"
      >
        <FaArrowLeft />
        Back
      </Button>
    </main>
  );
};

export default FromFile;
