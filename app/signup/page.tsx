"use client"
import  Component  from "@/components/signup";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export default function Page() {
   const {isLoaded, signUp, setActive} = useSignUp();
   const [emailAddress,setEmailAddress] = useState("");
   const [password,setPassword] = useState("");
   const [verification,setPendingVerfication] = useState(false);
   const [code,setCode] = useState("");
   const [error,setError] = useState("");

   const router = useRouter();

   if(!isLoaded){
      return null;
   }
   async function submit(e: React.FormEvent) {
      e.preventDefault();
      if(!isLoaded){
         return;
      }
      try {
         await signUp.create({
            emailAddress,
            password
         })
         await signUp.prepareEmailAddressVerification({
            strategy: "email_code"
         });
         setPendingVerfication(true);

      } catch (error: any) {
         console.log(JSON.stringify(error, null, 2));
         setError(error.errors[0].message);
      }
   }

   async function onPressVerify(e: React.FormEvent) {
      e.preventDefault();
      if(!isLoaded){
         return;
      }
      try {
         const completeSignup = await signUp.attemptEmailAddressVerification({code});
         if(completeSignup.status !== "complete"){
            console.log(JSON.stringify(completeSignup,null,2));
         }
         if(completeSignup.status === "complete"){
            //console.log(JSON.stringify(completeSignup));
            await setActive({session: completeSignup.createdSessionId});
            router.push("/dashboard");
         }

      } catch (error: any) {
         console.log(JSON.stringify(error,null,2));
         setError(error.errors[0].message);
      }
   }
   return (
      <div>
         <Component />
      </div>
   );
}
