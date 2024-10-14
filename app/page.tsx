"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Home, Search, Heart } from "lucide-react";

const menuItems = [
  { name: "Home", icon: Home, href: "/", bg: "bg-gray-800" },
  { name: "Search", icon: Search, href: "/search", bg: "bg-green-800" },
  { name: "Favorites", icon: Heart, href: "/favorites", bg: "bg-red-800" },
];

export default function HomePage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="h-screen flex">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{
            flex: 1,
          }}
          className={`flex-1 flex items-center justify-center cursor-pointer ${item.bg}`}
          animate={{
            flex: hoveredIndex === index ? 2 : 1,
          }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <motion.div className="text-white text-center">
            <motion.div
              animate={{
                scale: hoveredIndex === index ? 1.1 : 1,
                rotate: hoveredIndex === index ? 360 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 10,
              }}
            >
              <item.icon className="w-16 h-16 mb-4 mx-auto" />
            </motion.div>
            {hoveredIndex === index && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.33 }}
                className="text-2xl font-bold"
              >
                {item.name}
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
