import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { BookText } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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
    <div className="w-10/12 mx-auto my-4">
      <h1 className="font-semibold text-sm mb-4 ">Recent Document</h1>
      <div className="flex flex-wrap ">
        {userDocument.length > 0 ? (
          userDocument.map((document) => (
            <div className="p-2" key={document.id}>
              <Link href={`/document/${document.id}`}>
                <Card className="w-[150px] hover:border  hover:border-blue-500 hover:cursor-pointer">
                  <CardHeader></CardHeader>
                  <CardContent className="flex justify-center mx-autp">
                    <BookText size={80} />
                  </CardContent>
                  <CardFooter>ff</CardFooter>
                </Card>
              </Link>
              <p className="text-sm mt-2">{document.title}</p>
            </div>
          ))
        ) : (
          <p className="text-sm mt-2">
            Once you start writing your Recent Document will go here...
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentDocument;
