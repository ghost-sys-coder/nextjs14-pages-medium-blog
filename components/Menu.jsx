import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaTimes,
} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const Menu = ({open, setOpen}) => {
  const { data, status } = useSession();
  return (
    <div className="md:hidden bg-light-1 dark:bg-dark-1 min-h-screen absolute top-0 left-0 right-0 w-full bottom-0 z-10 flex flex-col gap-10 py-8 px-10">
      <div className="flex justify-end items-end" onClick={()=> setOpen(false)}>
        <FaTimes size={35} className="text-dark-1 dark:text-light-1" />
      </div>
      <div className="flex justify-between items-center">
        <Link className="text-xl text-neutral-500 font-semibold" href={"/"}>
          devBlog
        </Link>
        <ThemeToggle />
      </div>
      {status === "authenticated" ? (
        <nav className="mobile-nav">
          <Link onClick={()=> setOpen(false)} href={"/profile"}>{data?.user?.name}</Link>
          <Link onClick={()=> setOpen(false)} href={"/write"}>write</Link>
          <div className="flex gap-2 items-center w-full bg-primary-500 py-2 rounded-md cursor-pointer">
            <BiLogOut size={50} onClick={signOut} className="text-white font-bold" />
            <span className="text-gray-300 dark:text-light-2 font-semibold">Logout</span>
          </div>
        </nav>
      ) : (
        <nav className="mobile-nav">
          <Link className="font-semibold capitalize text-xl bg-primary-500 w-full rounded-md py-2 px-2 text-light-1" href={"/login"} onClick={()=> setOpen(false)}>login</Link>
        </nav>
      )}
        <div className="mobile_social-links">
          <Link href={"https://www.facebook.com/"} target="_blank">
            <FaFacebookF />
          </Link>
          <Link href={"https://www.instagram.com/"} target="_blank">
            <FaInstagram />
          </Link>
          <Link href={"https://www.tiktok.com/"} target="_blank">
            <FaTiktok />
          </Link>
          <Link href={"https://www.youtube.com/"} target="_blank">
            <FaYoutube />
          </Link>
        </div>
    </div>
  );
};

export default Menu;
