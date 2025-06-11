'use client'

import { useState } from 'react'
import { Github, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@clerk/nextjs'

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

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false)
  const { isLoaded, signIn, setActive } = useSignIn()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [verification, setPendingVerification] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  if (!isLoaded) return null

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded) return

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password: password,
      })

      // If first factor (e.g., email_code) is required
      if (result.status === 'needs_first_factor') {
        // await signIn.prepareFirstFactor({ strategy: 'email_code' })
        // setPendingVerification(true)
      } else if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/dashboard')
      } else if (result.status === 'needs_second_factor') {
        // Optional: handle 2FA
      }
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2))
      setError(error.errors?.[0]?.message || 'Login failed')
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded) return

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/dashboard')
      } else {
        setError('Verification incomplete. Please try again.')
      }
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2))
      setError(error.errors?.[0]?.message || 'Verification failed')
    }
  }

  return (
    <div className="min-h-screen w-full">
      <header className="flex h-16 items-center justify-between px-6 border-b">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/image/SkyBridge.svg"
            width={40}
            height={40}
            alt="SkyBridge logo"
          />
        </Link>
        <Link
          href="/signup"
          className="text-sm font-medium border border-1 bg-background shadow-sm hover:bg-accent px-[14px] py-[8px] rounded-lg"
        >
          Sign Up
        </Link>
      </header>

      <main className="flex min-h-[calc(100vh-4rem)]">
        <div className="hidden w-1/2 bg-muted/50 lg:block">
          <div className="flex h-full flex-col justify-center px-12">
            <figure className="space-y-6">
              <blockquote className="text-2xl font-medium leading-normal italic">
                "We simplify your multi-cloud management with unified resources,
                optimized costs, and smart recommendations for efficiency."
              </blockquote>
              <figcaption className="text-lg font-semibold">Sky Bridge</figcaption>
            </figure>
          </div>
        </div>

        <div className="flex w-full items-center justify-center lg:w-1/2">
          <Card className="mx-6 w-full max-w-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                {verification ? 'Verify Code' : 'Log in'}
              </CardTitle>
              <CardDescription>
                {verification
                  ? 'Enter the verification code sent to your email.'
                  : 'Access your SkyBridge dashboard'}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && <p className="text-red-600 text-sm">{error}</p>}

              {!verification ? (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <Label
                        htmlFor="forgot"
                        className="text-sm text-muted-foreground"
                      >
                        Forgot?
                      </Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    Sign in
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      placeholder="Enter code"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" type="submit">
                    Verify & Sign In
                  </Button>
                </form>
              )}

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
                </Link>{' '}
                and{' '}
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
