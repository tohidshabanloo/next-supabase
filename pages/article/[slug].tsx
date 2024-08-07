import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import moment from "jalali-moment"; // Import jalali-moment
import { format } from "timeago.js";
import Image from "next/image";
import { useState } from "react";
import CopyLink from "../../components/CopyLink";
import supabase from "../../lib/supabase";
import Head from "next/head";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export async function getServerSideProps(context: any) {
  const { slug } = context.query;

  console.log(`Incrementing view for slug: ${slug}`);

  // Trigger view increment
  const { error: rpcError } = await supabase.rpc("blog_views", {
    quote_id: slug,
    increment_num: 1,
  });

  if (rpcError) {
    console.error("Error updating views:", rpcError.message);
  } else {
    console.log(`View count incremented for slug: ${slug}`);
  }

  // Fetch the updated data
  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching data:", error.message);
    throw new Error(error.message);
  }

  console.log("Fetched data:", data);

  // Convert the date to Jalali format
  data.published_at = moment(data.published_at)
    .locale("fa")
    .format("D MMMM YYYY"); // Format to Persian date with month names
  data.updated_at = moment(data.updated_at).locale("fa").format("YYYY/MM/DD");

  // Serialize content
  const mdxSource = await serialize(data.content || "");

  return {
    props: {
      data,
      mdxSource,
    },
  };
}

export default function Article({
  data,
  mdxSource,
}: {
  data: any;
  mdxSource: any;
}) {
  const [isLoading, setLoading] = useState(true);
  return (
    <>
      <Head>
        <title>{data.title} | فرانت لند</title>
        <meta name="description" content={data.description} />
      </Head>
      <div className="mb-20 mt-20">
        <div className="text-center max-w-3xl">
          <Link href={`/tags/${data.tags.toLowerCase()}`}>
            <p className="uppercase font-bold text-blue-500 hover:text-blue-400">
              {data.tags}
            </p>
          </Link>
          <h1 className="font-bold text-4xl text-white">{data.title}</h1>
          <p className="text-xs text-white">
            تاریخ آخرین آپدیت {data.updated_at}{" "}
            {/* Use the Jalali formatted date */}
          </p>
          <Image
            alt={`${data.title}`}
            width={1000}
            height={1000}
            src={`${data.image}`}
            className={cn(
              "duration-700 ease-in-out w-full h-[400px] object-cover select-none rounded-xl shadow-xl mt-4",
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            )}
            onLoadingComplete={() => setLoading(false)}
            priority={true}
          />
        </div>
        <div className="flex justify-between text-white my-4">
          <div className="text-white">
            {data.published_at} / {data.views} بازدید {/* Display views */}
          </div>
          <CopyLink />
        </div>
        <div className="flex justify-center">
          <article className="prose max-w-xs text-white sm:max-w-2xl prose-invert prose-img:shadow-xl prose-img:rounded-xl">
            <MDXRemote {...mdxSource} />
          </article>
        </div>
      </div>
    </>
  );
}
