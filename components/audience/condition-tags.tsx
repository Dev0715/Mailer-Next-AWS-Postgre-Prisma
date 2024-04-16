import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const TagsCondition = () => {
  return (
    <div className="flex gap-x-6">
      <Select>
        <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
          <SelectValue placeholder="Select a condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Select a Condition</SelectLabel> */}
            <SelectItem value="contains">Contains</SelectItem>
            <SelectItem value="not-contains">Doesn't contain</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup></SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export const StringCondition = () => {
  return (
    <Select>
      <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
        <SelectValue placeholder="Select a condition" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Select a Condition</SelectLabel> */}
          <SelectItem value="contains">Contains</SelectItem>
          <SelectItem value="not-contains">Doesn't contain</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const DateCondition = () => {
  return (
    <Select>
      <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
        <SelectValue placeholder="Select a condition" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Select a Condition</SelectLabel> */}
          <SelectItem value="is-after">Is After</SelectItem>
          <SelectItem value="is-before">Is Before</SelectItem>
          <SelectItem value="is">Is</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const SubscribedCondition = () => {
  return (
    <Select>
      <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
        <SelectValue placeholder="Select a condition" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Select a Condition</SelectLabel> */}
          <SelectItem value="is">Subscribed</SelectItem>
          <SelectItem value="is-not">Unsubscribed</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
