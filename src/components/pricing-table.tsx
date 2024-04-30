"use client";

import { useState } from "react";

interface PricingTabProps {
  yearly: boolean;
  popular?: boolean;
  planName: string;
  price: {
    monthly: number;
    yearly: number;
  };
  planDescription: string;
  features: string[];
}

function PricingTab(props: PricingTabProps) {
  return (
    <div className={`h-full ${props.popular ? "dark" : ""}`}>
      <div className="relative flex flex-col h-fit p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-900 shadow shadow-neutral-950/5">
        {props.popular && (
          <div className="absolute top-0 right-0 mr-6 -mt-4">
            <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-emerald-500 text-white rounded-full shadow-sm shadow-neutral-950/5">
              Most Popular
            </div>
          </div>
        )}
        <div className="mb-5">
          <div className="text-neutral-900 dark:text-neutral-200 font-semibold mb-1">
            {props.planName}
          </div>
          <div className="inline-flex items-baseline mb-2">
            <span className="text-neutral-900 dark:text-neutral-200 font-bold text-3xl">
              $
            </span>
            <span className="text-neutral-900 dark:text-neutral-200 font-bold text-4xl">
              {props.yearly ? props.price.yearly : props.price.monthly}
            </span>
            <span className="text-neutral-500 font-medium">/mo</span>
          </div>
          <div className="text-sm text-neutral-500 mb-5">
            {props.planDescription}
          </div>
          <a
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-cyan-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-cyan-950/10 hover:bg-cyan-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-cyan-300 dark:focus-visible:ring-neutral-600 transition-colors duration-150"
            href="#0"
          >
            Purchase Plan
          </a>
        </div>
        <div className="text-neutral-900 dark:text-neutral-200 font-medium mb-3">
          Includes:
        </div>
        <ul className="text-neutral-600 dark:text-neutral-400 text-sm space-y-3 grow">
          {props.features.map((feature, index) => {
            return (
              <li key={index} className="flex items-center">
                <svg
                  className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>{feature}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function PricingTable() {
  const [yearly, setYearly] = useState<boolean>(true);

  return (
    <div>
      {/* Pricing toggle */}
      <div className="flex justify-center max-w-[14rem] m-auto mb-8 lg:mb-16">
        <div className="relative flex w-full p-1 bg-white dark:bg-neutral-900 rounded-full">
          <span
            className="absolute inset-0 m-1 pointer-events-none"
            aria-hidden="true"
          >
            <span
              className={`absolute inset-0 w-1/2 bg-cyan-500 rounded-full shadow-sm shadow-cyan-950/10 transform transition-transform duration-150 ease-in-out ${
                yearly ? "translate-x-0" : "translate-x-full"
              }`}
            ></span>
          </span>
          <button
            className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-cyan-300 dark:focus-visible:ring-neutral-600 transition-colors duration-150 ease-in-out ${
              yearly ? "text-white" : "text-neutral-500 dark:text-neutral-400"
            }`}
            onClick={() => setYearly(true)}
            aria-pressed={yearly}
          >
            Yearly{" "}
            <span
              className={`${
                yearly
                  ? "text-cyan-200"
                  : "text-neutral-400 dark:text-neutral-500"
              }`}
            >
              -20%
            </span>
          </button>
          <button
            className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-cyan-300 dark:focus-visible:ring-neutral-600 transition-colors duration-150 ease-in-out ${
              yearly ? "text-neutral-500 dark:text-neutral-400" : "text-white"
            }`}
            onClick={() => setYearly(false)}
            aria-pressed={yearly}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
        {/* Pricing tab 1 */}
        <PricingTab
          yearly={yearly}
          planName="Essential"
          price={{ yearly: 29, monthly: 35 }}
          planDescription="There are many variations available, but the majority have suffered."
          features={[
            "Unlimited placeholder texts",
            "Consectetur adipiscing elit",
            "Excepteur sint occaecat cupidatat",
            "Officia deserunt mollit anim",
          ]}
        />

        {/* Pricing tab 2 */}
        <PricingTab
          yearly={yearly}
          popular={true}
          planName="Perform"
          price={{ yearly: 49, monthly: 55 }}
          planDescription="There are many variations available, but the majority have suffered."
          features={[
            "Unlimited placeholder texts",
            "Consectetur adipiscing elit",
            "Excepteur sint occaecat cupidatat",
            "Officia deserunt mollit anim",
            "Predefined chunks as necessary",
          ]}
        />

        {/* Pricing tab 3 */}
        <PricingTab
          yearly={yearly}
          planName="Enterprise"
          price={{ yearly: 79, monthly: 85 }}
          planDescription="There are many variations available, but the majority have suffered."
          features={[
            "Unlimited placeholder texts",
            "Consectetur adipiscing elit",
            "Excepteur sint occaecat cupidatat",
            "Officia deserunt mollit anim",
            "Predefined chunks as necessary",
            "Free from repetition",
          ]}
        />
      </div>
    </div>
  );
}
