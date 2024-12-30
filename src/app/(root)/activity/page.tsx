
import { fetchUser, getActivity} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


const page = async () => {
    const user = await currentUser();

    if (!user) {
      console.log("User not found while creating thread");
      return null;
    }
  
    const userInfo = await fetchUser(user.id);
  
    if (!userInfo?.onboarded) {
      redirect("/onboarding");
    }

    // get activity 
    const activity = await getActivity(userInfo._id)
    console.log(activity) ;

  return (
    <div>
        <h1 className="head-text text-4xl text-center font-thin mt-[-40] mb-10">The Buzz Around Your Posts !</h1>
        <section className="mt-10 flex flex-col gap-5">
            {
                activity.length > 0 ? (
                    <>
                    {activity.map((activity) => (
                        <Link
                        key={activity._id}
                        href={`/thread/${activity.parentId}`}
                        >
                            <article className="activity-card">
                            <Image
                            src = {activity.author.image}
                            alt="Profilt Picture"
                            width={20}
                            height={20}
                            className="rounded-full object-cover"
                            ></Image>
                            <p className="!text-small-regular text-light-1">
                                <span className="mr-1 text-purple-400"
                                >{activity.author.name}

                                </span>{"  "}
                                replied to your thread
                            </p>
                            </article>
                        </Link>
                    ))}
                    </>
                ) : (
                    <p className="text-base-regular text-light-3">No activity yet</p>
                )
            }
        </section>
    </div>
  )
}

export default page