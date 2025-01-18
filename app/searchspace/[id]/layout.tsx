"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ShineBorder from "@/components/ui/shine-border";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconMenu2,
  IconRotate,
  IconX,
  IconArrowNarrowLeft,
  IconFileSearch,
  IconCloudUpload,
} from "@tabler/icons-react";
import { Logo } from "@/components/Logo";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ModeToggle } from "@/components/homepage/theme-toggle";
import { LogOut, Mic } from "lucide-react";

interface ParamsProps {
  id: number
}

export default function SidebarLayout({
  params: { id },
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
  params: ParamsProps
}) {

  const [searchspace, setSearchSpace] = useState<string>("")

  useEffect(() => {
    const getSearchSpace = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/${token}/searchspace/${id}/`, { method: 'GET' })

        if (!response.ok) {
          throw new Error("Token verification failed");
        } else {
          const res = await response.json();
          setSearchSpace(res.name)
        }
      } catch (error) {
        window.localStorage.removeItem("token");
        router.push("/login");
      }
    }
    getSearchSpace()
  }, []);

  const primaryLinks = [
    {
      label: "Chat",
      href: `/searchspace/${id}`,
      icon: (
        <IconBrandTabler className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />

      ),
    },
    {
      label: "Documents",
      href: `/searchspace/${id}/documents`,
      icon: (
        <IconFileSearch className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Upload Files",
      href: `/searchspace/${id}/upload`,
      icon: (
        <IconCloudUpload className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Podcasts",
      href: `/searchspace/${id}/podcasts`,
      icon: (
        <Mic className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      )
    },
    {
      label: "Chat History",
      href: `/searchspace/${id}/chat/history`,
      icon: (
        <IconRotate className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      )
    },

  ];
  //@ts-ignore
  const secondaryLinks: any[] = [
    {
      label: "All SearchSpaces",
      href: "/searchspace",
      icon: (
        <IconArrowLeft className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },

  ];
  const [open, setOpen] = useState(true);
  const { toast } = useToast()
  const router = useRouter();
  const logOut = () => {
    window.localStorage.removeItem('token');
    toast({
      title: "Logged Out Successfully",
    })
    router.push('/');
  }

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700 bg-gray-100 dark:bg-black md:flex-row",
        "h-screen",
        className,
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col">
              {primaryLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}

            </div>
            <div className="mt-4">
              <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="h-px w-full bg-white dark:bg-neutral-900"></div>
            </div>
            <div className="mt-4 flex flex-col">
              {secondaryLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}

              <div
                onClick={() => logOut()}
                className={cn(
                  "group/sidebar flex items-center justify-start gap-2 rounded-sm px-2 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 ",
                  className,
                )}

              >
                <LogOut className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />

                <motion.span
                  animate={{
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                  }}
                  className="!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-700 transition duration-150 dark:text-neutral-200"
                >
                  Log Out
                </motion.span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            {searchspace && open && (
              <div className="w-full bg-background border-alpha-400 flex flex-col gap-2 rounded-lg border p-3 drop-shadow-sm transition-[transform,border] hover:-translate-y-0.5 hover:border-gray-300 hover:drop-shadow-md">
                <span className="flex items-center justify-between text-gray-500">
                  <h5 className="text-[13px] font-medium">Search Space</h5>
                </span>
                <p className="text-sm">
                  {searchspace}
                </p>
              </div>

            )}
            <ModeToggle />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="/icon-128.png"
        className="rounded-full"
        alt="logo"
        width={30}
        height={30}
      />
    </Link>
  );
};


interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen } = useSidebar();
  return (
    <motion.div
      className={cn(
        "group/sidebar-btn relative m-2 hidden h-full w-[300px] flex-shrink-0 rounded-xl bg-white px-4 py-4 dark:bg-neutral-900 md:flex md:flex-col",
        className,
      )}
      animate={{
        width: open ? "300px" : "70px",
      }}
      {...props}
    >
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "absolute -right-2 top-4 z-40 hidden h-5 w-5 transform items-center justify-center rounded-sm border border-neutral-200 bg-white transition duration-200 group-hover/sidebar-btn:flex dark:border-neutral-700 dark:bg-neutral-900",
          open ? "rotate-0" : "rotate-180",
        )}
      >
        <IconArrowNarrowLeft className="text-black dark:text-white" />
      </button>
      {children as React.ReactNode}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen } = useSidebar();
  return (
    <motion.div
      className={cn(
        "flex h-10 w-full flex-row items-center justify-between bg-neutral-100 px-4 py-4 dark:bg-neutral-800 md:hidden",
      )}
      {...props}
    >
      <div className="z-20 flex w-full justify-end">
        <IconMenu2
          className="text-neutral-800 dark:text-neutral-200"
          onClick={() => setOpen(!open)}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed inset-0 z-[100] flex h-full w-full flex-col justify-between bg-white p-10 dark:bg-neutral-900",
              className,
            )}
          >
            <div
              className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
              onClick={() => setOpen(!open)}
            >
              <IconX />
            </div>
            {children as React.ReactNode}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "group/sidebar flex items-center justify-start gap-2 rounded-sm px-2 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700",
        className,
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: open ? "inline-block" : "none",
          opacity: open ? 1 : 0,
        }}
        className="!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-700 transition duration-150 dark:text-neutral-200"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
