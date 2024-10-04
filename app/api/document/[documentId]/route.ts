import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { documentId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("User Not Authenticated", { status: 401 });
    }

    const { title, description } = await req.json(); // Parse the JSON body

    // Extract documentId from the context.params object

    const updateDocument = await db.document.update({
      where: {
        id: params.documentId, // Use the extracted documentId here
        userId: userId,
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(
      { message: "Successfully updated data" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { documentId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("User Not Authenticated", { status: 401 });
    }

    // Extract documentId from the context.params object

    const deletedDocument = await db.document.delete({
      where: {
        id: params.documentId, // Use the extracted documentId here
        userId: userId,
      },
    });
    redirect("/");
    revalidatePath("/");
    return new NextResponse("Successfully Deleted data", { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
