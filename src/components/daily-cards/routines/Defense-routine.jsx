import { DefenseRouCard } from "./Defenserou-card";
import Tipgenerator2 from "./Tipgenerator2";
const Title3 = () => {
  return (
    <div className="text-xs text-white">
      <h1 className="font-bold px-10 py-10 flex md:top-40 md:absolute md:px-10 md:py-0">
        DEFENSE PRACTICE
      </h1>
    </div>
  );
};

export const Defense = () => {
  return (
    <div className="space-y-10">
      <Title3 />
      <a
        href="/dailyroutine"
        className="md:top-36 md:absolute md:px-10 hidden md:block right-0"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_4137_3966)">
            <path
              d="M21 12L3 12M3 12L9 5M3 12L9 19"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_4137_3966">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </a>
      <div className="">
        <DefenseRouCard />
        <Tipgenerator2 />
      </div>
    </div>
  );
};
