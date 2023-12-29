import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

import PostThread from '@components/form/PostThread';

async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if(userInfo?.onboarded) redirect('/onboarding');

    return (
        <>
            <h1 className="heat-text">Create Thread</h1>
            <PostThread />
        </>
    )
}

export default Page;