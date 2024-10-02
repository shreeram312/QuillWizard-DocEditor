import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const RecentDocument = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
    return null;
  }
  const userDocument = await db.document.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return (
    <div>
      {userDocument.map((data) => (
        <div key={data.userId}></div>
      ))}
    </div>
  );
};

export default RecentDocument;
