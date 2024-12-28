import mongoose, { Document, Schema } from "mongoose";


const threadSchema = new Schema({
  text : {
    type : String ,
    required : true ,
  } ,
  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User' ,
    required : true ,
  }
  ,
  community : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Community' ,
  } ,
  createdAt : {
    type : Date ,
    default : Date.now()
  } ,
  parentId : {
    type : String
  } ,
  children : [
    {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Thread'
    }
  ]
});

// Handle model initialization to avoid overwriting in development mode
const Thread = mongoose.models?.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
