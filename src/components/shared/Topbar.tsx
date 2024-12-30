import { OrganizationSwitcher, SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from '@clerk/themes';

export default function Topbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/90 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <Link href='/' className="flex items-center gap-4 transition-opacity hover:opacity-80">
          <Image 
            src='/assets/logo.svg' 
            alt="logo" 
            width={28} 
            height={28}
            className="rounded-full"
          />
          <p className="font-cursive text-10xl tracking-widest text-light-1 max-xs:hidden">
            Threadscape
          </p>
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <div className="flex items-center gap-4">
              <div className="block md:hidden">
                <SignOutButton>
                  <div className="flex cursor-pointer p-2 hover:bg-gray-800 rounded-full transition-colors">
                    <Image 
                      src="/assets/logout.svg" 
                      alt="logout" 
                      width={20} 
                      height={20}
                    />
                  </div>
                </SignOutButton>
              </div>
              <UserButton 
                appearance={{
                  baseTheme: dark,
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
              <OrganizationSwitcher 
                appearance={{
                  baseTheme: dark,
                  elements: {
                    organizationSwitcherTrigger: "py-2 px-4"
                  }
                }}
              />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-4">
              <Link 
                href="/sign-in" 
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-200 hover:bg-gray-800 transition-colors"
              >
                Sign in
              </Link>
              <Link 
                href="/sign-up"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}