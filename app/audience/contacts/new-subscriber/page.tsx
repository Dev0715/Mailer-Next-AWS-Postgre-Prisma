"use client";

import * as z from "zod";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { NewSubscriberSchema } from "@/schemas/contacts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MdClose } from "react-icons/md";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { Checkbox } from "@/components/ui/checkbox";
import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";
import { newSubscriber } from "@/actions/audience/new-subscriber";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { getUserByEmail } from "@/data/user/user-by-email";
import { updateUserTags } from "@/data/user/update-tags";
import { Subscriber } from "@/shared/types/subscriber";

const NewSubscriber = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [updateChecked, setUpdateChecked] = useState<boolean>(false);
  const [consentChecked, setConsentChecked] = useState<boolean>(false);

  const [newTagVal, setNewTagVal] = useState<string>("");
  const [tagSelected, setTagSelected] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [storedTags, setStoredTags] = useState<string[]>([]);
  const [isStoredTagsUpdated, setStoredTagsUpdated] = useState<boolean>(false);

  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertTile, setAlertTitle] = useState<string>("");
  const [alertDescription, setAlertDescription] = useState<string>("");

  useEffect(() => {
    getUserByEmail(user?.email as string).then((res) => {
      if (res && res.tags) {
        setStoredTags(res.tags);
      }
    });
  }, []);

  const onAddNewTag = () => {
    if (newTagVal === "") {
      setAlertOpen(true);
      setAlertTitle("Empty Tag");
      setAlertDescription("You can't add empty tag name!");
    } else if (storedTags.find((tag) => tag === newTagVal)) {
      setAlertOpen(true);
      setAlertTitle("Duplication Error");
      setAlertDescription("Same named Tag already exists!");
    } else {
      setSelectedTags([...selectedTags, newTagVal]);
      setNewTagVal("");
      if (!storedTags.find((tag) => tag === newTagVal)) {
        setStoredTags([...storedTags, newTagVal]);
        setStoredTagsUpdated(true);
      }
    }
  };

  const onDeleteTag = (index: number) => {
    const newTags = [...selectedTags];
    newTags.splice(index, 1);
    setSelectedTags(newTags);
  };

  const onTagSelectChange = (value: string) => {
    setTagSelected("");
    if (selectedTags.find((tag) => tag === value)) {
      setAlertOpen(true);
      setAlertTitle("Duplication Error");
      setAlertDescription("You have already selected that tag!");
    } else {
      setSelectedTags([...selectedTags, value]);
    }
  };

  const onAlertDialogClosed = (open: boolean) => {
    setAlertOpen(open);
    // setNewTagVal("");
  };

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

    if (!consentChecked) {
      setAlertOpen(true);
      setAlertTitle("Warning");
      setAlertDescription("You should have permission to email to them");
      return;
    }

    // verifyMyEmail();

    startTransition(() => {
      if (isStoredTagsUpdated) {
        updateUserTags({
          email: user?.email as string,
          tags: storedTags
        }).then((res) => {
          console.log(res);
        });
      }

      const subscriber: Subscriber = {
        userEmail: user?.email as string,
        subscriberEmail: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        phoneNumber: values.phoneNumber,
        // birthday: values.birthday.toISOString(),
        birthday: values.birthday,
        tags: selectedTags,
        subscribed: true,
        contactRating: 0
      };

      newSubscriber(subscriber, updateChecked).then((data) => {
        setError(data.error as string);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <main className="w-5/6 flex flex-col py-6">
      <ConfirmAlert
        open={alertOpen}
        title={alertTile}
        description={alertDescription}
        onAlertDialogClosed={onAlertDialogClosed}
      />
      <p className="text-4xl font-semibold mb-6">Add a subscriber.</p>
      <div className="flex justify-between mb-8">
        <div className="flex items-end gap-x-4">
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
        <Button
          asChild
          variant="outline"
          className="w-64 flex gap-x-2 border border-red-500"
        >
          <Link href={`/audience/contacts/add`}>
            <FaArrowLeft />
            Back
          </Link>
        </Button>
      </div>
      <Card className="w-full mb-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <CardHeader>
              <CardTitle>
                The customer you input will be registered as subscriber
                automatically
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-x-12">
              <div className="w-1/2 flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="username@myemail.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-x-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="John"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Doe"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Street, City, State, Country"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="+"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="py-1">Date of birth</FormLabel>
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
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>
              <div className="w-1/2 flex flex-col gap-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                    <CardDescription>
                      You select from your original tags or add new one
                    </CardDescription>
                    <div className="flex justify-between gap-x-4 pt-2">
                      <Select
                        value={tagSelected}
                        onValueChange={onTagSelectChange}
                      >
                        <SelectTrigger className="w-1/3">
                          <SelectValue placeholder="Select a Tag" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {/* <SelectLabel>Tags</SelectLabel> */}
                            {storedTags.map((tag) => (
                              <SelectItem key={tag} value={tag}>
                                {tag}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <div className="w-1/2 flex">
                        <Input
                          type="text"
                          value={newTagVal}
                          onChange={(e) => setNewTagVal(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="link"
                          className="flex gap-x-2 text-sm"
                          onClick={onAddNewTag}
                        >
                          <FaPlus />
                          Add a new Tag
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-4">
                    {selectedTags.map((tag, index) => (
                      <Badge
                        key={tag}
                        className="h-8 flex gap-x-2 px-4 rounded-full"
                      >
                        <p>{tag}</p>
                        <Button
                          asChild
                          variant="link"
                          className="p-0 text-base text-black cursor-pointer"
                          onClick={() => onDeleteTag(index)}
                        >
                          <MdClose />
                        </Button>
                      </Badge>
                    ))}
                  </CardContent>
                </Card>

                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={consentChecked}
                      onCheckedChange={(checked) =>
                        setConsentChecked(checked as boolean)
                      }
                    />
                  </FormControl>
                  <div className="space-y-2 leading-none">
                    <FormLabel>
                      This person gave me permission to email them
                    </FormLabel>
                    <FormDescription className="leading-4">
                      This person will not receive a confirmation email from
                      MailManJS. Since you're adding this recipient manually,
                      they won't have an opt-in IP address or date in your
                      records, so be extra sure you have permission first.
                    </FormDescription>
                  </div>
                </FormItem>
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={updateChecked}
                      onCheckedChange={(checked) =>
                        setUpdateChecked(checked as boolean)
                      }
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      If this person is already in my audience, update their
                      profile
                    </FormLabel>
                    <FormDescription></FormDescription>
                  </div>
                </FormItem>
              </div>
            </CardContent>
            <CardFooter className="self-end">
              <Button
                disabled={isPending}
                type="submit"
                className="w-64 flex gap-x-2"
              >
                <FaPlus />
                Register
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
};

export default NewSubscriber;
