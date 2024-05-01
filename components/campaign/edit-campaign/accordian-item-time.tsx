import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { FaCheck, FaSave } from "react-icons/fa";
import { Campaign } from "@/shared/types/campaign";
import { useEffect, useState } from "react";
import { TimeSelect } from "./time-select";
import { Button } from "@/components/ui/button";
import { FcCancel } from "react-icons/fc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CampaignTimeSchema } from "@/schemas/campaign";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TimePickerDemo } from "@/components/utils/time-picker-demo";

type Props = {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign>>;
};

export const AccordianItemTime = ({ campaign, setCampaign }: Props) => {
  const [isChanged, setChanged] = useState<boolean>(false);
  const [instant, setInstant] = useState<boolean>(false);

  const form = useForm<z.infer<typeof CampaignTimeSchema>>({
    resolver: zodResolver(CampaignTimeSchema),
    defaultValues: {}
  });

  useEffect(() => {
    if (campaign) {
      setInstant(campaign.time?.instant || false);
      if (campaign.time?.date) {
        form.setValue("date", new Date(campaign.time?.date as string));
      }
    }
  }, [campaign]);

  const onSubmit = (values: z.infer<typeof CampaignTimeSchema>) => {
    setCampaign({
      ...campaign,
      time: {
        instant: false,
        date: values.date.toISOString()
      }
    });
    setChanged(false);
  };

  const onSubmitClick = () => {
    setCampaign({
      ...campaign,
      time: {
        instant: true
      }
    });
    setChanged(false);
  };

  const onInstantChanged = (value: boolean) => {
    if (value !== instant) {
      setChanged(true);
    }
    setInstant(value);
  };

  const onCancel = () => {
    setInstant(campaign.time?.instant || false);
    form.setValue(
      "date",
      campaign.time?.date
        ? new Date(campaign.time?.date as string)
        : (undefined as unknown as Date)
    );
    setChanged(false);
  };

  return (
    <AccordionItem value="step-3-time">
      <AccordionTrigger className="hover:no-underline hover:drop-shadow">
        <div className="flex items-start gap-x-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${campaign?.time ? "bg-green-600" : "bg-gray-600"}`}
          >
            <FaCheck className="text-white" />
          </div>
          <div className="flex flex-col items-start">
            <p className="text-xl">Send time</p>
            <p className="text-sm text-gray-500">
              When should we send this email?
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-1 pt-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-y-4 px-12"
          >
            <div className="w-full flex gap-x-6">
              <TimeSelect
                focus={!instant}
                title="Schedule a time"
                message="Optimize your timing"
                onClick={() => onInstantChanged(false)}
              />
              <TimeSelect
                focus={instant}
                title="Send now"
                message="Get your email out there now"
                onClick={() => onInstantChanged(true)}
              />
            </div>
            {!instant && (
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-left">
                      Select a date and time*
                    </FormLabel>
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-64 justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            onClick={() => setChanged(true)}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePickerDemo
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            )}
            <div className="flex gap-x-4">
              {instant ? (
                <Button
                  disabled={!isChanged}
                  variant="outline"
                  type="button"
                  className="w-48 flex items-center gap-x-2 border-green-700"
                  onClick={onSubmitClick}
                >
                  <FaSave className="text-green-700" />
                  Save
                </Button>
              ) : (
                <Button
                  disabled={!isChanged}
                  variant="outline"
                  type="submit"
                  className="w-48 flex items-center gap-x-2 border-green-700"
                >
                  <FaSave className="text-green-700" />
                  Save
                </Button>
              )}
              <Button
                disabled={!isChanged}
                variant="outline"
                type="button"
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
