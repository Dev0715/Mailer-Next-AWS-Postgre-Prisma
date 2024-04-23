import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { FaCheck, FaSave } from "react-icons/fa";
import { Campaign } from "@/shared/campaign-type";
import { useState } from "react";
import { TimeSelect } from "./time-select";
import { Button } from "@/components/ui/button";
import { FcCancel } from "react-icons/fc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
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

type Props = {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign>>;
};

export const AccordianItemTime = ({ campaign, setCampaign }: Props) => {
  const [instant, setInstant] = useState<boolean>(false);

  const form = useForm<z.infer<typeof CampaignTimeSchema>>({
    resolver: zodResolver(CampaignTimeSchema),
    defaultValues: {}
  });

  const onSubmit = (values: z.infer<typeof CampaignTimeSchema>) => {};

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
                onClick={() => {
                  setInstant(false);
                }}
              />
              <TimeSelect
                focus={instant}
                title="Send now"
                message="Get your email out there now"
                onClick={() => {
                  setInstant(true);
                }}
              />
            </div>
            {!instant && (
              <div className="w-full flex flex-col">
                <div className="w-56 flex items-center gap-x-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col">
                        <FormLabel className="py-1">Select a time*</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            <div className="flex gap-x-4">
              <Button
                variant="outline"
                className="w-48 flex items-center gap-x-2 border-green-700"
              >
                <FaSave className="text-green-700" />
                Save
              </Button>
              <Button
                variant="outline"
                className="w-48 flex items-center gap-x-2 border-red-700"
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
