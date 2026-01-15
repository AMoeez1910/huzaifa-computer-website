"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function AdminNavbar() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-10xl w-full mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/admin/dashboard" className="relative">
          <Image
            src="/images/logo/hc-logo.png"
            alt="Logo"
            width={68}
            height={68}
            className="object-contain"
          />
          <p className="text-sm text-primary absolute top-0 left-full whitespace-nowrap">Admin Panel</p>
        </Link>
        <div className="flex gap-3">
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
        </div>
      </div>
    </header>
  );
}
