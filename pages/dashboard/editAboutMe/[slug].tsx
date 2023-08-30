import { useSession } from "@supabase/auth-helpers-react";
import dateFormat from "dateformat";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { Fragment, useRef, useState } from "react";
import TextareaMarkdown, {
  TextareaMarkdownRef,
} from "textarea-markdown-editor";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBold,
  FiChevronRight,
  FiCode,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
} from "react-icons/fi";
import supabase from "../../../lib/supabase";
import { BsTypeStrikethrough } from "react-icons/bs";
import { RiHeading } from "react-icons/ri";
import Image from "next/image";

export async function getServerSideProps(context: any) {
  const { slug } = context.query;

  const { data, error } = await supabase
    .from("aboutme")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      data,
    },
  };
}

export default function Edit({ data }: { data: any }) {
  const session = useSession();
  const [saveChanges, setSaveChanges] = useState("ذخیره شد");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const content = e.target.elements.content.value;

    const { data: items, error } = await supabase
      .from("aboutme")
      .update({ content })
      .eq("slug", data.slug)
      .single();

    if (error) {
      throw error;
    }

    setSaveChanges("ذخیره شد!");

    setTimeout(() => {
      setSaveChanges("ذخیره");
    }, 5000);

    router.push(`/dashboard/editAboutMe/${data.slug}`);
  };

  const ref = useRef<TextareaMarkdownRef>(null);

  return (
    <>
      <Head>
        <title>ویرایش {data.content} | توحید شعبانلو</title>
        <meta name="description" content={`Editing ${data.content}`} />
      </Head>
      <div className="sm:max-w-lg">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold mb-4 text-white">ویرایش مقاله</h1>
          <Link href="/dashboard">
            <button className="inline-flex mr-2 mt-4 text-blue-400 hover:text-blue-300">
              برگشت به داشبورد
              <FiArrowLeft className="mr-1 my-auto" />
            </button>
          </Link>
        </div>
        <div className="w-full shadow-2xl bg-white/5 border border-zinc-800/50 rounded-lg p-4 text-white">
          <form onSubmit={handleSubmit}>
            <label className="w-full font-bold text-sm mb-1">
              <Fragment>
                <div className="flex justify-between">
                  <div className="my-auto">
                    محتوا<span className="text-red-500 mr-1">*</span>
                  </div>
                  <div className="my-auto mb-1">
                    <button></button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        ref.current?.trigger("bold");
                      }}
                      className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all"
                    >
                      <FiBold />
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        ref.current?.trigger("italic");
                      }}
                      className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all"
                    >
                      <FiItalic />
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        ref.current?.trigger("strike-through");
                      }}
                      className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all"
                    >
                      <BsTypeStrikethrough />
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        ref.current?.trigger("h1");
                      }}
                      className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all"
                    >
                      <RiHeading />
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        ref.current?.trigger("unordered-list");
                      }}
                      className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all"
                    >
                      <FiList />
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        ref.current?.trigger("code");
                      }}
                      className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all"
                    >
                      <FiCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        ref.current?.trigger("link");
                      }}
                      className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all"
                    >
                      <FiLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        ref.current?.trigger("image");
                      }}
                      className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all"
                    >
                      <FiImage className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        ref.current?.trigger("block-quotes");
                      }}
                      className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all"
                    >
                      <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <TextareaMarkdown
                  ref={ref}
                  name="content"
                  defaultValue={data.content}
                  className="w-full h-[600px] p-2 bg-white/5 border border-zinc-800/50 text-sm mb-4 rounded-lg font-normal"
                  required
                />
              </Fragment>
            </label>
            <button
              className="py-1 px-6 rounded-lg bg-green-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
              title="Save Changes"
              type="submit"
            >
              {saveChanges}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
