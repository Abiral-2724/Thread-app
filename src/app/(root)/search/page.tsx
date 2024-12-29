
import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const Search = async () => {
    const user = await currentUser();

    if (!user) {
      console.log("User not found while creating thread");
      return null;
    }
  
    const userInfo = await fetchUser(user.id);
  
    if (!userInfo?.onboarded) {
      redirect("/onboarding");
    }

    // fetch user 
    const result = await fetchUsers({
        userId : user.id,
    searchString : '' ,
    pageNumber : 1 ,
    pageSize : 20 ,
    })


  return (
    <div className="text-white">
        <h1 className="head-text mb-10 ml-[40%]">Search</h1>
            {/* search bar */}

            <div className="mt-14 flex flex-col gap-9">
                    {
                        result.users.length === 0 ? (
                            <p className="no-result">No users</p>
                        ) : (
                            <>
                            {result.users.map((person) => (
                                <UserCard 
                                key={person.id}
                                id={person.id}
                                 name={person.name}
                                 username={person.username}
                                imgUrl = {person.image}
                                personType = 'User'
                                ></UserCard>
                            ))}
                            </>
                        )
                    }
            </div>

    </div>
  )
}

export default Search