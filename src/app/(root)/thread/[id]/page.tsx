'use client'

import { useEffect, useState } from 'react';
import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const threadId = params.id as string;
    const { user, isLoaded } = useUser();
    const [userInfo, setUserInfo] = useState<any>(null);
    const [thread, setThread] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<any[]>([]);

    const fetchThreadData = async () => {
        try {
            const threadResponse = await axios.get(`/api/thread/${threadId}`);
            const threadData = threadResponse.data;
            
            // Set the main thread data without comments
            const { children, ...threadWithoutComments } = threadData;
            setThread(threadWithoutComments);
            
            // Set comments separately and reverse the order
            if (children) {
                setComments([...children].reverse());
            }
        } catch (error) {
            console.error("Error fetching thread:", error);
            toast.error("Error fetching thread data");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!isLoaded || !user) return;

            try {
                const userInfoResponse = await axios.get(`/api/user/${user.id}`);
                const userInfoData = userInfoResponse.data;

                if (!userInfoData?.onboarded) {
                    router.push('/onboarding');
                    return;
                }

                setUserInfo(userInfoData);
                await fetchThreadData();
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, isLoaded, threadId, router]);

    const handleCommentAdded = async () => {
        await fetchThreadData();
    };

    if (!isLoaded || loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        toast.error("No user found");
        return null;
    }

    if (!thread || !userInfo) {
        return null;
    }

    return (
        <div>
            <section>
                <div>
                    <ThreadCard
                        id={thread._id}
                        currentUserId={userInfo._id || ""}
                        parentId={thread.parentId}
                        content={thread.text}
                        author={thread.author}
                        community={thread.community}
                        createdAt={thread.createdAt}
                        comments={comments}
                    />
                </div>
                <div className="mt-7">
                    <Comment
                        threadId={thread._id}
                        currentUserImg={userInfo.image}
                        currentUserId={userInfo._id}
                        onCommentAdded={handleCommentAdded}
                    />
                </div>
                <div className="mt-10">
                    {comments.map((childItem: any) => (
                        <div className="mt-5" key={childItem._id}>
                            <ThreadCard
                                id={childItem._id}
                                currentUserId={childItem?.author?._id || ""}
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
}