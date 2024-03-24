import { Avatar, Button, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { signIn, signOut } from 'next-auth/react';
export default async function UserButton({
    user
}: {
    user: any
}) {

    if (!user) return (
        <Button color='primary'
            href="/login"
        >
            Sign In</Button>)
    return (
        <Dropdown>
            <NavbarItem>
                <DropdownTrigger>
                    <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"

                        radius="sm"
                        variant="light"
                    >
                        {user.image ? (
                            <Avatar
                                src={user.image}
                                name={user.name ?? ""}
                            />
                        ) :
                            <Button color='primary'
                                href="/login"
                            // onClick={() => signIn('github')}
                            >
                                Sign In</Button>
                        }
                    </Button>
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
                aria-label="ACME features"
                className="w-[340px]"
                itemClasses={{
                    base: "gap-4",
                }}
            >
                <DropdownItem
                    key="autoscaling"
                    description="ACME scales apps to meet user demand, automagically, based on load."

                >
                    <Button
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </Button>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

