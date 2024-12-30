"use client";
// components/SearchInput.tsx
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
    <div className="relative w-[100%] max-w-md mx-auto h-50">
      <Input
        type="text"
        placeholder="Search users..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        className="p-3 rounded-lg w-[100%] bg-dark-4 text-light-1 border-none"
      />
    </div>
  );
}