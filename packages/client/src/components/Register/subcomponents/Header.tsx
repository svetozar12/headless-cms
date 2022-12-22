import Link from "next/link";
import React from "react";
import { LOGIN } from "../../../constants/routes";
import { Heading } from "@headless-cms/ui";

const Header = () => {
  return (
    <>
      <Heading className="mt-5" type="h1" text="Sign up" />
      <p className="text-center text-sm text-white">
        Already registered ?
        <Link href={LOGIN}>
          <span className="cursor-pointer text-textPurple">Sign in here</span>
        </Link>
      </p>
    </>
  );
};

export default Header;
