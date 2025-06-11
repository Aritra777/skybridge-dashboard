'use client'

import { Eye, EyeOff, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
export default function Component() {
  
  // const {isLoaded, signUp, setActive} = useSignUp();
  // const [emailAddress,setEmailAddress] = useState("");
  // const [password,setPassword] = useState("");
  // const [verification,setPendingVerfication] = useState(false);
  // const [code,setCode] = useState("");
  // const [error,setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen w-full">
      <header className="flex h-16 items-center justify-between px-6 border-b">
        <Link href="/" className="flex items-center gap-2">
          {/* <div className="flex h-6 w-6 items-center justify-center rounded-lg border">
            <span className="sr-only"></span>
            A
          </div> */}
          <Image
            src={"/image/SkyBridge.svg"}
            width={40}
            height={40}
            alt="Picture of the author"
          />
          <span className="text-lg font-semibold"></span>
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium border border-1 bg-background shadow-sm hover:bg-accent px-[14px] py-[8px] rounded-lg"
        >
          Login
        </Link>
      </header>
      <main className="flex min-h-[calc(100vh-4rem)]">
        <div className="hidden w-1/2 bg-muted/50 lg:block">
          <div className="flex h-full flex-col justify-center px-12">
            <figure className="space-y-6">
              <blockquote className="text-2xl font-medium leading-normal italic">
                "The cloud-agnostic tool provides unified resource management, optimizing multi-cloud costs and efficiency through usage analysis and smart recommendations."
              </blockquote>
              <figcaption className="text-lg font-semibold">
                Sky Bridge
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <Card className="mx-6 w-full max-w-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    required
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <Button className="w-full" type="submit">
                Sign up
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full" type="button">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{' '}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}