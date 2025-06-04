/* eslint-disable @typescript-eslint/no-unused-vars */
// components/Navbar.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Bell, HelpCircle } from 'lucide-react';

interface NavbarProps {
  handleConnectCloud: () => void;
}
interface NavbarProps {
  handleDashboard: () => void;
}
export default function Navbar({ handleConnectCloud,handleDashboard }: NavbarProps) {
  return (
    <header className="flex h-14 items-center border-b bg-background -ml-5 w-full justify-between px-6">
      <nav className="flex">
        <Button variant="ghost" className="font-semibold" onClick={handleDashboard}>
          SkyBridge
        </Button>
      </nav>
      <div className="ml-auto flex items-center  gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button onClick={handleConnectCloud}>☁️ Add Cloud</Button>
      </div>
    </header>
  );
}
