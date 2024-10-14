import { ModeToggle } from "@/components/theme-selector";

export default function HomePage() {
  return (
    <>
      <div className="container relative h-screen md:flex md:flex-row lg:grid lg:max-w-full lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium gap-6">
            <ModeToggle />
            <div className="flex flex-col w-12"></div>
          </div>
          <div className="relative z-20 mt-auto"></div>
        </div>
      </div>
    </>
  );
}
