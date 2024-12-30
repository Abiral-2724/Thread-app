"use client";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState("");

  const handleSearch = async (term: string) => {
    setSearchText(term);
    
    const params = new URLSearchParams(searchParams);
    if (term) {
      await params.set("q", term);
    } else {
      await params.delete("q");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto h-12">
      <Input
        type="text"
        placeholder="Search users..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        className="p-3 rounded-lg w-full bg-dark-4 text-light-1 border-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
