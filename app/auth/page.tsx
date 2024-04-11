import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

export default function Home() {
  return (
    <main className="space-y-6 text-center">
      <h1
        className={cn(
          "text-6xl font-semibold text-black drop-shadow-md",
          font.className
        )}
      >
        🔐 Auth
      </h1>
      <p className="text-black text-lg">Authentication service for Kre8tive</p>
    </main>
  );
}
