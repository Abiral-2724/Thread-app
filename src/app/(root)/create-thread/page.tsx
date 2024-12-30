import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    console.log("User not found while creating thread");
    return null;
  }

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  // Convert `userInfo._id` to a plain string if necessary
  const userId = userInfo._id.toString();

  return (
    <div>
      <h1 className="head-text mt-[-50] font-thin">What’s on your mind ? Let the world know in just a few clicks !</h1>
      <PostThread userId={userId}></PostThread>
    </div>
  );
}
