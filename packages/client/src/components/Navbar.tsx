import useSession from "../hooks/useSession";
import Link from "next/link";
import { SiCraftcms } from "react-icons/si";
import { destroyCookie, parseCookies } from "nookies";

const Navbar = () => {
  const { data, isLoggedIn } = useSession();
  const cookie = parseCookies();
  if (!isLoggedIn && !data) return null;

  const logout = () => {
    for (const key in cookie) destroyCookie(null, key);
  };

  return (
    <nav className="flex h-14 w-full items-center  bg-mainPurple">
      <div className="navbar__logo">
        <Link href="/">
          <SiCraftcms size="2.5rem" className="cursor-pointer" />
        </Link>
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/login">
          <p onClick={logout}>Logout</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
