import Features from "@/components/features";
import Footer from "@/components/footer";
import { CardBody, CardContainer, CardItem } from "@/components/global/3d-card";
import { HeroParallax } from "@/components/global/connect-parallax";
import { ContainerScroll } from "@/components/global/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import { LampComponent } from "@/components/global/lamp";
import { WaitlistForm } from "@/components/join-waitlist";
import { Navbar } from "@/components/navbar";
import PricingTable from "@/components/pricing-table";
import { Button } from "@/components/ui/button";
import { clients, products } from "@/lib/constant";
import { CheckIcon } from "lucide-react";
import { Link } from "next-view-transitions";

const HomePage = () => {
  return (
    <main className="flex items-center justify-center flex-col">
      <Navbar />
      <section className=" md:mt-8 w-screen h-full  bg-neutral-950 rounded-md  !overflow-visible relative flex flex-col items-center  antialiased">
        {/* <div className="absolute inset-0  h-full w-full items-center px-5 py-24 "></div> */}
        <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col">
                <h1 className="text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Automate Your Work With Flowforge
                </h1>
              </div>
            }
          />
        </div>
      </section>

      {/* <InfiniteMovingCards
        className="md:mt-[32rem] mt-[-100px] w-screen"
        items={clients}
        direction="right"
        speed="normal"
      /> */}

      <Link
        href="/dashboard"
        className="relative inline-flex h-20 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-lg  font-medium text-white backdrop-blur-3xl">
          Go to playground
        </span>
      </Link>
      <section className="w-screen h-screen">
        <HeroParallax products={products}></HeroParallax>
      </section>

      <section className="w-screen">
        <Features />
      </section>

      <section className="flex  flex-col items-center  mb-12 w-full">
        <h1 className="text-5xl md:text-6xl  bg-clip-text text-transparent h-20 bg-gradient-to-b from-white to-neutral-600 font-sans font-bold my-8">
          Pricing
        </h1>
        <PricingTable />
      </section>
    </main>
  );
};

export default HomePage;
