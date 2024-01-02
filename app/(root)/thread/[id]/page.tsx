import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchThreadById } from "@/lib/actions/thread.actions";

const Page = async ({ params }: { params:  { id: string }}) => {
    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding')

    const thread = await fetchThreadById(params.id);
    return (
        <section>
            <div>    
                <ThreadCard 
                    id={thread._id}
                    currentUserId={user?.id}
                    parentId={thread.parentId}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                    content={thread.text}
                />
            </div>

            <div className="mt-7">
                <Comment 
                    threadId={thread.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className="mt-10">
                {thread.children.map((childItem: any) => (
                    <ThreadCard 
                        id={childItem._id}
                        currentUserId={user?.id}
                        parentId={childItem.parentId}
                        author={childItem.author}
                        community={childItem.community}
                        createdAt={childItem.createdAt}
                        comments={childItem.children}
                        content={childItem.text}
                        isComment
                    />
                ))}
            </div>
        </section>
    )
};

export default Page;