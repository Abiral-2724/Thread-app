"use server"
import { revalidatePath } from "next/cache";
import Thread from "../models/Thread";
import User from "../models/User";
import connectToDB from "../mongoose"

interface Params {
    text : string ,
    author : string ,
    communityId : string | null ,
    path : string
}
export async function createThread({text,author ,communityId ,path} : Params) {
    try{
        await connectToDB() ;

        const createThread = await Thread.create({
            text,
            author,
            community : null ,
        }) 
    
        // update user model
        await User.findByIdAndUpdate(author ,{
            $push : {threads : createThread._id}
        })
    
        revalidatePath(path) ;
    }
    catch(error){
        console.log("erorr creating thread"  , error) ;
    }
    
}

export async function fetchPosts(pageNumber = 1 , pageSize = 20) {
        connectToDB() ;

        // calculate the number of posts to skip 
        const skipAmount = (pageNumber -1)*pageSize

        const postsQuery = Thread.find({parentId : {$in : [null ,undefined]}})
        .sort({createdAt : 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({path : 'author' ,model : User})
        .populate({
            path : 'children',
            populate:{
                path : 'author',
                model : User ,
                select : "_id name parentId image"
            }
        })

        const totalPostsCount = await Thread.countDocuments({parentId : {$in : [null ,undefined]}}) ;

        const posts = await postsQuery.exec() ;

        const isNext = totalPostsCount > skipAmount + posts.length ;

        return {posts ,isNext}
}


export async function fetchThreadById(id : string){
   await connectToDB() ;
   try{
    // populate community
    const thread = await Thread.findById(id)
    .populate({
        path : 'author',
        model : User ,
        select : "_id id parentId image"
    })
    .populate({
        path : 'children' ,
        populate : [
            {
                path : 'author' ,
                model : User,
                 select : "_id id name parentId image"
            },
            {
                path : 'children' ,
                model : Thread,
                populate : {
                    path : 'author' ,
                    model : User ,
                    select : "_id id name parentId image"
                }
            }
        ]
    }).exec() ;

    return thread ;


   }
   catch(error){
    console.log('error fetching thread' ,error)
   }
}



export async function addCommentToThread(threadId : string ,commentText : string ,userId:string ,path:string) {
    await connectToDB() ;

    try{
        // adding a comment 
        const orginalThread = await Thread.findById(threadId) ;

        if(!orginalThread){
            throw new Error('Thread not found')
        }

        const commentThread = new Thread({
            text : commentText ,
            author : userId ,
            parentId : threadId 
        })

        const savedCommentThread = await commentThread.save() ;

        orginalThread.children.push(savedCommentThread._id) 
        await orginalThread.save() ;
        revalidatePath(path)
    } 
    catch(error){
    console.log(error) ;
    throw new Error('Error while creating thread')
    }
}