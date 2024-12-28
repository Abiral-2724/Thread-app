import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connection : ConnectionObject = {} ;

async function connectToDB():Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to database") ;
        return ;
    }
    try{
      const db =  await mongoose.connect(process.env.MONGODB_URL || '') ;
        console.log(db) ;
       connection.isConnected = db.connections[0].readyState  ;

        console.log("DB connected successfully") ;



    }
    catch(error){
        console.log("Database connection failer" ,error)
        process.exit(1) ;
    }
}

export default connectToDB ;