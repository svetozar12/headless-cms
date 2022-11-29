import { z } from "zod";
import { IFields } from "../../Form/Form";

export const getFields = (
  values: { username: string; password: string },
  setters: {
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
  }
): IFields[] => {
  const { username, password } = values;
  const { setUsername, setPassword } = setters;
  return [
    {
      label: "username",
      name: "username",
      type: "input",
      handler: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
      value: username,
      rules: z.string().min(3).max(20),
      extraProps: {
        placeholder: "username",
      },
    },
    {
      label: "password",
      name: "password",
      type: "password",
      handler: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      value: password,
      rules: z.string().min(3).max(20),
      extraProps: {
        placeholder: "username",
      },
    },
  ];
};
