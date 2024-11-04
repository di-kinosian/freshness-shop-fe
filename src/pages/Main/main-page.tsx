import { Button } from "../../components/Button/Button";

import FormField from "../../components/FormComponents/FormField";
import Input from "../../components/FormComponents/Input";

export const Main = () => {
  return (
    <div className=" flex flex-col gap-[34px]">
      Size small
      <Button size="small">Buy now</Button>
      medium
      <Button size="medium">+ Add to cart</Button>
      large
      <Button size="large">Complete order</Button>
      Color primary
      <Button color="primary">open Modal</Button>
      secondary
      <Button color="secondary">Add to wish list</Button>
      <FormField label="lsda" error="name is required" />
      <Input placeholder="placeholder" />
    </div>
  );
};
