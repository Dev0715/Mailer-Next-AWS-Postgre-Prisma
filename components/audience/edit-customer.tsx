import { FaPlus, FaSave } from "react-icons/fa";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { EditContactSchema } from "@/schemas/contacts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MdClose } from "react-icons/md";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { Customer } from "@/shared/customer-type";
import { updateUserTags } from "@/data/user/update-tags";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getUserByEmail } from "@/data/user/user-by-email";
import { updateCustomer } from "@/data/audience/update-cusomer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

type PropsParams = {
  customer: Customer | undefined;
  onCustomerUpdate: (success: boolean, updatedCustomer?: Customer) => void;
};

export const EditCustomer = ({ customer, onCustomerUpdate }: PropsParams) => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

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
    if (customer?.tags) setSelectedTags(customer.tags);
  }, []);

  const form = useForm<z.infer<typeof EditContactSchema>>({
    resolver: zodResolver(EditContactSchema),
    defaultValues: {
      email: customer?.customerEmail,
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      address: customer?.address,
      phoneNumber: customer?.phoneNumber,
      birthday: new Date(customer?.birthday as string),
      subscribed: customer?.subscribed ? "subscribed" : "unsubscribed"
    }
  });

  const onSubmit = (values: z.infer<typeof EditContactSchema>) => {
    startTransition(() => {
      if (isStoredTagsUpdated) {
        updateUserTags({
          email: user?.email as string,
          tags: storedTags
        }).then((res) => {
          console.log(res);
        });
      }
      const newCustomer: Customer = {
        ownerEmail: user?.email as string,
        customerEmail: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        phoneNumber: values.phoneNumber,
        birthday: values.birthday.toISOString(),
        subscribed: values.subscribed === "subscribed",
        tags: selectedTags,
        lastChanged: new Date().toISOString()
      };
      updateCustomer(newCustomer).then((res) => {
        if (res.success) {
          onCustomerUpdate(true, newCustomer);
        } else {
          onCustomerUpdate(false);
        }
      });
    });
  };

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

  return (
    <div>
      <ConfirmAlert
        open={alertOpen}
        title={alertTile}
        description={alertDescription}
        onAlertDialogClosed={onAlertDialogClosed}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col gap-y-4">
            <p className="text-2xl font-semibold">Edit Customer</p>
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
            <div className="flex items-end gap-x-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="+" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col">
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
                            disabled={isPending}
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
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  You select from your original tags or add new one
                </CardDescription>
                <div className="flex justify-between gap-x-4 pt-2">
                  <Select
                    disabled={isPending}
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
            <div className="w-full flex items-end justify-between">
              <FormField
                control={form.control}
                name="subscribed"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Subscribed</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Tag" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="subscribed">
                              Subscribed
                            </SelectItem>
                            <SelectItem value="unsubscribed">
                              Unsubscribed
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-64 flex gap-x-2">
                <FaSave />
                Update
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
