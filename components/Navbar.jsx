import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaUser,
  FaBars
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";

import ThemeToggle from "./ThemeToggle";

const Navbar = ({open, setOpen}) => {
  const router = useRouter();
  const { status, data } = useSession();

  if (status === "loading") {
    return <div className="text-red text-center text-2xl">loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <div className="flex justify-between items-center gap-4 shadow-2xl md:px-[4rem] px-[2rem] pt-3 pb-5 fixed left-0 right-0 w-full top-0 bg-light-1 dark:bg-dark-1 z-10">
      <div className="md:hidden flex justify-start items-start cursor-pointer" onClick={()=> setOpen(true)}>
        <FaBars size={35} className="text-dark-1 dark:text-light-1" />
      </div>
      <div className="social--links">
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

      <div className="text-dark-1 dark:text-off-white  text-3xl font-bold md:block hidden">
        <Link href={"/"}>devBlog</Link>
      </div>
      <nav className="navbar">
        <ThemeToggle />
        <Link href={"/"}>Home</Link>
        {status === "authenticated" ? (
          <>
            <Link href={"/write"}>Write</Link>
            <Link href={"/profile"}>{data.user.name?.split(" ")[0]}</Link>
          </>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
        <div
          onClick={signOut}
          className="ml-4 flex gap-2 items-center cursor-pointer"
        >
          <BiLogOut size={30} />
          <span className="text-dark-1 dark:text-light-1 text-sm">Logout</span>
        </div>
        <div className="ml-4 cursor-pointer">
          {data?.user?.image ? (
            <Image
              src={data?.user?.image}
              alt="profile"
              width={30}
              height={30}
              className="rounded-full object-cover"
            />
          ) : (
            <FaUser />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
