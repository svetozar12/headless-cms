import useSession from "../hooks/useSession";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
import { AiFillHome, AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import { SiCraftcms } from "react-icons/si";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { isLoggedIn } = useSession();
  const [activeTab, setActiveTab] = useState("home");
  const cookie = parseCookies();
  console.log(isLoggedIn);
  if (!isLoggedIn) return null;

  const logout = () => {
    for (const key in cookie) destroyCookie(null, key);
    window.location.reload();
  };

  useEffect(() => {
    if (window.location.pathname === "/") setActiveTab("home");
    else if (window.location.pathname === "/dashboard")
      setActiveTab("dashboard");
    else if (window.location.pathname === "/profile") setActiveTab("profile");
  });

  return (
    <nav className="flex h-14 w-full items-center  bg-mainPurple">
      <div className="navbar__logo h-full">
        <Link href="/">
          <SiCraftcms size="2.5rem" className="cursor-pointer" />
        </Link>
      </div>
      <div className="flex h-full w-full items-center justify-center gap-5">
        <Link href="/">
          {activeTab === "home" ? (
            <AiFillHome
              size="1.75rem"
              className="cursor-pointer"
              onClick={() => setActiveTab("home")}
            />
          ) : (
            <AiOutlineHome
              size="1.75rem"
              className="cursor-pointer"
              onClick={() => setActiveTab("home")}
            />
          )}
        </Link>
        <Link href="/dashboard">
          {activeTab === "dashboard" ? (
            <MdDashboard size="1.75rem" className="cursor-pointer" />
          ) : (
            <MdOutlineDashboard size="1.75rem" className="cursor-pointer" />
          )}
        </Link>
        <Link href="/profile">
          <FaUserCircle size="1.75rem" className="cursor-pointer" />
        </Link>
        <button type="button" onClick={logout}>
          <AiOutlineLogout size="1.75rem" className="cursor-pointer" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
