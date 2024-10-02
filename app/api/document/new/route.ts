import { auth, User } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("User not Authenticated"), { status: 401 };
    }

    const createNewDoc = await db.document.create({
      data: {
        userId: userId,
        title: "Untitled Document",
        description: "",
      },
    });
    revalidatePath("/");
    return NextResponse.json(createNewDoc, { status: 200 });
  } catch (e) {
    console.log(e);
    return new NextResponse("Post new doc error"), { status: 500 };
  }
}
