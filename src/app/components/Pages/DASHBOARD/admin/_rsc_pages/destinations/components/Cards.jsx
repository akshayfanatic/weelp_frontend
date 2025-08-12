import React from "react";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Download, Ellipsis, MapPin, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

/**
 * DestinationListCard component displaying the DestinationListCard component
 * @param {{label:string, icon:string, items:number ,description:string, url:string}} props label,icons,items,description,url
 * @returns {JSX.Element}
 */
export const DestinationListCard = ({ label, icon, items, description, url }) => {
  const IconComponent = icon;
  return (
    <Card className="w-[53rem] h-50 hover:bg-accent">
      <CardHeader className="flex-row justify-between">
        <div className="flex flex-row justify-between w-full">
          <div>
            <CardTitle className="text-sm">{label}</CardTitle>
            <Badge className="bg-accent text-black hover:text-white">{items} items</Badge>
          </div>
          <IconComponent size={18} />
        </div>
      </CardHeader>
      <CardContent>
        <p className=" text-gray-600 pb-4">{description}</p>
        <div className="flex items-center justify-between gap-3 ">
          <Link href={url} aschild="true" className="w-full">
            <Button className="w-full bg-accent text-black text-sm hover:text-white">
              <MapPin></MapPin>View
            </Button>
          </Link>
          <Button variant="outline">
            <Download />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * DestinationRouteCard component displaying the DestinationRouteCard component
 * @param {{label:string, icon:string, items:number ,description:string, url:string}} props label,icons,items,description,url
 * @returns {JSX.Element}
 */
export const RouteCard = () => {
  return (
    <Card className="sm:max-w-xs overflow-hidden rounded-lg border">
      {/*  Image wrapper must be relative + have height */}
      <div className="relative w-full h-40">
        <Image
          src="https://picsum.photos/id/237/400/300"
          alt="Route image"
          fill
          className="object-cover"
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
      </div>

      {/* ✅ Content section */}
      <CardContent>
        <div className="flex justify-between pt-4">
          <div>
            <CardTitle>France</CardTitle>
            <CardDescription>Code: FR</CardDescription>
          </div>

          {/* DropDown Menu */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Ellipsis size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end" sideOffset={10}>
                <DropdownMenuItem>
                  <Pencil size={14} /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <Trash2 size={14} />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <p>Known for its rich culture, iconic landmarks like the Eiffel Tower, world- ...</p>
        {/* Badges Data */}
        <div>
          <Badge className="bg-accent text-black hover:bg-accent">country</Badge>
        </div>
      </CardFooter>
    </Card>
  );
};
