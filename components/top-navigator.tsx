"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const TopNavigator = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathToRender = pathname.split("/").pop()?.toUpperCase() || "HOME";

  return (
    <nav className="flex items-center justify-between p-4 bg-foreground text-background">
      <button onClick={() => router.back()} className="px-4 py- text-white rounded">
        <ArrowLeft
          width={32}
          height={32}
          color="white"
          className="hover:stroke-slate-400 active:stroke-slate-900 active:bg-background hover:border-slate-400 rounded-md"
        />
      </button>
      <div className="text-foreground">
        <Link href={pathname} className="text-background text-3xl hover:text-background/80">
          {pathToRender}
        </Link>
      </div>
      <button onClick={() => router.forward()} className="px-4 py- text-white rounded">
        <ArrowRight
          width={32}
          height={32}
          color="white"
          className="hover:stroke-slate-400 active:stroke-slate-900 active:bg-background hover:border-slate-400 rounded-md"
        />
      </button>
    </nav>
  );
};
