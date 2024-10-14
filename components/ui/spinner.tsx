import { CircleIcon } from "@radix-ui/react-icons";

export function Spinner({ className }: { className?: string }) {
  return <CircleIcon className={`h-4 w-4 animate-pulse bg-primary ${className}`} />;
}
