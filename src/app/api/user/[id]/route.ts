import User from "@/lib/models/User"; // Assuming _id is stored in your database
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();

    // Extract the userId from params (this will be the Clerk user ID)
    const { id } = await params;  // Destructure the userId from the params

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    // Fetch user from the database by Clerk userId
    const user = await User.findOne({ id }); // Use the Clerk userId

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the user" },
      { status: 500 }
    );
  }
}
