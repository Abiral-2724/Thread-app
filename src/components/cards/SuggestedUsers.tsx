'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface SuggestedUser {
  id: string;
  name: string;
  username: string;
  image: string;
}

interface SuggestedUsersProps {
  users: SuggestedUser[];
}

const SuggestedUsers = ({ users }: SuggestedUsersProps) => {
  if (!users.length) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-dark-2 rounded-xl mt-4">
        <Image
          src="/assets/no-users.png"
          alt="No users"
          width={112}
          height={112}
          className="opacity-50"
        />
        <p className="text-light-3 text-center mt-4">
          No suggestions available at the moment
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between bg-dark-4 rounded-xl p-4 hover:bg-dark-3 transition-all duration-200"
        >
          <Link
            href={`/profile/${user.id}`}
            className="flex items-center gap-3 flex-1"
          >
            <div className="relative">
              <Image
                src={user.image}
                alt={`${user.username}'s profile picture`}
                width={48}
                height={48}
                className="rounded-full object-cover border-2 border-primary-500"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-1" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-base-semibold text-light-1 hover:text-primary-500 transition-colors">
                  {user.name}
                </h4>
                <span className="px-2 py-0.5 bg-primary-500 text-tiny-medium text-light-2 rounded-full">
                  New
                </span>
              </div>
              <p className="text-subtle-medium text-light-2">
                @{user.username}
              </p>
            </div>
          </Link>

          <Button 
            variant="ghost" 
            size="sm"
            className="ml-auto text-white hover:bg-primary-500 hover:text-black group"
          >
            <UserPlus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Follow
          </Button>
        </div>
      ))}
      
      {users.length >= 5 && (
        <button className="text-primary-500 text-base-medium hover:text-primary-500/80 transition-colors mt-2 self-center">
          View More Suggestions
        </button>
      )}
    </div>
  );
};

export default SuggestedUsers;