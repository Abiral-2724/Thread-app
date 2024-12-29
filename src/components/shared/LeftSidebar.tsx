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
            // Only update the profile route when we have the userId
            setSidebarItems(sidebarLinks.map(link => {
                if (link.route === '/profile') {
                    return { ...link, route: `${link.route}/${userId}` };
                }
                return link;
            }));
        }
    }, [userId, isLoaded]);

    const handleSignOut = async () => {
        await signOut();
        router.push("/sign-in");
    };

    if (!isLoaded) {
        return <div className="leftsidebar">Loading...</div>;
    }

    return (
        <div>
            <section className="custom-scrollbar leftsidebar">
                <div className="flex w-full flex-1 flex-col gap-6 px-6">
                    {sidebarItems.map((link) => {
                        const isActive =
                            (pathname.includes(link.route) &&
                                link.route.length > 1) ||
                            pathname === link.route;

                        return (
                            <div key={link.label}>
                                <Link
                                    href={link.route}
                                    className={`leftsidebar_link ${
                                        isActive && 'bg-primary-500'
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
                            </div>
                        );
                    })}
                </div>

                <div className="mt-10 px-6">
                    <SignedIn>
                        <div
                            className="flex cursor-pointer gap-4 p-4"
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
                    </SignedIn>
                </div>
            </section>
        </div>
    );
}