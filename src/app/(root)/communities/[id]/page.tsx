
// import UserCard from "@/components/cards/UserCard";
// import ProfileHeader from "@/components/shared/ProfileHeader";
// import ThreadsTab from "@/components/shared/ThreadsTab";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { communityTabs } from "@/constants";
// import { fetchCommunityDetails } from "@/lib/actions/community.actions";


// import { currentUser } from "@clerk/nextjs/server";
// import Image from "next/image";

// async function Page({params} : { params: {id : string}}) {
    
//     const user = await currentUser();

//   if (!user) {
//     console.log("User not found while creating thread");
//     return null;
//   }
//  const paramsid = await(params).id
//   const communityDetails = await fetchCommunityDetails(paramsid)

//   console.log('communitydetails = ',communityDetails)
  
//     return (
//         <div>
//             <ProfileHeader 
//             accountId = {communityDetails.id}
//             authUserId = {user.id}
//             name = {communityDetails.name} 
//             username = {communityDetails.username}
//             imgUrl={communityDetails.image}
//             bio={communityDetails.bio}
//             type="Community"
//             ></ProfileHeader>

//         <div className="mt-9">
//         <Tabs defaultValue="threads" className="w-full">
//   <TabsList className="tab">
//    {
//     communityTabs.map((tab) => (
//       <TabsTrigger key={tab.label} value={tab.value} className="tab">
//         <Image
//         src={tab.icon}
//         alt={tab.label}
//         width={24}
//         height={24}
//         className="object-contain"
//         >

//         </Image>
//         <p className="max-sm:hidden">{tab.label}</p>
//         {
//           tab.label === 'Threads' && (
//             <p className="ml-1 mt-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
//               {communityDetails?.threads?.length}
//             </p>
//           )
//         }
//       </TabsTrigger>
//     ))
//    }
//   </TabsList>
  
  
//       <TabsContent
//       value="threads"
//       className="w-full text-light-1"
//       >
//           <ThreadsTab
//           currentUserId = {user.id}
//           accountId = {communityDetails._id}
//           accountType="Community"
//           ></ThreadsTab>

//       </TabsContent>
      

//       <TabsContent
//       value="members"
//       className="w-full text-light-1"
//       >
//           <section className="mt-9 flex flex-col gap-10">
//             {
//                 communityDetails?.members.map((member : any) => (
//                     <UserCard
//                     key={member.id}
//                     id = {member.id}
//                     name={member.name}
//                     username={member.username}
//                     imgUrl={member.image}
//                     personType="User"
//                     ></UserCard>
//                 ))
//             }
//           </section>

//       </TabsContent>
      

//       <TabsContent
//       value="requests"
//       className="w-full text-light-1"
//       >
//           <ThreadsTab
//           currentUserId = {user.id}
//           accountId = {communityDetails._id}
//           accountType="Community"
//           ></ThreadsTab>

//       </TabsContent>
      
    
  
// </Tabs>
//         </div>

//         </div>
//     )
// }

// export default Page ;

import Reac from 'react'

const Comminity = () => {
  return (
    <div className='text-yellow-50 text-center text-5xl '
    >Comminity Profile page Not Found</div>
  )
}

export default Comminity ;