"use server"
import { revalidatePath } from "next/cache";
import User from "../models/User";
import connectToDB from "../mongoose";
import Thread from "../models/Thread";
import { FilterQuery, SortOrder } from "mongoose";

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
        console.log("failed to fetch user",error) ;
    }
}

export async function fetchUserPosts(userId : string) {
    try{
        await connectToDB();

        // find all thread authored by user by given user id
       // todo popluate community
        const threads = await User.findOne({id : userId})
        .populate({
            path : 'threads' ,
            model : Thread ,
            populate : {
                path : 'children' ,
                model : Thread ,
                populate : {
                    path : 'author' ,
                    model : User ,
                    select : 'name image id'
                }
            }
        })
        const userObject = JSON.parse(JSON.stringify(threads));
        return userObject;
    }
    catch(error){
        console.log(error) ;
        throw new Error("Error in getting user thread")
    }
}


export async function fetchUsers({
    userId ,
    searchString = "" ,
    pageNumber = 1 ,
    pageSize = 20 ,
    sortBy = "desc"
} : {
    userId : string ,
    searchString? : string ,
    pageNumber? : number ,
    pageSize? : number ,
    sortBy? : SortOrder
}){
    try{
        await connectToDB() ;

        const skipAmount = (pageNumber - 1) * pageSize
        const regex = new RegExp(searchString ,"i") ;

        const query : FilterQuery<typeof User> = {
            id : {$ne : userId}
        }

        if(searchString.trim() !== ''){
            query.$or = [
                {username : {$regex : regex}} ,
                {name : {$regex : regex}}
            ]
        }

        const sortOptions = {createdAt : sortBy} ;

        const usersQuery = User.find(query)
        .sort(sortOptions)
        .skip(skipAmount) 
        .limit(pageSize)

        const totalUsersCount = await User.countDocuments(query) ;

        const users = await usersQuery.exec() ;

        const isNext = totalUsersCount > skipAmount + users.length ;

        return {users ,isNext} ; 

    }
    catch(error){
        console.log(error) ;
        throw new Error("failed to fetch user")
    }
}

export async function getActivity(userId : string){
    try{
        await connectToDB() ; 

        // find all thread created by the user 
        const userThreads = await Thread.find({author : userId}) 
        // collect all the child thread ids (replies) from the children
        const childThreadIds = userThreads.reduce((acc ,userThreads) => {
            return acc.concat(userThreads.children)
        } ,[])

        const replies = await Thread.find({
            _id : {$in : childThreadIds} ,
            author : {$ne : userId}
        }).populate({
            path : 'author' ,
            model : User ,
            select : 'name image _id'
        })

        return replies ;
    }
    catch(error){
        console.log(error) 
        throw new Error('Failed to fetch activity') ;
    }
}

export async function suggestUsers({
    userId ,
    searchString = "" ,
    pageNumber = 1 ,
    pageSize = 20 ,
    sortBy = "desc"
} : {
    userId : string ,
    searchString? : string ,
    pageNumber? : number ,
    pageSize? : number ,
    sortBy? : SortOrder
}){
    try{
        await connectToDB() ;

        const skipAmount = (pageNumber - 1) * pageSize
        const regex = new RegExp(searchString ,"i") ;

        const query : FilterQuery<typeof User> = {
            id : {$ne : userId}
        }

        if(searchString.trim() !== ''){
            query.$or = [
                {username : {$regex : regex}} ,
                {name : {$regex : regex}}
            ]
        }

        const sortOptions = {createdAt : sortBy} ;

        const usersQuery = User.find(query)
        .sort(sortOptions)
        .skip(skipAmount) 
        .limit(pageSize)

        const totalUsersCount = await User.countDocuments(query) ;

        const users = await usersQuery.exec() ;

        const isNext = totalUsersCount > skipAmount + users.length ;

        return {users ,isNext} ; 

    }
    catch(error){
        console.log(error) ;
        throw new Error("failed to fetch user")
    }
}

