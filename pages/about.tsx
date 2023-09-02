import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import dateFormat from "dateformat";
import supabase from "../lib/supabase";
import { FiSearch } from "react-icons/fi";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaSpotify,
  FaSteam,
} from "react-icons/fa";
import Age from "../components/Age";
import Contact from "../components/Contact";
import TimeStatus from "../components/TimeStatus";

export async function getServerSideProps() {
  const { data, error } = await supabase.from("aboutme").select("content");

  if (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      data,
    },
  };
}

export default function About({ data }: { data: any }) {
  return (
    <>
      <Head>
        <title>درمورد من | فرانت لند </title>
        <meta name="description" content="Learn more about me!" />
      </Head>
      <div className="grid place-items-center text-white">
        <div className="mt-20 flex flex-col justify-center items-start max-w-2xl border-gray-700 mx-auto pb-16">
          <h1 className="font-bold text-5xl tracking-tight text-white">
            در مورد من
          </h1>
          {/* <p className="mt-4">
            Hey there! {"I'm"} a <Age /> year old Front End Developer based out
            of Tehran, Iran. Currently, {"I'm"} working for Natasun Company.
          </p> */}
          <p className="mt-4">
            {data.map((article: any) => (
              <div key={article.slug}>
                <div>
                  <div>
                    <h1
                      className="mt-4 text-lg font-semibold line-clamp-6"
                      title={article.title}
                    >
                      {article.content}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </p>
          <div>
            {/* <h2 className="text-2xl font-bold mt-4 mb-4">What do you do?</h2> */}
            {/* <div>
              <p>
                Currently, {"I'm"} building tools to automate various processes
                at RSP as well as designing and deploying networking solutions.
              </p>
              <p className="mt-4">
                {" "}
                When {"I'm"} not at work, or working on a personal project,{" "}
                {"I'm"} hanging out with mates, riding motorcycles, playing
                video games, nerding out over audio and teaching myself
                animation.
              </p>
            </div> */}
            {/* <h2 className="text-2xl font-bold mt-4 mb-4">
              Want to get in touch?
            </h2> */}
            <div>
              <div className="md:flex gap-4 mt-10">
                <div className="w-full">
                  <Contact />
                </div>
                <div className="bg-white/5 md:w-1/3 md:mt-0 mt-4 w-full border border-zinc-800/50 rounded-lg p-4">
                  <a href="https://github.com/tohidshabanloo`">
                    <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                      <FaGithub className="w-6 h-6 mr-1" /> GitHub
                    </button>
                  </a>
                  <a href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=f67b4f43e7fa4620">
                    <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                      <FaSpotify className="w-6 h-6 mr-1" /> Spotify
                    </button>
                  </a>
                  <a href="https://www.linkedin.com/in/tohidshabanloo">
                    <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                      <FaLinkedin className="w-6 h-6 mr-1" /> LinkedIn
                    </button>
                  </a>
                  <a href="https://discordapp.com/users/tohidshabanloo">
                    <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                      <FaDiscord className="w-6 h-6 mr-1" /> tohidshabanloo
                    </button>
                  </a>
                  <a href="https://steamcommunity.com/id/tohidshabanloo/">
                    <button className="p-2 mb-2 w-full bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all">
                      <FaSteam className="w-6 h-6 mr-1" /> tohidshabanloo
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-4 justify-center flex">
              <TimeStatus />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
