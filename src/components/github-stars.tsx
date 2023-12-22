import React from "react";
import { Button } from "./ui/button";

function formatNumber(number: any) {
  const absNumber = Math.abs(number);

  if (absNumber >= 1e6) {
    return (number / 1e6).toFixed(1) + "M";
  } else if (absNumber >= 1e3) {
    return (number / 1e3).toFixed(1) + "k";
  } else {
    return number.toString();
  }
}

async function getStars() {
  const res = await fetch(
    "https://api.github.com/repos/triggerdotdev/trigger.dev"
  );
  const json = await res.json();
  return formatNumber(json.stargazers_count);
}

const GithubStars = async () => {
  //get the number of stars from github api
  const stars = await getStars();

  return (
    <a
      className="group outline-none w-fitgroup inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/triggerdotdev/trigger.dev"
    >
      <div className="text-center font-sans justify-center items-center shrink-0 transition duration-150 select-none group-focus:outline-none group-disabled:opacity-75 group-disabled:pointer-events-none bg-transparent hover:bg-slate-850 disabled:opacity-50 h-8 text-sm font-semibold rounded-[3px] hidden whitespace-nowrap p-2 lg:flex">
        <div className="justify-center flex w-full items-center gap-x-1">
          <svg
            className="h-4 text-bright transition group-disabled:text-dimmed/80 mr-0.5 shrink-0 justify-start"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_571_3822)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 0C5.37017 0 0 5.50708 0 12.306C0 17.745 3.44015 22.3532 8.20626 23.9849C8.80295 24.0982 9.02394 23.7205 9.02394 23.3881C9.02394 23.0935 9.01657 22.3229 9.00921 21.2956C5.67219 22.0359 4.96501 19.6487 4.96501 19.6487C4.41989 18.2285 3.63168 17.8508 3.63168 17.8508C2.54144 17.0878 3.71271 17.1029 3.71271 17.1029C4.91344 17.1936 5.55433 18.372 5.55433 18.372C6.62247 20.2531 8.36096 19.7092 9.04604 19.3919C9.15654 18.5987 9.46593 18.0548 9.80479 17.745C7.13812 17.4353 4.33886 16.3777 4.33886 11.6638C4.33886 10.3192 4.80295 9.2238 5.57643 8.36261C5.4512 8.05288 5.03867 6.79887 5.69429 5.1067C5.69429 5.1067 6.7035 4.77432 8.99447 6.36827C9.95212 6.09632 10.9761 5.96034 12 5.95279C13.0166 5.95279 14.0479 6.09632 15.0055 6.36827C17.2965 4.77432 18.3057 5.1067 18.3057 5.1067C18.9613 6.79887 18.5488 8.05288 18.4236 8.36261C19.1897 9.2238 19.6538 10.3192 19.6538 11.6638C19.6538 16.3928 16.8471 17.4278 14.1731 17.7375C14.6004 18.1152 14.9908 18.8706 14.9908 20.0189C14.9908 21.6657 14.9761 22.9877 14.9761 23.3957C14.9761 23.728 15.1897 24.1058 15.8011 23.9849C20.5672 22.3532 24 17.745 24 12.3135C24 5.50708 18.6298 0 12 0Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_571_3822">
                <rect width="24" height="24" fill="currentColor"></rect>
              </clipPath>
            </defs>
          </svg>
          <span className="hidden xl:block">Star</span>{" "}
          <span className="font-normal">{stars}</span>
        </div>
      </div>
    </a>
  );
};

export default GithubStars;
