import { auth } from '@/app/auth';
import { getGuestbookEntries } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import Form from './form';
import { SignOut } from '@/components/shared/AuthButtons';

export const metadata = {
    title: 'Admin',
};

export default async function GuestbookPage() {
    let session = await auth();
    if (session?.user?.email !== 'shammahprinz@gmail.com') {
        redirect('/');
    }

    let entries = await getGuestbookEntries();

    return (
        <section>
            <h1 className="font-medium text-2xl mb-8 tracking-tighter">admin</h1>
            <Form entries={entries} />
            <SignOut />
        </section>
    );
}