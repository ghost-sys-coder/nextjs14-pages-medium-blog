import React, { useState } from "react";
import { useRouter } from "next/router";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Menu from "./Menu"

const Layout = ({ children }) => {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <main className="py-[10px] relative">
      <Navbar open={open} setOpen={setOpen} />
      {open && (<Menu open={open} setOpen={setOpen} />)}
      <div className="pt-20 md:px-[4rem] px-[2rem]">
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
