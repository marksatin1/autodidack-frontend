import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="text-center tracking-wider text-4xl font-bold logo trackLetters sm:text-white sm:hover:text-amber-500">
        Autodidack
      </h1>
    </Link>
  );
}
