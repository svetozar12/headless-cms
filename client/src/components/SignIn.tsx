import { signIn } from "next-auth/react";
import React, { FC } from "react";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { VscWorkspaceUnknown } from "react-icons/vsc";

type ProviderOptions = {
  callbackUrl: string;
  id: string;
  name: string;
  signinUrl: string;
  type: string;
};

type Props = {
  providers: {
    github: ProviderOptions;
  };
};

const SignIn: FC<Props> = ({ providers }) => {
  console.log(providers);

  const getIcon = (providerName: string) => {
    console.log(providerName);
    const iconStyle = "w-7 h-7";
    switch (providerName.toLocaleLowerCase()) {
      case "github":
        return <AiFillGithub className={iconStyle} />;
      case "google":
        return <AiFillGoogleCircle className={iconStyle} />;
      case "discord":
        return <FaDiscord className={iconStyle} />;
      default:
        return <VscWorkspaceUnknown className={iconStyle} />;
    }
  };

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <div className="bg-white w-1/4 h-2/4 flex justify-center items-center">
        {Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className="bg-black text-white p-2 rounded-md hover:bg-opacity-70 cursor-pointer flex justify-center items-center gap-4"
          >
            <div>{getIcon(provider.name)}</div>
            <span>Sign in with {provider.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignIn;
