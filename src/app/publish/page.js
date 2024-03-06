import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import PublishComponent from "./Components/PublishComponent";

export default async function page() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/signin?callbackurl=/publish");
  }

  return (
    <div>
      <PublishComponent />
    </div>
  );
}
