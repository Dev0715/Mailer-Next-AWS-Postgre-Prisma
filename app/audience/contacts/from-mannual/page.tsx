"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createSubscriberFromStr } from "@/shared/functions/subscriber-create-from-str";
import { Spinner } from "@nextui-org/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FromMannual = () => {
  const user = useCurrentUser();
  const history = useRouter();

  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isConfirming, setConfirming] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>("");

  const onContinueOrganize = () => {
    if (inputText === "") {
      return;
    }

    setLoading(true);
    const lines = inputText.split("\n");
    Promise.all(
      lines.map(async (line) => {
        const res = await createSubscriberFromStr(
          user?.email as string,
          line,
          ","
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
      <p className="text-4xl font-semibold mb-6">
        Copy and paste your contacts
      </p>
      <div className="flex items-end gap-x-4 mb-8">
        <p className="text-xl">Not sure how to format your file?</p>
        <Link href="/" className="underline underline-offset-2 text-blue-500">
          Learn how
        </Link>
      </div>
      <div className="flex flex-col text-lg font-medium mb-4">
        <p>
          Paste your contact information into this box using commas to separate
          each field.
        </p>
        <p>There should be one contact per line.</p>
      </div>
      <Textarea
        disabled={isLoading}
        className="h-64 border-green-500 mb-8"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Email, First Name, Last Name, Address, Phone Number, Birthday (Fri Apr 19 2024)"
      />
      <div className="flex justify-between">
        <Button
          disabled={isLoading}
          className="w-64 flex gap-x-2 bg-red-700 hover:bg-red-600"
          onClick={onBack}
        >
          {/* <Link href="/audience/contacts/add"> */}
          <FaArrowLeft />
          Back
          {/* </Link> */}
        </Button>
        <div className="flex items-center gap-x-6">
          {isLoading && <Spinner color="primary" />}
          <Button
            disabled={isLoading}
            className="w-64 flex gap-x-2"
            onClick={onContinueOrganize}
          >
            <FaArrowRight />
            Continue to Organize
          </Button>
        </div>
      </div>
    </main>
  );
};

export default FromMannual;
