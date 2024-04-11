"use client";

import { FaArrowLeft, FaFileUpload, FaPlus } from "react-icons/fa";
import Link from "next/link";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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

const NewSubscriber = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [newTagVal, setNewTagVal] = useState<string>("");
  const [tagSelected, setTagSelected] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [storedTags, setStoredTags] = useState<string[]>([]);

  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertTile, setAlertTitle] = useState<string>("");
  const [alertDescription, setAlertDescription] = useState<string>("");

  useEffect(() => {
    // Fetch tags from API
    setStoredTags(["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"]);
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

    startTransition(() => {});
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

      <Card className="w-1/2 mb-8">
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
            <CardContent className="space-y-4">
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
                      <Input {...field} disabled={isPending} placeholder="+" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                            <SelectItem value={tag}>{tag}</SelectItem>
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
            </CardContent>
            <CardFooter className="self-end">
              <Button type="submit" className="w-64 flex gap-x-2">
                <FaPlus />
                Register
              </Button>
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
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
};

export default NewSubscriber;
