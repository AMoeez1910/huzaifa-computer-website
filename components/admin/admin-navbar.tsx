"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-10xl w-full mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/admin/dashboard" className="relative">
          <Image
            src="/images/logo/hc-logo.webp"
            alt="Logo"
            width={68}
            height={68}
            className="object-contain"
          />
          <p className="text-sm text-primary absolute top-0 left-full whitespace-nowrap">
            Admin Panel
          </p>
        </Link>
        <nav className="flex items-center gap-4">
  
          <Button
            asChild
            variant="outline"
            className="hover:bg-primary/10 hover:text-primary"
          >
            <Link href="/">View Store</Link>
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
}
