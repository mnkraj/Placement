import Navbar from "./components/Navbar/index";
import "./globals.css";
import { Toaster } from "react-hot-toast";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="antialiased bg-[rgb(0,8,20)] ">
        <Toaster />
        <Navbar />
        {/* <div className="grid min-h-dvh grid-cols-1 md:grid-cols-[1fr_minmax(0,1200px)_1fr] justify-center pt-14 [--gutter-width:2.5rem]"> */}
          {/* Left patterned sidebar */}
          {/* <div className="hidden md:block border-x border-x-[--pattern-fg] bg-[image:repeating-linear-gradient(315deg,#00,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 dark:[--pattern-fg:var(--color-white)]/10"></div> */}

          {/* Main content area */}
          {/* <div className="w-full max-w-5xl mx-auto px-6 sm:px-12 grid gap-24 pb-24 text-gray-950 sm:gap-40 md:pb-40 dark:text-white"> */}
            <div className=" flex flex-col justify-center align-bottom ">
            {children}
            </div>
          {/* </div> */}

          {/* Right patterned sidebar */}
          {/* <div className="hidden md:block border-x border-x-[--pattern-fg] bg-[image:repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 dark:[--pattern-fg:var(--color-white)]/10"></div> */}
        {/* </div> */}
      </body>
    </html>
  );
}

