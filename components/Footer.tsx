import React from "react";
import supabase from "../lib/supabase";
import Link from "next/link";

export default function Footer() {
  // const { data, error } = await supabase.from("footer").select("content");
  // console.log(data)
  return (
    <div className=" text-gray-500">
      <p className=" mt-4 ">
        {/* {data.map((item: any) => (
          <div key={item.slug}>
            <div>
              <div>
                <h1 className="mt-4 text-lg font-semibold line-clamp-title">
                  {item.content}
                </h1>
              </div>
            </div>
          </div>
        ))} */}
        ساخته شده با Supabase | Nextjs | Cloudinary
      </p>
      <p>
        <Link href="https://tohidsh.com/" title="backpacker" target="_blank">
          توسط کوله پشتی
        </Link>
      </p>
    </div>
  );
}
