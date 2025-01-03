import UserCard from "@/components/cards/UserCard";
import { SearchInput } from "@/components/shared/SearchInput";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Search = async ({ searchParams }: { searchParams: { q: string } }) => {
  const user = await currentUser();

  if (!user) {
    console.log("User not found while creating thread");
    return null;
  }

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  // Fetch users with the search string from URL params
  const searchString = await(searchParams).q || ''; // Directly access searchParams.q
  const result = await fetchUsers({
    userId: user.id,
    searchString,
    pageNumber: 1,
    pageSize: 20,
  });

  return (
    <div className="text-white">
      <h1 className="head-text text-center font-thin mt-[-50] mb-10">Find Your Connections, Discover New Faces</h1>

      {/* Search bar */}
      <SearchInput />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
