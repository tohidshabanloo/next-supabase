import Link from "next/link";
import { FiArrowDown, FiSettings } from "react-icons/fi";
import Navigation from "./Navigation";
import Footer from "../components/Footer";
import {
  FiArrowLeft,
  FiBold,
  FiChevronRight,
  FiCode,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
} from "react-icons/fi";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div className="p-4 bg-[#111111] flex flex-col min-h-screen justify-between">
        <nav className="sticky top-4 z-[99]">
          <Navigation />
        </nav>
        <main className="mx-auto">{children}</main>
        <footer className="text-center">
          <div className="font-semibold text-md text-[#888888]"></div>
          {/* <Footer /> */}
          {/* <div className="font-semibold text-md text-[#888888]">
            <a
              href="https://github.com/zpuckeridge/blog"
              className="hover:text-[#ff0000] transition-all duration-200"
            >
              ❤
            </a>
            Made with{" "}
            <a
              href="https://nextjs.org/"
              className="hover:text-white transition-all duration-200"
            >
              Next.JS
            </a>
            ,{" "}
            <a
              href="https://reactjs.org/"
              className="hover:text-white transition-all duration-200"
            >
              React
            </a>
            ,{" "}
            <a
              href="https://supabase.com/"
              className="hover:text-white transition-all duration-200"
            >
              Supabase
            </a>{" "}
            ,
            <a
              href="https://tailwindcss.com/"
              className="hover:text-white transition-all duration-200"
            >
              Tailwind CSS
            </a>{" "}
            and{" "}
          </div> */}
          <div className=" fixed bottom-4 right-4  text-[#888888] transition-all duration-200">
            <div className="mb-5 mr-1 text-red-500">
              <p className="text-right">برای دسترسی به داشبورد</p>
              <p className="text-right">روی چرخدنده زیر کلیک کیند</p>

              <FiArrowDown />
            </div>
            <Link
              href="/dashboard"
              title="Dashboard"
              className="hover:text-white"
            >
              <FiSettings className="h-5 w-5 " />
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
