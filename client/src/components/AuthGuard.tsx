import { signIn, useSession } from "next-auth/react";
import React, { FC, ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const AuthGuard: FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      if (!session) signIn();
    }
  }, []);
  if (status !== "loading" && session) return <div>{children}</div>;
  return null;
};

export default AuthGuard;
