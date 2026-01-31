import { externalNavLinks, internalNavLinks } from "../../lib/data";
import AudioPlayer from "../components/audio-player";
import SocialsNavbar from "./socials-navbar";
import InternalNavbar from "./internal-navbar";

export default function Footer() {
  return (
    <footer
      className="w-full grow flex flex-col justify-end items-center py-4"
    >
      <article className="hidden sm:block">
        <InternalNavbar links={internalNavLinks} />
      </article>
      <div className="w-full px-8 flex flex-col justify-center items-center sm:items-end sm:grid sm:grid-cols-3 sm:justify-between">
        <article className="justify-self-start">
          <SocialsNavbar links={externalNavLinks} />
        </article>
        <article>
          <hr className="my-3 border-slate-500" />
          <div className="flex flex-col justify-center items-center text-slate-500">
            <small>Designed by Mark Satin</small>
            <small>&copy; 2026</small>
          </div>
        </article>
        <article className="hidden sm:block sm:justify-self-end">
          <AudioPlayer />
        </article>
      </div>
    </footer>
  );
}
