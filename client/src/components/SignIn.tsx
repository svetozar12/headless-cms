import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { CONTENT } from "../constants/routes";
import Spinner from "./Spinner";
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
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") router.push(CONTENT);
  }, [status]);

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
      <Spinner isLoading={status === "loading"} />
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
