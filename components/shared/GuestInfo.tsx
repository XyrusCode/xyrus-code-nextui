"use client"

import { useSession } from "next-auth/react"
import { Button, Input } from "@nextui-org/react"
import { SetStateAction, useState } from "react"
import SessionData from "./SessionData"
import { Link } from "@nextui-org/react"

const UpdateForm = () => {
  const { data: session, update } = useSession()
  const [name, setName] = useState(session?.user?.name ?? "")

  if (!session?.user) return null
  return (
    <>
      <h2 className="text-xl font-bold">Updating the session</h2>
      <form
        onSubmit={async () => {
          if (session) {
            const newSession = await update({
              ...session,
              user: { ...session.user, name },
            })
            console.log({ newSession })
          }
        }}
        className="flex items-center w-full max-w-sm space-x-2"
      >
        <Input
          type="text"
          placeholder={session.user.name ?? ""}
          value={name}
          onChange={(e: { target: { value: SetStateAction<string> } }) => {
            setName(e.target.value)
          }}
        />
        <Button type="submit">Update</Button>
      </form>
    </>
  )
}

export default function GuestInfo() {
  const { data: session, status } = useSession()
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Client Side Rendering Usage</h1>
      <p>
        This page fetches session data client side using the{" "}
        <Link isExternal href="https://nextjs.authjs.dev/react#usesession">
          <code>useSession</code>
        </Link>{" "}
        React Hook.
      </p>
      <p>
        It needs the{" "}
        <Link isExternal href="https://react.devreference/nextjs/react/use-client">
          <code>'use client'</code>
        </Link>{" "}
        directive at the top of the file to enable client side rendering, and
        the{" "}
        <Link isExternal href="https://nextjs.authjs.dev/react#sessionprovider">
          <code>SessionProvider</code>
        </Link>{" "}
        component in{" "}
        <strong>
          <code>client-example/page.tsx</code>
        </strong>{" "}
        to provide the session data.
      </p>

      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <SessionData session={session} />
      )}
      <UpdateForm />
    </div>
  )
}
