'use client';

import { Github } from 'lucide-react'
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

export default function Signin() {
  return (
    <div className="min-h-screen w-full">
      <header className="flex h-16 items-center justify-between px-6 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg border">
            <span className="sr-only"></span>
            A
          </div>
          <span className="text-lg font-semibold"></span>
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
              <blockquote className="text-2xl font-medium leading-normal">
                "We are here to simplify your multi-cloud management with unified resources, optimized costs, and smart recommendations for efficient, insightful, cost-effective operations."
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
              <CardTitle className="text-2xl font-bold">Log in</CardTitle>
              <CardDescription>
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
                <Input
                  id="password"
                  required
                  type="password"
                />
              </div>
              <Button className="w-full" type="submit">
                Sign in with Email
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