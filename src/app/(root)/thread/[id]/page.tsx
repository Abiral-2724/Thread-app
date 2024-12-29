
import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

export default async function Page({ params }: { params: { id: string } }) {
    if (!params.id) {
        return null;
    }

    const user = await currentUser();

    if (!user) {
        toast.error("No user found");
        return null;
    }
    console.log(user.id) ;

    try {
        // Fetch user info from your API using Axios, passing the _id from your DB
        const userInfoResponse = await axios.get(`http://localhost:3000/api/user/${user.id}`);  // Ensure this uses user.id from Clerk
        const userInfo = userInfoResponse.data;
        console.log(userInfo) ;
        if (!userInfo?.onboarded) {
            redirect('/onboarding');
        }

        // Fetch thread data using Axios
        const threadResponse = await axios.get(`http://localhost:3000/api/thread/${params.id}`);
        const thread = threadResponse.data;

        return (
            <div>
                <section>
                    <div>
                        <ThreadCard
                            id={thread._id}
                            currentUserId={userInfo._id || ""}  // Use _id here for currentUserId
                            parentId={thread.parentId}
                            content={thread.text}
                            author={thread.author}
                            community={thread.community}
                            createdAt={thread.createdAt}
                            comments={thread.children}
                        />
                    </div>
                    <div className="mt-7">
                        <Comment
                            threadId={thread._id}
                            currentUserImg={userInfo.image}
                            currentUserId={userInfo._id}  // Pass _id from the database
                        />
                    </div>
                    <div className="mt-10">
                        {thread.children.map((childItem: any) => (
                            <div className="mt-5" key={childItem._id}>
 <ThreadCard 
                                id={childItem._id}
                                currentUserId={childItem?.author?._id || ""} // Adjust this if necessary
                                parentId={childItem.parentId}
                                content={childItem.text}
                                author={childItem.author}
                                community={childItem.community}
                                createdAt={childItem.createdAt}
                                comments={childItem.children}
                                isComment
                            />
                            </div>
                           
                        ))}
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
        return null;
    }
}
