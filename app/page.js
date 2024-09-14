import { Button } from "@/components/ui/button";
import Image from "next/image";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div className="">
      <h1 className="flex items-center justify-center"></h1>
        <Dashboard />
    </div>
  );
}
