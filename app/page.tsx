import AirtelDaschboardSection from "@/components/AirtelDaschboardSection copy";
import Divider from "@/components/Divider";
import LinkCard from "@/components/LinkCard";
import MTNDaschboardSection from "@/components/MTNDaschboardSection";
import Image from "next/image";

export default function Dashboard() {
  return (
    <>
      <div className="flex-1 w-full">
        <h1>MTN MOBILE MONEY</h1>
        <MTNDaschboardSection />

        <Divider />

        <h1>Airtel MONEY</h1>
        <AirtelDaschboardSection />

      </div>
    </>
  );
}
