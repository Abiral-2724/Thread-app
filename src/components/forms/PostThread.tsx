"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { z } from "zod";
import axios from "axios"; // Import axios
import { toast } from "react-toastify";
import { useOrganization } from "@clerk/nextjs";


function PostThread({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const {organization} = useOrganization()
  console.log("organization" ,organization) ;
 // console.log("organization id = " ,organization['id']) ;
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: '',
      accountId: userId,
    },
  });

  
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
   // console.log("organization" ,organization) ;
   
    if(!organization){
    try {
      // Make POST request to create a new thread using axios
      const response = await axios.post("/api/thread", {
        text: values.thread,
        author: userId,
        communityId: null,  // You can change this if needed
        path: pathname,
      });

     
      const data = response.data;
      
      console.log("Thread created:", data.thread);

      // Optionally redirect after successful creation
      router.push('/');
      toast.success('Thread Created Successfully!')

    } catch (error) {
      console.error("Error creating thread:", error);
    }
}else{
    try {
        // Make POST request to create a new thread using axios
        const response = await axios.post("/api/thread", {
          text: values.thread,
          author: userId,
          communityId: organization?.id,  // You can change this if needed
          path: pathname,
        });
  
       
        const data = response.data;
        
        console.log("Thread created:", data.thread);
  
        // Optionally redirect after successful creation
        router.push('/');
        toast.success('Thread Created Successfully!')
  
      } catch (error) {
        console.error("Error creating thread:", error);
      }
}
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          className="mt-10 flex flex-col justify-start gap-10 text-white"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                  Content
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea rows={15} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="bg-primary-500 hover:bg-purple-600 text-white">
            Post thread
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default PostThread;
