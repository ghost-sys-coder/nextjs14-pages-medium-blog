import { Layout } from "@/components";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/providers/AuthProvider";

import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ??
    ((page) => {
      return (
        <AuthProvider>
          <Layout>{page}</Layout>
        </AuthProvider>
      );
    });

  return getLayout(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
