import { useSession } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
import TextareaMarkdown, {
  TextareaMarkdownRef,
} from "textarea-markdown-editor";
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
import { BsTypeStrikethrough } from "react-icons/bs";
import { RiHeading } from "react-icons/ri";
import supabase from "../../lib/supabase";
import axios from "axios";
import Image from "next/image";

export default function Edit() {
  const session = useSession();
  const router = useRouter();
  const [saveChanges, setSaveChanges] = useState("پست");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState("");
  const [secureUrl, setSecureUrl] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilename(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      formData.append("upload_preset", "supabase");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dufbokly6/image/upload",
          formData
        );

        const image = response?.data?.secure_url;

        if (!image) {
          throw new Error("Image upload failed");
        }

        const formElements = e.target as typeof e.target & {
          title: { value: string };
          description: { value: string };
          slug: { value: string };
          tags: { value: string };
          content: { value: string };
          published: { checked: boolean };
        };

        const title = formElements.title.value;
        const description = formElements.description.value;
        const slug = formElements.slug.value;
        const tags = formElements.tags.value;
        const content = formElements.content.value;
        const published = formElements.published.checked;

        const { data, error } = await supabase
          .from("blog")
          .insert({
            title,
            description,
            image,
            tags,
            content,
            slug,
            published,
          });

        if (error) {
          throw error;
        }

        setLoading(false);
        setSaveChanges("منتشر شد!");
        router.push(`/article/${slug}`);
      } catch (error) {
        console.error("Error submitting form:", error);
        setLoading(false);
        setSaveChanges("ذخیره نشد!");
      }
    } else {
      console.error("No file selected for upload");
      setLoading(false);
      setSaveChanges("ذخیره نشد!");
    }
  };

  const ref = useRef<TextareaMarkdownRef>(null);
  return (
    <>
      <Head>
        <title>پست جدید | فرانت لند</title>
        <meta name="description" content="Create Article" />
      </Head>
      <div className="sm:max-w-lg">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold mb-4 text-white">پست جدید</h1>
          <Link href="/dashboard">
            <button className="inline-flex mr-2 mt-4 text-blue-400 hover:text-blue-300">
              بازگشت به داشبورد
              <FiArrowLeft className="mr-1 my-auto" />
            </button>
          </Link>
        </div>

        <div className="w-full shadow-2xl bg-white/5 border border-zinc-800/50 rounded-lg p-4 text-white">
          <form onSubmit={handleSubmit}>
            <label className="font-bold text-sm mb-1">
              عنوان<span className="text-red-500 mr-1">*</span>
              <input
                className="w-full p-2 bg-white/5 border border-zinc-800/50 text-sm mb-4 rounded-lg font-normal"
                type="text"
                name="title"
                required
              />
            </label>
            <label className="font-bold text-sm mb-1">
              توضیحات<span className="text-red-500 mr-1">*</span>
              <input
                className="w-full p-2 bg-white/5 border border-zinc-800/50 text-sm mb-4 rounded-lg font-normal placeholder:text-[#888888]"
                type="text"
                name="description"
                placeholder="your-description-here"
                required
              />
            </label>
            <label className="font-bold text-sm mb-1">
              عکس کاور<span className="text-red-500 mr-1">*</span>
              <input
                className="flex justify-between w-full p-2 bg-white/5 border border-zinc-800/50 text-sm mb-4 rounded-lg font-normal"
                name="image"
                type="file"
                onChange={handleFileChange}
                required
              />
            </label>
            {filename && (
              <Image
                alt={`${filename}`}
                width={400}
                height={400}
                src={filename}
              />
            )}
            <label className="font-bold text-sm mb-1">
              اسلاگ<span className="text-red-500 mr-1">*</span>
              <input
                className="w-full p-2 bg-white/5 border border-zinc-800/50 text-sm mb-4 rounded-lg font-normal placeholder:text-[#888888]"
                type="text"
                name="slug"
                placeholder="your-slug-here"
                required
              />
            </label>
            <label className="font-bold text-sm mb-1">
              تگ ها<span className="text-red-500 mr-1">*</span>
              <input
                className="w-full p-2 bg-white/5 border border-zinc-800/50 text-sm mb-4 rounded-lg font-normal placeholder:text-[#888888]"
                type="text"
                name="tags"
                placeholder="your-tags-here"
                required
              />
            </label>

            <label className="w-full font-bold text-sm mb-1">
              انتشار
              <input
                type="checkbox"
                name="published"
                defaultChecked
                className="ml-1 mr-2 mb-4"
              />
            </label>

            <label className="w-full font-bold text-sm mb-1 block">
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
                  className="w-full h-[100px] p-2 bg-white/5 border border-zinc-800/50 text-sm mb-4 rounded-lg font-normal"
                  required
                />
              </Fragment>
            </label>
            {loading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            <button
              className="py-1 px-6 rounded-lg bg-green-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
              title="Save Changes"
              type="submit"
              disabled={loading}
            >
              {saveChanges}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
