import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaInstagram
} from "react-icons/fa";
import { links, socials, tags } from "@/constants";

const Footer = () => {
  return (
    <footer className="md:px-[4rem] px-[2rem] my-16 flex flex-col md:flex-row md:gap-4 gap-10 justify-between flex-wrap">
      <div className="flex flex-col flex-1 gap-2">
        <Link className="text-2xl font-bold text-dark-1 dark:text-light-1" href={"/"}>devBlog</Link>
        <p className="leading-6 font-medium text-dark-4 dark:text-light-3">
          {"This blog is your one-stop shop for all things intersectional: where vibrant cultures meet coding finesse, and where style struts with a programmer's edge. Built with Next.js, React, and MongoDB, this space is more than just pixels and text - it's a community for the curious, the creative, and the code-savvy."}
        </p>
        <div className="flex gap-3 items-center mt-6">
          <FaFacebookF size={25} className="text-primary-600 dark:text-light-2" />
          <FaInstagram size={25} className="text-primary-600 dark:text-light-2" />
          <FaTiktok size={25} className="text-primary-600 dark:text-light-2" />
          <FaYoutube size={25} className="text-primary-600 dark:text-light-2" />
        </div>
      </div>
      <div className="flex gap-10 flex-1 justify-between md:justify-end">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-dark-3 dark:text-light-2 capitalize">Links</h3>
          {links.map((link, index) => (
            <Link className="font-semibold text-sm text-dark-4 dark:text-light-3 hover:translate-x-2 hover:text-primary-500" key={index} href={link.link}>{link.text}</Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-dark-3 dark:text-light-2 capitalize">Tags</h3>
          {tags.map((tag, index) => (
            <Link className="font-semibold text-sm text-dark-4 dark:text-light-3 hover:translate-x-2 hover:text-primary-500" key={index} href={tag.link}>{tag.text}</Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-dark-3 dark:text-light-2 capitalize">Social</h3>
          {socials.map((social, index) => (
            <Link className="font-semibold text-sm text-dark-4 dark:text-light-3 hover:translate-x-2 hover:text-primary-500" key={index} target="_blank" href={social.link}>{social.text}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
