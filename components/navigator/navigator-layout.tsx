"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { Home, Search, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { name: "Home", icon: Home, href: "/", bg: "bg-slate-400" },
  { name: "Search", icon: Search, href: "/stocks/symbol/search", bg: "bg-slate-600" },
  { name: "Favorites", icon: Heart, href: "/stocks/favorites", bg: "bg-slate-800" },
];

interface NavigatorLayoutProps {
  children: ReactNode;
}

export function NavigatorLayout({ children }: NavigatorLayoutProps) {
  const pathname = usePathname();
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  useEffect(() => {
    const getMenuIndex = (pathname: string) => {
      if (pathname === "/") {
        return 0;
      }
      if (pathname.includes("favorites")) {
        return 2;
      }
      return 1;
    };
    const currentIndex = getMenuIndex(pathname);
    setExpandedIndex(currentIndex);
  }, [pathname]);

  return (
    <div className="sm:h-full md:h-screen flex flex-col md:flex-row">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={false}
          animate={{
            flex: expandedIndex === index ? 5 : 0.5,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`
            flex items-center justify-center cursor-pointer ${item.bg}
            ${expandedIndex !== index ? "overflow-hidden" : ""}
          `}
        >
          {expandedIndex === index ? (
            <div className="w-full h-full overflow-auto flex justify-center">
              <div className="max-w-3xl w-full">{children}</div>
            </div>
          ) : (
            <Link
              href={item.href}
              className="text-white text-center flex flex-col items-center justify-center"
            >
              <item.icon className="w-8 h-8" />
              <span className="mt-2">{item.name}</span>
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  );
}
