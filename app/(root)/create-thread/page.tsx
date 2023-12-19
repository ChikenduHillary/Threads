import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    return (
        <>
            <h1 className="heat-text">Create Thread</h1>
            
        </>
    )
}

export default Page;