import Thread from '@/lib/models/Thread';
import User from '@/lib/models/User';
import connectToDB from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

// Define the GET route for fetching a thread by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params; // Extract the thread ID from the route parameters

  try {
    // Ensure the ID is provided
    if (!id) {
      return NextResponse.json({ message: 'Thread ID is required' }, { status: 400 });
    }

    // Connect to the database
    await connectToDB();

    // Fetch the thread by ID with the necessary population
    const thread = await Thread.findById(id)
      .populate({
        path: 'author',
        model: User,
        select: '_id id parentId image',
      })
      .populate({
        path: 'children',
        populate: [
          {
            path: 'author',
            model: User,
            select: '_id id name parentId image',
          },
          {
            path: 'children',
            model: Thread,
            populate: {
              path: 'author',
              model: User,
              select: '_id id name parentId image',
            },
          },
        ],
      })
      .exec();

    // Handle case when the thread is not found
    if (!thread) {
      return NextResponse.json({ message: 'Thread not found' }, { status: 404 });
    }

    // Return the thread in the response
    return NextResponse.json(thread, { status: 200 });
  } catch (error) {
    console.error('Error fetching thread:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching the thread' },
      { status: 500 }
    );
  }
}
