import { signIn, signOut } from 'next-auth/react';
import { Button, Image } from "@nextui-org/react"

export const SignIn = () => {
    return (

        <Button color='primary'
            onClick={() => signIn('github')}
            startContent={<Image alt="GitHub logo" src="/github-logo.svg" width="20" height="20" />}
        >Sign In</Button>

    )
};

export const SignOut = () => {
    return (

        <Button color="secondary" className="w-full p-0"
            onClick={() => signOut()}
        >
            Sign Out
        </Button>

    )
};
