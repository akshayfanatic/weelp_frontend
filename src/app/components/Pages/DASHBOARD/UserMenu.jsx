"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut , Home } from "lucide-react";
import { Card } from "@/components/ui/card";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar"/>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Card className="flex flex-col space-y-2 shadow-none border-none">
          <Button asChild variant="ghost" className="justify-start">
            <Link href={"/"}>
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="justify-start text-red-500 hover:bg-red-100"
            onClick={() => {
              signOut();
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
