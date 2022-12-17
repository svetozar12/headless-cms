import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaBoxes } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import {
  CONTENT,
  CONTENT_MODELS,
  LOGOUT,
  PROFILE,
} from "../../constants/routes";
import useSession from "../../hooks/useSession";
import { useCookie } from "next-cookie";
import Image from "next/image";
import Dropdown from "./subcomponents/Dropdown";
import Spinner from "../Spinner";

const HrefToTab = (href: string) => {
  return href.slice(1, href.length);
};

const Navbar = () => {
  const cookie = useCookie();
  const { user } = useSession();
  const { activeTab = CONTENT_MODELS } = useActiveTab();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const NavLinks = [
    { Icon: FaBoxes, href: CONTENT_MODELS },
    {
      Icon: MdContentPaste,
      href: CONTENT,
    },
  ];

  const render = () => {
    return (
      <nav className="relative flex h-20 w-full items-center bg-mainPurple">
        {!user && <Spinner isLoading={!user} />}
        <div className="flex h-full w-full items-center justify-center gap-5">
          {NavLinks.map(({ Icon, href }) => {
            const tabName = HrefToTab(href);
            const isActiveTab = tabName === activeTab;

            return (
              <div
                key={href}
                className={`flex h-12 w-12 items-center justify-center rounded-md duration-500 ease-out bg-transparent${
                  isActiveTab && "rounded-md bg-textPurple"
                }`}
              >
                <Link key={href} href={href}>
                  <Icon
                    size="2.3rem"
                    className="cursor-pointer"
                    onClick={() => {
                      router.push(href);
                    }}
                  />
                </Link>
              </div>
            );
          })}

          <div className="relative h-9 w-9">
            <Image
              src={user?.avatar as any}
              width="37px"
              height="37px"
              className="flex cursor-pointer items-center justify-center rounded-full"
              onClick={() => setIsOpen((prev) => !prev)}
            />
            <div className="relative flex h-full w-full">
              <Dropdown
                isOpen={isOpen}
                items={[
                  {
                    title: "Logout",
                    onClick: () => {
                      router.push(LOGOUT);
                      setIsOpen(false);
                    },
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </nav>
    );
  };

  return <>{cookie.get("accessToken") && render()}</>;
};

export default Navbar;

const useActiveTab = () => {
  const [activeTab, setActiveTab] = useState("");
  const { setTokens } = useSession();
  useEffect(() => {
    setTokens();

    if (window.location.pathname === CONTENT_MODELS)
      setActiveTab(() => HrefToTab(CONTENT_MODELS));
    else if (window.location.pathname === CONTENT)
      setActiveTab(() => HrefToTab(CONTENT));
    else if (window.location.pathname === PROFILE)
      setActiveTab(() => HrefToTab(PROFILE));
  }, [activeTab, window.location.pathname]);

  return { activeTab };
};
