"use client";

import { unsubscribe } from "@/actions/campaign/unsubscribe";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";
import { useState, useTransition } from "react";

type Props = {
  params: { campaignId: string; subscriberEmail: string };
};

const UnsubscribePage = ({ params }: Props) => {
  const _params = {
    campaignId: decodeURIComponent(params.campaignId),
    subscriberEmail: decodeURIComponent(params.subscriberEmail)
  };

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onUnSubscribe = () => {
    startTransition(() => {
      unsubscribe({ ..._params }).then((res) => {
        if (res.success) {
          setSuccess("You have successfully unsubscribed from this campaign");
        } else {
          setError(res.error as string);
        }
      });
    });
  };

  return (
    <div className="w-full flex justify-center pt-32">
      <Card className="w-[560px]">
        <CardHeader>
          <CardTitle>Unsubscribe</CardTitle>
          <CardDescription>Unsubscribe from Email Campaign</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <p className="text-lg font-medium text-sky-700">
            {_params.subscriberEmail}
          </p>
          <p className="text-sm">
            By clicking Unsubscribe, you’ll no longer receive marketing emails
            from the list, Malachi UY.
          </p>
          <FormSuccess message={success} />
          <FormError message={error} />
        </CardContent>
        <CardFooter>
          <Button
            disabled={isPending}
            className="rounded-none"
            onClick={onUnSubscribe}
          >
            Unsubscribe
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnsubscribePage;
