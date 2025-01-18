"use client";
import { animate, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GoCopilot } from "react-icons/go";

export function SearchSpaceCard({ name, description }: { name: string, description: string }) {
  return (
    <Card>
      <CardSkeletonContainer>
        <Skeleton />
      </CardSkeletonContainer>
      <CardTitle>{name}</CardTitle>
      <CardDescription>
        {description}
      </CardDescription>
    </Card>
  );
}

const Skeleton = () => {
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [
      ".circle-1",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-2",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-3",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-4",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-5",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    // @ts-ignore
    animate(sequence, {
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);
  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
        <Container className="h-8 w-8 circle-1">
          <LogoFour className="h-4 w-4 " />
        </Container>
        <Container className="h-12 w-12 circle-2">
          <LogoOne className="h-6 w-6 dark:text-white" />
        </Container>
        <Container className="circle-3">
          <LogoTwo className="h-8 w-8 dark:text-white" />
        </Container>
        <Container className="h-12 w-12 circle-4">
          <LogoThree className="h-6 w-6 " />
        </Container>
        <Container className="h-8 w-8 circle-5">
          <LogoFour className="h-4 w-4 " />
        </Container>
      </div>

      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};
const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-black dark:bg-white"
        ></motion.span>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-gray-800 dark:text-white py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-neutral-600 dark:text-neutral-400 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-[15rem] md:h-[20rem] rounded-xl z-40",
        className,
        showGradient &&
        "bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
      )}
    >
      {children}
    </div>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
        className
      )}
    >
      {children}
    </div>
  );
};

export const LogoOne = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
    >
      <circle cx="256" cy="256" r="256" fill="#A2DFE9"></circle>
      <path fill="#CCC" d="M168 456h176v8H168z"></path>
      <path fill="#ADADAD" d="M312 456H200l8-56h96z"></path>
      <path
        fill="#CCC"
        d="M448 360v32c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-32z"
      ></path>
      <path id="SVGCleanerId_0" fill="#FFF" d="M80 120h352v224H80z"></path>
      <path
        fill="#3B3B3B"
        d="M440 104H72c-4.4 0-8 3.6-8 8v248h384V112c0-4.4-3.6-8-8-8m-8 240H80V120h352z"
      ></path>
      <path id="SVGCleanerId_0_1_" fill="#FFF" d="M80 120h352v224H80z"></path>
      <path fill="#A2DFE9" d="M136 144h240v96H136z"></path>
      <g fill="#CCC">
        <path d="M272 264h104v56H272zM136 264h112v56H136z"></path>
      </g>
    </svg>
  );
};

export const LogoTwo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="_x35_"
      version="1.1"
      viewBox="0 0 512 512"
    >
      <path
        fill="#B12A27"
        d="M475.435 117.825V512H47.791V.002h309.822l54.878 54.879z"
      ></path>
      <path fill="#F2F2F2" d="M36.565 34.295h205.097v91.768H36.565z"></path>
      <g fill="#B12A27">
        <path d="M110.132 64.379c-.905-2.186-2.111-4.146-3.769-5.804a17.4 17.4 0 0 0-6.031-3.92c-2.412-.98-5.126-1.432-8.141-1.432h-22.54v58.195h11.383V89.481h11.157c3.015 0 5.729-.452 8.141-1.432a17.4 17.4 0 0 0 6.031-3.92c1.659-1.658 2.865-3.543 3.769-5.804a19.5 19.5 0 0 0 1.282-6.935 19.7 19.7 0 0 0-1.282-7.011M97.844 77.118c-1.508 1.432-3.618 2.186-6.181 2.186H81.034V63.323h10.629c2.563 0 4.674.754 6.181 2.261 1.432 1.432 2.186 3.392 2.186 5.804.001 2.338-.753 4.298-2.186 5.73M164.558 75.761c-.075-2.035-.151-3.844-.377-5.503a21.6 21.6 0 0 0-1.131-4.598c-.528-1.357-1.206-2.714-2.111-3.92-2.035-2.94-4.523-5.126-7.312-6.483-2.865-1.357-6.257-2.035-10.252-2.035h-20.956v58.195h20.956c3.995 0 7.387-.678 10.252-2.035 2.789-1.357 5.277-3.543 7.312-6.483.905-1.206 1.583-2.563 2.111-3.92.528-1.432.905-2.94 1.131-4.598s.301-3.468.377-5.503c.075-1.96.075-4.146.075-6.558s0-4.599-.075-6.559M153.175 88.2c0 1.734-.151 3.091-.302 4.297-.151 1.131-.377 2.186-.678 2.94-.301.829-.754 1.583-1.281 2.261-1.885 2.412-4.749 3.543-8.518 3.543h-8.669V63.323h8.669c3.769 0 6.634 1.206 8.518 3.618.528.678.98 1.357 1.281 2.186s.528 1.809.678 3.015c.151 1.131.302 2.563.302 4.221.075 1.659.075 3.694.075 5.955.001 2.263.001 4.223-.075 5.882M213.18 63.323V53.222h-38.37v58.195h11.383V87.823h22.992V77.646h-22.992V63.323z"></path>
      </g>
      <path
        fill="#B12A27"
        d="M110.132 64.379c-.905-2.186-2.111-4.146-3.769-5.804a17.4 17.4 0 0 0-6.031-3.92c-2.412-.98-5.126-1.432-8.141-1.432h-22.54v58.195h11.383V89.481h11.157c3.015 0 5.729-.452 8.141-1.432a17.4 17.4 0 0 0 6.031-3.92c1.659-1.658 2.865-3.543 3.769-5.804a19.5 19.5 0 0 0 1.282-6.935 19.7 19.7 0 0 0-1.282-7.011M97.844 77.118c-1.508 1.432-3.618 2.186-6.181 2.186H81.034V63.323h10.629c2.563 0 4.674.754 6.181 2.261 1.432 1.432 2.186 3.392 2.186 5.804.001 2.338-.753 4.298-2.186 5.73"
      ></path>
      <path
        fill="#040000"
        d="M475.435 117.825V512H47.791v-92.419l199.914-199.914 11.835-11.835 6.558-6.559 10.931-10.93 12.966-12.966L412.491 54.881z"
        opacity="0.08"
      ></path>
      <path fill="#771B1B" d="M475.435 117.836H357.599V0z"></path>
      <path
        fill="#F2F2F2"
        d="M414.376 370.658c-2.488-4.372-5.88-8.518-10.101-12.287-3.467-3.166-7.538-6.106-12.137-8.82-18.544-10.93-45.003-16.207-80.961-16.207h-3.618c-1.96-1.809-3.995-3.618-6.106-5.503-13.644-12.287-24.499-25.63-32.942-40.48 16.584-36.561 24.499-69.126 23.519-96.867q-.226-7.01-2.035-13.117c-1.809-6.558-4.824-12.363-9.046-17.112l-.151-.151c-6.709-7.538-16.056-11.835-25.555-11.835-9.574 0-18.393 4.146-24.801 11.76-6.332 7.538-9.724 17.866-9.875 30.002-.226 18.544 1.281 36.108 4.448 52.315.301 1.282.528 2.563.829 3.844 3.166 14.7 7.84 28.645 13.87 41.611-7.086 14.398-14.247 26.836-19.223 35.279-3.769 6.408-7.915 13.117-12.212 19.826-19.373 3.468-35.807 7.689-50.129 12.966-19.373 7.011-34.902 16.056-46.059 26.836-7.237 6.935-12.137 14.323-14.549 22.012-2.563 7.915-2.412 15.83.452 22.916 2.638 6.558 7.387 12.061 13.72 15.83 1.508.905 3.091 1.658 4.749 2.337 4.825 1.96 10.101 3.015 15.604 3.015 12.74 0 25.856-5.503 36.937-15.378 20.655-18.469 41.988-48.169 54.577-66.94 10.327-1.583 21.559-2.94 34.224-4.297 14.926-1.508 28.118-2.412 40.104-2.865q5.541 4.976 10.629 9.498c18.846 16.81 33.168 28.947 46.134 37.465 0 .075.075.075.151.075 5.126 3.392 10.026 6.181 14.926 8.443 5.503 2.563 11.081 3.92 16.81 3.92 7.237 0 14.021-2.186 19.675-6.181 5.729-4.146 9.875-10.101 11.76-16.81 2.186-8.064.905-17.034-3.618-25.1M247.705 219.667c-1.055-9.348-1.508-19.072-1.357-29.324.151-9.724 3.694-16.283 8.895-16.283 3.92 0 8.066 3.543 9.95 10.327.528 2.035.905 4.372.98 7.01.151 3.166.075 6.483-.075 9.875-.452 9.574-2.111 19.75-4.975 30.681q-2.6 10.517-6.784 21.936c-3.166-10.703-5.428-22.086-6.634-34.222M121.967 418.073c-1.282-3.166.151-9.272 7.991-16.81 11.986-11.458 30.756-20.504 56.914-27.364a358 358 0 0 1-14.624 18.619c-7.237 8.744-14.172 16.132-20.429 21.71-5.352 4.824-11.232 7.84-16.81 8.594q-1.47.226-2.94.226c-4.901.001-8.896-1.959-10.102-4.975m120.461-80.131.528-.829-.829.151c.151-.377.377-.754.603-1.055 3.166-5.352 7.161-12.212 11.458-20.127l.377.829.98-2.035c3.166 4.523 6.634 8.971 10.252 13.267 1.734 2.035 3.543 3.995 5.352 5.955l-1.206.075 1.055.98c-3.091.226-6.332.528-9.574.829-2.035.226-4.146.377-6.257.603-4.371.452-8.668.905-12.739 1.357m126.869 47.038c-8.971-5.729-18.996-13.795-31.359-24.575 17.564 1.809 31.359 5.654 41.159 11.383 4.297 2.488 7.538 5.051 9.724 7.538 3.618 3.844 4.9 7.312 4.221 9.649-.603 2.337-3.241 3.92-6.483 3.92-1.885 0-3.844-.452-5.88-1.432-3.468-1.658-7.086-3.694-10.93-6.181-.151 0-.301-.151-.452-.302"
      ></path>
    </svg>
  );
};
export const LogoThree = ({ className }: { className?: string }) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="800"
    height="800"
    viewBox="0 0 24 24"
  >
    <defs>
      <path
        id="image-a"
        d="M4 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4M.498 15l3.578-4.242 1.944 1.515 7.43-9.754L16 5.457V15z"
      ></path>
      <path
        id="image-c"
        d="M18 6.973V2H2v13.548l4.049-5.131a1 1 0 0 1 1.487-.093l2.009 1.983 5.33-6.989a1 1 0 0 1 1.53-.072zm0 2.948-2.257-2.443-5.297 6.945a1 1 0 0 1-1.497.106l-2.022-1.996L2.613 18H18zM2 0h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
      ></path>
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(2 2)">
      <g transform="translate(3 4)">
        <mask id="image-b" fill="#fff">
          <use xlinkHref="#image-a"></use>
        </mask>
        <use xlinkHref="#image-a" fill="#D8D8D8"></use>
        <g fill="#FFA0A0" mask="url(#image-b)">
          <path d="M-5-6h24v24H-5z"></path>
        </g>
      </g>
      <mask id="image-d" fill="#fff">
        <use xlinkHref="#image-c"></use>
      </mask>
      <use xlinkHref="#image-c" fill="#000" fillRule="nonzero"></use>
      <g fill="#7600FF" mask="url(#image-d)">
        <path d="M-2-2h24v24H-2z"></path>
      </g>
    </g>
  </svg>
  );
};

export const LogoFour = ({ className }: { className?: string }) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="800"
    fill="none"
    viewBox="0 0 48 48"
  >
    <path fill="#fff" fillOpacity="0.01" d="M0 0h48v48H0z"></path>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="M4 8h40"
    ></path>
    <path
      fill="#2F88FF"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="M8 8h32v26H8z"
      clipRule="evenodd"
    ></path>
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="m22 16 5 5-5 5"
    ></path>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="m16 42 8-8 8 8"
    ></path>
  </svg>
  );
};
