import mongoose, { Document, Schema } from "mongoose";

// Interface to define the shape of the User document
interface IUser extends Document {
  id: string;  // If it's an ObjectId, you can change it to mongoose.Schema.Types.ObjectId
  username: string;
  name: string;
  image?: string;
  bio?: string;
  threads: mongoose.Types.ObjectId[];  // Array of ObjectId references to Thread
  onboarded: boolean;
  communities: mongoose.Types.ObjectId[];  // Array of ObjectId references to Community
}

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',  // Optional: Default to an empty string if not provided
  },
  bio: {
    type: String,
    default: '',  // Optional: Default to an empty string if not provided
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

// Handle model initialization to avoid overwriting in development mode
const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
