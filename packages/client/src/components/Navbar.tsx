import Link from "next/link";
import { destroyCookie, parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { AiFillHome, AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
import { SiCraftcms } from "react-icons/si";
import { DASHBOARD, HOME, PROFILE } from "../constants/routes";
import useSession from "../hooks/useSession";

const Navbar = () => {
  const { isLoggedIn } = useSession();
  const [activeTab, setActiveTab] = useState("home");
  const cookie = parseCookies();

  useEffect(() => {
    if (window.location.pathname === "/") setActiveTab("home");
    else if (window.location.pathname === "/dashboard")
      setActiveTab("dashboard");
    else if (window.location.pathname === "/profile") setActiveTab("profile");
  }, []);

  if (!isLoggedIn) return null;

  const logout = () => {
    for (const key in cookie) destroyCookie(null, key);
    window.location.reload();
  };

  const NavLinks = [
    { Icon: activeTab === "home" ? AiFillHome : AiOutlineHome, href: HOME },
    {
      Icon: activeTab === "dashboard" ? MdDashboard : MdOutlineDashboard,
      href: DASHBOARD,
    },
    { Icon: FaUserCircle, href: PROFILE },
  ];

  return (
    <nav className="flex h-14 w-full items-center  bg-mainPurple">
      <div className="navbar__logo h-full">
        <Link href="/">
          <SiCraftcms size="2.5rem" className="cursor-pointer" />
        </Link>
      </div>
      <div className="flex h-full w-full items-center justify-center gap-5">
        {NavLinks.map(({ Icon, href }) => {
          return (
            <Link href={href}>
              <Icon
                size="1.75rem"
                className="cursor-pointer"
                onClick={() => setActiveTab(href.slice(1, href.length))}
              />
            </Link>
          );
        })}
        <button type="button" onClick={logout}>
          <AiOutlineLogout size="1.75rem" className="cursor-pointer" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
