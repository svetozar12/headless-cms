import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FaBoxes, FaUserCircle } from "react-icons/fa";
import {
  MdContentPaste,
  MdDashboard,
  MdOutlineContentPaste,
  MdOutlineDashboard,
} from "react-icons/md";
import { CONTENT, CONTENT_MODELS, PROFILE } from "../constants/routes";
import useSession from "../hooks/useSession";
import { logout } from "../utils/auth";

const Navbar = () => {
  const { isLogged } = useSession();
  const [activeTab, setActiveTab] = useState("app/home");
  const router = useRouter();

  const HrefToTab = (href: string) => {
    return href.slice(1, href.length);
  };

  useEffect(() => {
    if (window.location.pathname === CONTENT_MODELS)
      setActiveTab(HrefToTab(CONTENT_MODELS));
    else if (window.location.pathname === CONTENT)
      setActiveTab(HrefToTab(CONTENT));
    else if (window.location.pathname === PROFILE)
      setActiveTab(HrefToTab(PROFILE));
  }, []);

  if (!isLogged) return null;

  const NavLinks = [
    { Icon: FaBoxes, href: CONTENT_MODELS },
    {
      Icon: MdContentPaste,
      href: CONTENT,
    },
    {
      Icon: FaUserCircle,
      href: PROFILE,
    },
  ];

  const render = () => {
    return (
      <nav className="flex h-14 w-full items-center  bg-mainPurple">
        <div className="flex h-full w-full items-center justify-center gap-5">
          {NavLinks.map(({ Icon, href }) => {
            const tabName = HrefToTab(href);
            const isActiveTab = tabName === activeTab;

            return (
              <div
                key={href}
                className={`flex h-10 w-10 items-center justify-center rounded-md duration-500 ease-out bg-transparent${
                  isActiveTab && "rounded-md bg-textPurple"
                }`}
              >
                <Link key={href} href={href}>
                  <Icon
                    size="1.75rem"
                    className="cursor-pointer"
                    onClick={() => {
                      activeTab !== tabName && setActiveTab(tabName);
                      router.push(href);
                    }}
                  />
                </Link>
              </div>
            );
          })}
          <button type="button" onClick={logout}>
            <AiOutlineLogout size="1.75rem" className="cursor-pointer" />
          </button>
        </div>
      </nav>
    );
  };

  return <>{render()}</>;
};

export default Navbar;
