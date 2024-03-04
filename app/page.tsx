import LinkCard from "@/components/LinkCard";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Test Mobile Money Payment APIs
        </p>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-yellow-200 after:via-red-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-yellow-700 before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[yellow] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-3xl font-black">MOBILE MONEY PAYMENT.</h1>
      </div>

      <div className="mb-32 gab-5 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <LinkCard 
          href="/mtn"
          title="MTN MOMO"
          details="Make payment using the MTN Mobile Money API."
          color="yellow"
          />

        <LinkCard 
          href="/airtel"
          title="Airtel Money"
          details="Make payment using the Airtel Money API."
          color="red"
          />

      </div>
    </>
  );
}
