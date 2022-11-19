import Link from "next/link";
import Router, { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { AiFillHome, AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
import { SiCraftcms } from "react-icons/si";
import { DASHBOARD, HOME, PROFILE } from "../constants/routes";
import useSession from "../hooks/useSession";
import { logout } from "../utils/auth";

const Navbar = () => {
  const { data } = useSession();
  const [activeTab, setActiveTab] = useState("app/home");
  const cookie = parseCookies();
  const router = useRouter();

  const HrefToTab = (href: string) => {
    return href.slice(1, href.length);
  };

  useEffect(() => {
    if (window.location.pathname === HOME) setActiveTab(HrefToTab(HOME));
    else if (window.location.pathname === DASHBOARD)
      setActiveTab(HrefToTab(DASHBOARD));
    else if (window.location.pathname === PROFILE)
      setActiveTab(HrefToTab(PROFILE));
  }, []);

  if (!data) return null;

  const NavLinks = [
    { Icon: AiFillHome, href: HOME },
    {
      Icon: MdDashboard,
      href: DASHBOARD,
    },
    {
      Icon: FaUserCircle,
      href: PROFILE,
    },
  ];

  const render = () => {
    return (
      <nav className="flex h-14 w-full items-center  bg-mainPurple">
        <div className="navbar__logo h-full">
          <Link href={HOME}>
            <SiCraftcms size="2.5rem" className="cursor-pointer" />
          </Link>
        </div>
        <div className="flex h-full w-full items-center justify-center gap-5">
          {NavLinks.map(({ Icon, href }) => {
            const tabName = HrefToTab(href);
            const isActiveTab = tabName === activeTab;

            return (
              <div
                className={`flex h-10 w-10 items-center justify-center ${
                  isActiveTab && "rounded-md bg-red-300"
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
