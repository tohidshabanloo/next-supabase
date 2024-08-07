import Link from "next/link";
import Image from "next/image";
import NowPlaying from "../components/NowPlaying";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import supabase from "../lib/supabase";
import dateFormat from "dateformat";
import Head from "next/head";
import moment from "jalali-moment"; // Import jalali-moment

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("blog")
    .select("slug, views, published_at, title, description, tags, image")
    .order("published_at", { ascending: false })
    .eq("published", true)
    .range(0, 5);

  data?.forEach((item: any) => {
    item.published_at = moment(item.published_at)
      .locale("fa")
      .format("D MMMM YYYY"); // Format to Persian date with month names
  });
  if (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }: { data: any }) {
  //return only data with 'learn' tag
  const leranData = data.filter((item: any) => item.tags.includes("js"));

  const [isLoading, setLoading] = useState(true);
  // console.log(data);
  return (
    <>
      <Head>
        <title>صفحه اصلی | فرانت لند</title>
        <meta
          name="description"
          content="Woah! You made it to my personal website, welcome."
        />
      </Head>
      <div className="max-w-4xl border-gray-200 dark:border-gray-700 mt-20 mb-20">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col ">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-white">
              فرانت لند
            </h1>
            <h2 className="mt-2 text-white mb-4">
              برنامه نویس فرانت اند در{" "}
              <span className="font-semibold">
                <a
                  href="https://natasun.ir/"
                  title="ناتاسان"
                  className="hover:text-[#dacf00] text-[#fff200] transition-all duration-200"
                >
                  ناتاسان
                </a>
              </span>
            </h2>
            <p className="text-[#888888] mb-16">
              ساخت محتوای ویدیوئی در روز؛ برنامه نویسی در شب.
            </p>
          </div>
          <div className="mb-8 sm:mb-0 mr-auto">
            <Image
              alt="فرانت لند"
              height={140}
              width={140}
              src="https://res.cloudinary.com/dufbokly6/image/upload/v1693620292/644617_h3pmwh.png"
              className={cn(
                "duration-700 ease-in-out hidden w-36 md:flex select-none",
                isLoading
                  ? "grayscale blur-2xl scale-110"
                  : "grayscale-0 blur-0 scale-100"
              )}
              onLoadingComplete={() => setLoading(false)}
              priority={true}
            />
          </div>
        </div>
        <h3 className="font-bold text-3xl tracking-tight mb-4 text-white">
          مقاله های اخیر
        </h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 max-w-4xl mx-auto">
          {data.map((article: any) => (
            <div key={article.slug}>
              <Link
                href={`/article/${article.slug}`}
                className=" transform hover:scale-[1.05] h-full transition-all text-white bg-white/5 border border-zinc-800/50 rounded-lg flex flex-col overflow-hidden hover:ring-2 ring-gray-300"
              >
                <div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-2">
                    <div className="">
                      <Image
                        alt="فرانت لند"
                        height={1000}
                        width={1000}
                        src={article.image}
                        className={cn(
                          "object-cover h-64 w-52 rounded-r-lg duration-700 ease-in-out   md:flex select-none",
                          isLoading
                            ? "grayscale blur-2xl scale-110"
                            : "grayscale-0 blur-0 scale-100"
                        )}
                        onLoadingComplete={() => setLoading(false)}
                        priority={true}
                      />
                    </div>
                    <div>
                      <h1
                        className="mt-4 text-lg font-semibold line-clamp-title"
                        title={article.title}
                      >
                        {article.title}
                      </h1>
                      <h1 className="mt-4 ml-4 text-sm font-extralight text-gray-400  text-justify w-42  line-clamp-6">
                        {article.description}
                      </h1>
                      <div className="gap-4 mb-2 absolute bottom-0  text-gray-400  flex justify-between text-sm">
                        <div>{article.published_at}</div>
                        <div>{article.views} بازدید</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div>
            <Link
              href="/blog"
              title="Read all posts"
              className="flex mt-4 text-[#888888] rounded-lg hover:text-white transition-all"
            >
              مشاهده تمامی پست ها
              <FiArrowLeft className="ml-1 h-4 w-4 my-auto" />
            </Link>
          </div>

          {/* <div>
            <h4 className="flex mt-4 text-[#888888] rounded-lg hover:text-white transition-all">
            <Link href="/tracks">
            <NowPlaying />
            </Link>
            </h4>
          </div> */}
        </div>
        <h3 className="font-bold text-3xl tracking-tight mb-4 mt-4 text-white">
          جاوا اسکریپت
        </h3>
        <div className="grid grid-cols-3 gap-4  max-w-4xl mx-auto ">
          {leranData.map((article: any) => (
            <div key={article.slug}>
              <Link
                href={`/article/${article.slug}`}
                className=" transform hover:scale-[1.05] h-full transition-all text-white bg-white/5 border border-zinc-800/50 rounded-lg flex flex-col overflow-hidden hover:ring-2 ring-gray-300"
              >
                <div>
                  <div className="row sm:grid-cols-2 md:grid-cols-2 ">
                    <div className="">
                      <Image
                        alt="فرانت لند"
                        height={1000}
                        width={1000}
                        src={article.image}
                        className={cn(
                          "object-cover h-32 w-100 rounded-t-lg duration-700 ease-in-out   md:flex select-none",
                          isLoading
                            ? "grayscale blur-2xl scale-110"
                            : "grayscale-0 blur-0 scale-100"
                        )}
                        onLoadingComplete={() => setLoading(false)}
                        priority={true}
                      />
                    </div>
                    <div className="mx-4 mb-10">
                      <h1
                        className="text-yellow-500 mt-4 text-lg font-semibold line-clamp-title"
                        title={article.title}
                      >
                        {article.title}
                      </h1>
                      <h1 className="mt-4 ml-4 text-sm font-extralight text-gray-400  text-justify w-42  line-clamp-6">
                        {article.description}
                      </h1>
                      <div className="gap-4 mb-2 absolute bottom-2  text-gray-400  flex justify-between text-sm">
                        <div>{article.published_at}</div>
                        <div>{article.views} بازدید</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <Link
            href="/blog"
            title="Read all posts"
            className="flex mt-4 text-[#888888] rounded-lg hover:text-white transition-all"
          >
            مشاهده تمامی پست ها
            <FiArrowLeft className="ml-1 h-4 w-4 my-auto" />
          </Link>
        </div>
      </div>
    </>
  );
}
