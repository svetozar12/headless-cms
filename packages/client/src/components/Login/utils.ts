import { z } from "zod";
import { IFields } from "@headless-cms/ui";

export const getFields = (refs: {
  username: React.RefObject<HTMLInputElement>;
  password: React.RefObject<HTMLInputElement>;
}): IFields[] => {
  const { username, password } = refs;
  return [
    {
      label: "username",
      name: "username",
      type: "text",
      rules: z.string().min(3).max(20),
      extraProps: {
        placeholder: "username",
        extraProps: { ref: username },
      },
    },
    {
      label: "password",
      name: "password",
      type: "password",
      rules: z.string().min(3).max(20),
      extraProps: {
        placeholder: "password",
        extraProps: { ref: password },
      },
    },
  ];
};
