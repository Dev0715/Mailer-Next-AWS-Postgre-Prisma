"use client";

import { FaArrowLeft, FaFileUpload } from "react-icons/fa";
import Link from "next/link";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { NewSubscriberSchema } from "@/schemas/contacts";

const NewSubscriber = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewSubscriberSchema>>({
    resolver: zodResolver(NewSubscriberSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: ""
    }
  });

  const onSubmit = (values: z.infer<typeof NewSubscriberSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {});
  };

  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-4xl font-semibold mb-6">Add a subscriber.</p>
      <div className="flex items-end gap-x-4 mb-8">
        <p className="text-xl">
          Want to subscribe more than one person at a time?
        </p>
        <Link
          href="/contacts/add"
          className="underline underline-offset-2 text-blue-500"
        >
          Import an audience
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        ></form>
      </Form>
      <Button asChild className="w-64 flex gap-x-2">
        <Link href={`/audience/contacts/add`}>
          <FaArrowLeft />
          Back
        </Link>
      </Button>
    </main>
  );
};

export default NewSubscriber;
