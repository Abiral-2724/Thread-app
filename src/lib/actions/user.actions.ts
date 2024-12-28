"use server"
import { revalidatePath } from "next/cache";
import User from "../models/User";
import connectToDB from "../mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  try {
    // Ensure MongoDB is connected
    await connectToDB();

    // Update the user in the database
    const updatedUser = await User.findOneAndUpdate(
      { id: userId }, // Find user by id
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true, // Set onboarded to true
      },
      { upsert: true, new: true } // Use new: true to return the updated document
    );

    if (!updatedUser) {
      console.log("User not found or updated successfully.");
    }

    // If path is '/profile/edit', trigger revalidation
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error) {
    console.error("Failed to update user:", error);
    // Optionally, you can throw the error again or handle further
    // throw new Error("Error updating user data.");
  }
}


export async function fetchUser(userId : string) {
    try{
        await connectToDB() ;
        return await User
        .findOne({id : userId})
        // .populate({
        //     path : 'communities',
        //     model : Community

        // })
    }
    catch(error){
        console.log("failed to fetch user") ;
    }
}
