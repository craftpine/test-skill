"use client";

import { useSession, signIn } from "next-auth/react";
import LandingNavbar from "@/components/landing-navbar";
import { Image } from "@nextui-org/image";
import author from "@/assets/banner-author.webp";
import bannerTop from "@/assets/banner-top.png";
import Section from "@/components/section";
import Footer from "@/components/footer";
import { Button } from "@nextui-org/button";
import { FcGoogle } from "react-icons/fc";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import CONSTANTS from "@/constants";

export default function Home() {
  const session = useSession();

  const authenticated = useMemo(() => {
    return dayjs().isBefore(session.data?.expires);
  }, [(session.data as any)?.exp]);

  return (
    <>
      <LandingNavbar />
      <div className="relative">
        <div className="mt-2 absolute bottom-0 left-0 w-full -z-10">
          <Image isBlurred src={bannerTop.src} alt="NextUI Album Cover" />
        </div>

        <div className="container md:py-6 md:px-32 px-4 mx-auto">
          <div className="flex flex-wrap ">
            <div className="flex items-center w-full lg:w-1/2">
              <Section delay={0.1}>
                <div className="max-w-2xl mb-8">
                  <h1 className="font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                    Welcome!
                  </h1>
                  <p className=" leading-normal text-black lg:text-xl xl:text-4xl dark:text-gray-300">
                    to Skill Inventory
                  </p>
                  <p className="text-xl py-4 text-bold capitalize text-gray-500 dark:text-gray-300">
                    Unleash Your Potential: Manage and Showcase Your Skills
                  </p>

                  <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                    {authenticated ? (
                      <Button color="primary" endContent="">
                        <Link href="/dashboard/profile">Get started</Link>
                      </Button>
                    ) : (
                      <Button
                        startContent={<FcGoogle size={24} />}
                        onPress={() => signIn("google")}
                      >
                        Continue with Google
                      </Button>
                    )}

                    <Button
                      startContent={<FcGoogle size={24} />}
                      onPress={() => signIn("google")}
                    >
                      Continue with Google
                    </Button>
                  </div>
                </div>
              </Section>
            </div>{" "}
            <div className="flex items-center justify-center w-full lg:w-1/2">
              <Section delay={0.3}>
                <Image
                  // isBlurred
                  src={author.src}
                  alt="NextUI Album Cover"
                  className="mt-2"
                />
              </Section>
            </div>
          </div>
        </div>
      </div>

      <Section delay={0.5}>
        <div className="p-8 mx-auto xl:px-0 flex w-full flex-col mt-4 items-center justify-center text-center">
          <div className="flex w-full flex-col mt-4 items-center justify-center text-center">
            <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
              Astro benefit
            </div>
            <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
              Everything you need to start a website
            </h2>
            <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
              Astro optimizes your website like no other framework can. Leverage
              Astro&quot;s unique zero-JS frontend architecture to unlock higher
              conversion rates with better SEO.
            </p>
          </div>
        </div>
      </Section>

      <Section delay={0.8}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16 max-w-screen-xl mx-auto md:px-5">
          <div className="flex gap-4 items-start">
            <div className="mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-7 w-7 text-indigo-600"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
                <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                Bring Your Own Framework
              </h3>{" "}
              <p className="max-w-2xl py-4 text-md leading-normal text-gray-500  dark:text-gray-300">
                Build your site using React, Svelte, Vue, Preact, web
                components, or just plain ol&quot; HTML + JavaScript.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-7 w-7 text-indigo-600"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm18 3H3.75v9a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V9zm-15-3.75A.75.75 0 004.5 6v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H5.25zm1.5.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V6zm3-.75A.75.75 0 009 6v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H9.75z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">100% Static HTML, No JS</h3>{" "}
              <p className="max-w-2xl py-4 text-md leading-normal text-gray-500  dark:text-gray-300">
                Astro renders your entire page to static HTML, removing all
                JavaScript from your final build by default.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-7 w-7 text-indigo-600"
              >
                <path
                  fillRule="evenodd"
                  d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM9.75 17.25a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zm2.25-3a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-5.25z"
                  clipRule="evenodd"
                />
                <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">On-Demand Components</h3>{" "}
              <p className="max-w-2xl py-4 text-md leading-normal text-gray-500  dark:text-gray-300">
                Need some JS? Astro can automatically hydrate interactive
                components when they become visible on the page.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-7 w-7 text-indigo-600"
              >
                <path
                  fillRule="evenodd"
                  d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Broad Integration</h3>{" "}
              <p className="max-w-2xl py-4 text-md leading-normal text-gray-500  dark:text-gray-300">
                Astro supports TypeScript, Scoped CSS, CSS Modules, Sass,
                Tailwind, Markdown, MDX, and any other npm packages.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-7 w-7 text-indigo-600"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zm1.5 0v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5A.375.375 0 003 5.625zm16.125-.375a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5A.375.375 0 0021 7.125v-1.5a.375.375 0 00-.375-.375h-1.5zM21 9.375A.375.375 0 0020.625 9h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zM4.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5zM3.375 15h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h1.5a.375.375 0 00.375-.375v-1.5A.375.375 0 004.875 9h-1.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375zm4.125 0a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">SEO Enabled</h3>{" "}
              <p className="max-w-2xl py-4 text-md leading-normal text-gray-500  dark:text-gray-300">
                Automatic sitemaps, RSS feeds, pagination and collections take
                the pain out of SEO and syndication. It just works!
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-7 w-7 text-indigo-600"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Community</h3>{" "}
              <p className="max-w-2xl py-4 text-md leading-normal text-gray-500  dark:text-gray-300">
                Astro is an open source project powered by hundreds of
                contributors making thousands of individual contributions.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section delay={1}>
        <Footer />
      </Section>
    </>
  );
}
