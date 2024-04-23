import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CampaignSubjectSchema } from "@/schemas/campaign";
import { Campaign } from "@/shared/campaign-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaSave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { z } from "zod";

type Props = {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign>>;
};

export const AccordianItemSubject = ({ campaign, setCampaign }: Props) => {
  const [isChanged, setChanged] = useState<boolean>(false);

  const subjectForm = useForm<z.infer<typeof CampaignSubjectSchema>>({
    resolver: zodResolver(CampaignSubjectSchema),
    defaultValues: {
      subject: campaign?.subject?.subject || "",
      preview: campaign?.subject?.preview || ""
    }
  });

  useEffect(() => {
    if (campaign) {
      subjectForm.setValue("subject", campaign.subject?.subject as string);
      subjectForm.setValue("preview", campaign.subject?.preview as string);
    }
  }, [campaign]);

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
    setChanged(false);
  };

  const onFormChanged = () => {
    const formSubject = subjectForm.getValues("subject");
    const formPreview = subjectForm.getValues("preview");

    const campaignSubject = campaign?.subject?.subject || "";
    const campaignPreview = campaign?.subject?.preview || "";

    if (formSubject !== campaignSubject || formPreview !== campaignPreview) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  };

  const onCancel = () => {
    if (campaign.subject) {
      subjectForm.setValue("subject", campaign.subject.subject as string);
      subjectForm.setValue("preview", campaign.subject.preview as string);
    } else {
      subjectForm.setValue("subject", "");
      subjectForm.setValue("preview", "");
    }
    setChanged(false);
  };

  return (
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
            onChange={onFormChanged}
            className="w-full flex flex-col gap-y-4 px-12"
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
            <div className="flex gap-x-4">
              <Button
                disabled={!isChanged}
                type="submit"
                variant="outline"
                className="w-48 flex items-center gap-x-2 border-green-700"
              >
                <FaSave className="text-green-700" />
                Save
              </Button>
              <Button
                disabled={!isChanged}
                type="button"
                variant="outline"
                className="w-48 flex items-center gap-x-2 border-red-700"
                onClick={onCancel}
              >
                <FcCancel />
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
};
