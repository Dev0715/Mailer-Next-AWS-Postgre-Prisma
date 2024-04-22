"use client";

import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Campaign } from "@/shared/campaign-type";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { getAllSegmentsByEmail } from "@/data/segment/all-segments";
import { Segment } from "@/shared/segment-type";
import { FaCheck, FaSave } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CampaignFromSchema, CampaignSubjectSchema } from "@/schemas/campaign";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AccordianItemTo } from "@/components/campaign/edit-campaign/accordian-item-to";
import { AccordianItemFrom } from "@/components/campaign/edit-campaign/accordian-item-from";

type Props = {
  params: { campaignId: string };
};

const EditCampaignPage = ({ params: { campaignId } }: Props) => {
  const user = useCurrentUser();

  const [loadError, setLoadError] = useState<boolean>(false);
  const [campaign, setCampaign] = useState<Campaign>();
  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    getCampaignById(user?.email as string, campaignId).then((campaign) => {
      if (campaign) {
        setCampaign(campaign as Campaign);
      } else {
        setLoadError(true);
      }
    });

    getAllSegmentsByEmail(user?.email as string).then((segments) => {
      if (segments) {
        setSegments(segments as Segment[]);
      }
    });
  }, []);

  const subjectForm = useForm<z.infer<typeof CampaignSubjectSchema>>({
    resolver: zodResolver(CampaignSubjectSchema),
    defaultValues: {
      subject: campaign?.subject?.subject,
      preview: campaign?.subject?.preview
    }
  });

  const onSubjectSubmit = (values: z.infer<typeof CampaignSubjectSchema>) => {
    if (campaign) {
      setCampaign(
        (prev) =>
          ({
            ...prev,
            subject: values
          }) as Campaign
      );
    }
  };

  if (loadError) {
    return notFound();
  }

  return (
    <div className="w-5/6 flex flex-col gap-y-6 py-6">
      <p className="text-4xl text-green-700 font-semibold">
        Campaign {campaign?.title}
      </p>
      <Accordion type={"multiple"}>
        <AccordianItemTo
          campaign={campaign as Campaign}
          setCampaign={
            setCampaign as React.Dispatch<React.SetStateAction<Campaign>>
          }
          segments={segments}
        />
        <AccordianItemFrom
          campaign={campaign as Campaign}
          setCampaign={
            setCampaign as React.Dispatch<React.SetStateAction<Campaign>>
          }
        />
        <AccordionItem value="step-2-subject">
          <AccordionTrigger className="hover:no-underline hover:drop-shadow">
            <div className="flex items-start gap-x-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full 
                  ${campaign?.subject ? "bg-green-600" : "bg-gray-600"}
                `}
              >
                <FaCheck className="text-white" />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-xl">Subject</p>
                <p className="text-sm text-gray-500">
                  What's the subject line for this email?
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-1 pt-1">
            <Form {...subjectForm}>
              <form
                onSubmit={subjectForm.handleSubmit(onSubjectSubmit)}
                className="w-full flex flex-col gap-y-4"
              >
                <div className="w-full flex items-start gap-x-6">
                  <div className="w-1/2 flex">
                    <FormField
                      control={subjectForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Subject*</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Subject for email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2 flex">
                    <FormField
                      control={subjectForm.control}
                      name="preview"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Preview Text</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Preview Text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-48 flex items-center gap-x-2 border-green-700"
                >
                  <FaSave className="text-green-700" />
                  Save
                </Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default EditCampaignPage;
