import Thread from '@/lib/models/Thread';
import connectToDB from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { threadId, commentText, userId, path } = await req.json();

    // Validate the input
    if (!threadId || !commentText || !userId || !path) {
      return NextResponse.json(
        { message: 'All fields (threadId, commentText, userId, path) are required.' },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Fetch the original thread
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      return NextResponse.json({ message: 'Thread not found.' }, { status: 404 });
    }

    // Create a new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    // Save the new comment thread
    const savedCommentThread = await commentThread.save();

    // Add the new comment thread's ID to the children array of the original thread
    originalThread.children.push(savedCommentThread._id);
    await originalThread.save();

    // Revalidate the specified path
    // You may need to replace this with a proper implementation for revalidation
    // depending on your deployment setup (e.g., using ISR revalidation in Vercel)
    // For now, this is a placeholder:
    console.log(`Revalidating path: ${path}`);

    // Return the saved comment thread
    return NextResponse.json(savedCommentThread, { status: 201 });
  } catch (error) {
    console.error('Error adding comment to thread:', error);
    return NextResponse.json(
      { message: 'Error while adding comment to thread.' },
      { status: 500 }
    );
  }
}
