'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { useSidebar } from '@/components/ui/sidebar';
import { Menu, User } from 'lucide-react';
import UserMenu from '../UserMenu';

const AdminHeader = () => {
  const { isMobile, toggleSidebar } = useSidebar();
  return (
    <header className="h-16 border-b bg-white px-4">
      <div className="flex h-full items-center sm:justify-between gap-4 ">
        {isMobile && <Menu className="cursor-pointer" onClick={toggleSidebar} />}
        <div className="w-full max-w-xs sm:max-w-xl self-center sm:flex-[3] ">
          <Input type="search" placeholder="Search..." className="w-full" />
        </div>

        <div className="flex sm:w-full max-w-fit justify-center items-start">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
