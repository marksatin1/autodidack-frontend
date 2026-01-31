import { getOnePhoto, getPageMetadata } from "../lib/actions";
import CardTilt from "../ui/components/card-tilt";
import { Metadata } from "next";
import AboutCard from "../ui/components/about-card";
import ContactCard from "../ui/components/contact-card";
import Head from "next/head";

export async function generateMetadata(): Promise<Metadata> {
  const infoPage = await getPageMetadata(18);

  return {
    title: `Autodidack | ${infoPage[0].name.replace("-", " ")}`,
    description: infoPage[0].description,
    keywords: infoPage[0].keywords,
  };
}

export default async function Page() {
  const waterfallReversed = await getOnePhoto(534);
  const waterfallOriginal = await getOnePhoto(535);
  const profileBanner = await getOnePhoto(552);

  return (
    <>
      <Head>
        <title>Autodidack | Info</title>
        <meta property="og:title" name="title" content="Autodidack | Info" />
        <meta
          property="og:description"
          name="description"
          content="About and Contact sections for Autodidack / Mark Satin."
        />
        <meta property="og:author" name="author" content="Mark Satin" />
      </Head>
      <section className="w-full h-full px-4 sm:px-8 ld:px-16 flex justify-center items-center gap-x-4 sm:gap-x-12 md:gap-x-24">
        <CardTilt>
          <AboutCard bgImage={waterfallReversed!} />
        </CardTilt>
        <CardTilt>
          <ContactCard bgImage={waterfallOriginal!} bannerImage={profileBanner!} />
        </CardTilt>
      </section>
    </>
  );
}
