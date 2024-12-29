import Thread from "@/lib/models/Thread";
import User from "@/lib/models/User";
import connectToDB from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

// Named export for POST request
export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectToDB();

    const { text, author, communityId, path }: Params = await req.json();

    // Create the thread in the database
    const createdThread = await Thread.create({
      text,
      author,
      community: communityId,
    });

    // Update the user model to add the thread to the user's threads
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    return NextResponse.json({ thread: createdThread }, { status: 201 });
  } catch (error) {
    console.error("Error creating thread:", error);
    return NextResponse.json(
      { message: "Error creating thread" },
      { status: 500 }
    );
  }
}

// File: /app/api/posts/route.ts


export async function GET(req: NextRequest) {
    try {
      // Connect to the database
      await connectToDB();
  
      // Extract query parameters for pagination
      const pageNumber = req.nextUrl.searchParams.get('pageNumber') || '1'; // Default to 1 if not provided
      const pageSize = req.nextUrl.searchParams.get('pageSize') || '20'; // Default to 20 if not provided
  
      const page = parseInt(pageNumber, 10);
      const size = parseInt(pageSize, 10);
  
      // Calculate the number of posts to skip
      const skipAmount = (page - 1) * size;
  
      // Query to fetch the posts with pagination
      const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(size)
        .populate({ path: 'author', model: User })
        .populate({
          path: 'children',
          populate: {
            path: 'author',
            model: User,
            select: '_id name parentId image',
          },
        });
  
      // Get the total number of posts to calculate if there is a next page
      const totalPostsCount = await Thread.countDocuments({
        parentId: { $in: [null, undefined] },
      });
  
      const posts = await postsQuery.exec();
  
      // Determine if there is a next page based on the total posts and the skip amount
      const isNext = totalPostsCount > skipAmount + posts.length;
  
      // Return the posts and pagination info
      return NextResponse.json({ posts, isNext }, { status: 200 });
    } catch (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.json(
        { message: 'Error fetching posts' },
        { status: 500 }
      );
    }
  }


  