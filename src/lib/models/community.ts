import mongoose, { Document, Schema } from "mongoose";

// Interface to define the shape of the Community document
interface ICommunity extends Document {
    id: string;
    username: string;
    name: string;
    image?: string;
    bio?: string;
    createdBy: mongoose.Types.ObjectId;  // Reference to User who created the community
    threads: mongoose.Types.ObjectId[];   // Array of Thread references
    members: mongoose.Types.ObjectId[];   // Array of User references
}

const communitySchema = new Schema<ICommunity>({
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
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
}, {
    timestamps: true  // Adds createdAt and updatedAt fields
});

// Handle model initialization to avoid overwriting in development mode
const Community = mongoose.models?.Community || mongoose.model<ICommunity>("Community", communitySchema);

export default Community;