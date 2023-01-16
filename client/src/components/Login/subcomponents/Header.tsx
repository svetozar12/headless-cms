import Link from "next/link";
import React from "react";
import { REGISTER } from "../../../constants/routes";
import Heading from "../../Heading";

const Header = () => {
  return (
    <>
      <Heading className="mt-5" type="h1" text="Sign in" />
      <p className="text-center text-sm text-white">
        Don&apos;t have account ?{" "}
        <Link href={REGISTER}>
          <span className="text-textPurple cursor-pointer">Register here</span>
        </Link>
      </p>
    </>
  );
};

export default Header;
