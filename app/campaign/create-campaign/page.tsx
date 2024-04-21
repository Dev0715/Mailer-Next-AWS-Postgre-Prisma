"use client";

import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/utils/form-error";

const NewCampaignSchema = z.object({
  title: z
    .string()
    .min(6, "Email Title should be at least 6 characters long")
    .max(72, "Email Title should be a maximum of 72 characters")
});

const NewCampaign = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewCampaignSchema>>({
    resolver: zodResolver(NewCampaignSchema),
    defaultValues: {
      title: ""
    }
  });

  const onSubmit = (values: z.infer<typeof NewCampaignSchema>) => {
    setError("");

    startTransition(() => {
      // create campaign
    });
  };

  return (
    <div className="w-5/6 flex flex-col py-6">
      <p className="text-5xl text-green-700 font-semibold mb-4">
        Create a new Campaign
      </p>
      <p className="text-xl text-gray-500 mb-12">
        Reach your customer's inboxes at the right time with Campaign Manager.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl font-semibold pb-2">
                    Internet Email Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      className="w-96 h-12 border border-green-700"
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
        <FormError message={error} />
        <Button variant="default" type="submit" className="w-40 flex gap-x-2">
          <FaArrowRight />
          Create Email
        </Button>
      </Form>
    </div>
  );
};

export default NewCampaign;
