// RightSidebar.tsx
import { currentUser } from "@clerk/nextjs/server";

import { suggestUsers } from "@/lib/actions/user.actions"; // Adjust the import path
import SuggestedUsers from "../cards/SuggestedUsers";

async function RightSidebar() {
  const user = await currentUser();
  
  if (!user) return null;

  // Fetch users on the server side
  const result = await suggestUsers({
    userId: user.id,
    pageSize: 5,
    sortBy: "desc"
  });

  // Serialize the MongoDB documents
  const serializedUsers = result.users.map(user => ({
    id: user._id.toString(),
    name: user.name,
    username: user.username,
    image: user.image,
  }));

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start mt-[-60]">
        <h3 className="text-heading4-medium font-thin text-center text-light-1">
          Suggested Users
        </h3>
        <SuggestedUsers users={serializedUsers} />
      </div>
    </section>
  );
}

export default RightSidebar;