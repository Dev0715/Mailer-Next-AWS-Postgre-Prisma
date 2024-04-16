import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const FilterBar = () => {
  const isTypeOfDate = (keyName: string) => {
    if (
      keyName === "birthday" ||
      keyName === "created" ||
      keyName === "lastChanged"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const filterKeys = [
    "customerEmail",
    "firstName",
    "lastName",
    "address",
    "phoneNumber",
    "birthday",
    "tags",
    "subscribed",
    "contactRating",
    "created",
    "lastChanged"
  ];

  const filterKeyNames = [
    "Email",
    "First Name",
    "Last Name",
    "Address",
    "Phone Number",
    "Birthday",
    "Tags",
    "Subscribed",
    "Contact Rating",
    "Created",
    "Last Changed"
  ];

  return (
    <main className="w-full flex items-center gap-x-6 px-6 py-4 border rounded-lg">
      <Select>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select or search a filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Key</SelectLabel>
            {filterKeys.map((key, index) => (
              <SelectItem key={key} value={key}>
                {filterKeyNames[index]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select or search a filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </main>
  );
};
