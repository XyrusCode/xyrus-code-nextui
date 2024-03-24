'use server';
import { SignIn, SignOut } from "./AuthButtons";

export const ClientSignIn = () => {
    return (<>
        <SignIn />
    </>);
};

export const ClientSignOut = () => {
    return (<>
        <SignOut />
    </>);
};