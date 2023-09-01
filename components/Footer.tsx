import React from "react";
import supabase from "../lib/supabase";

export default function Footer() {
  // const { data, error } = await supabase.from("footer").select("content");
  // console.log(data)
  return (
    <div>
      <p className="mt-4">
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
        hello
      </p>
    </div>
  );
}
