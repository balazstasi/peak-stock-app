"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Home, Search, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const menuItems = [
  { name: "Home", icon: Home, href: "/", bg: "bg-green-900" },
  { name: "Search", icon: Search, href: "/search", bg: "bg-blue-900" },
  { name: "Favorites", icon: Heart, href: "/favorites", bg: "bg-red-900" },
];

export default function HomePage() {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      setExpandedIndex(isMobileView ? 1 : -1); // Set Search as initially focused on mobile
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleItemClick = (index: number) => {
    setExpandedIndex(index);
    // Uncomment the following line to enable navigation
    // router.push(menuItems[index].href);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={false}
          animate={{
            flex:
              expandedIndex === index
                ? isMobile
                  ? 8
                  : 4 // Larger size for focused item on desktop
                : isMobile
                ? 1
                : 1,
            height: isMobile ? (expandedIndex === index ? "auto" : "60px") : "auto",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={() => handleItemClick(index)}
          className={`
            flex items-center justify-center cursor-pointer ${item.bg}
            ${isMobile && expandedIndex !== index ? "fixed left-0 right-0 z-10" : ""}
            ${isMobile && index === 0 ? "top-0" : ""}
            ${isMobile && index === 2 ? "bottom-0" : ""}
          `}
        >
          <motion.div
            className="text-white text-center flex flex-col items-center justify-center"
            animate={{
              scale: expandedIndex === index ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <item.icon
              className={`
              ${isMobile && expandedIndex !== index ? "w-6 h-6" : "w-12 h-12"}
              mb-2
            `}
            />
            {(!isMobile || expandedIndex === index) && (
              <span
                className={`
                font-bold
                ${isMobile && expandedIndex !== index ? "text-xs" : "text-xl"}
              `}
              >
                {item.name}
              </span>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
