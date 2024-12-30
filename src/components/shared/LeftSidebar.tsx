"use client";

import Link from "next/link";
import { sidebarLinks } from "../../constants";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, useAuth, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";


export default function LeftSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { signOut } = useClerk();
    const { userId, isLoaded } = useAuth();
    const [sidebarItems, setSidebarItems] = useState(sidebarLinks);

    useEffect(() => {
        if (isLoaded && userId) {
            setSidebarItems(
                sidebarLinks.map((link) => {
                    if (link.route === "/profile") {
                        return { ...link, route: `${link.route}/${userId}` };
                    }
                    return link;
                })
            );
        }
    }, [userId, isLoaded]);

    const handleSignOut = async () => {
        await signOut();
        router.push("/sign-in");
    };

    if (!isLoaded) {
        return (
            <div className="leftsidebar">
                <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <section className="custom-scrollbar leftsidebar flex flex-col h-full">
            <div className="flex flex-1 flex-col gap-6 px-6 mt-[-60]">
                <SignedIn>
                    <div className="flex flex-col gap-2">
                        {sidebarItems.map((link) => {
                            const isActive =
                                (pathname.includes(link.route) &&
                                    link.route.length > 1) ||
                                pathname === link.route;

                            return (
                                <Link
                                    key={link.label}
                                    href={link.route}
                                    className={`leftsidebar_link ${
                                        isActive && "bg-primary-500"
                                    }`}
                                >
                                    <Image
                                        src={link.imgURL}
                                        alt={link.label}
                                        width={24}
                                        height={24}
                                    />
                                    <p className="text-light-1 max-lg:hidden">
                                        {link.label}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </SignedIn>
            </div>
            <SignedIn>
                <div className="px-6 mb-6">
                    <div
                        className="flex cursor-pointer gap-4 p-4 hover:bg-primary-500/10 rounded-lg transition-all"
                        onClick={handleSignOut}
                    >
                        <Image
                            src="/assets/logout.svg"
                            alt="logout"
                            width={24}
                            height={24}
                        />
                        <p className="text-light-2 max-lg:hidden">Logout</p>
                    </div>
                </div>
            </SignedIn>
            
        </section>
    );
}
