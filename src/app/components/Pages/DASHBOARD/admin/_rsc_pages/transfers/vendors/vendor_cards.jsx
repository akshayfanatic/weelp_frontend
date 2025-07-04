import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MapPin, MoreHorizontal } from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

export const CardVendor = ({ id, title = "", description = "", status = "", vehicles = "", routes = "" }) => {
  const router = useRouter(); // intialize route
  return (
    <Card className="max-w-full md:max-w-md space-y-2">
      <CardHeader className="flex flex-row justify-between items-start p-4 md:p-6">
        <div className="space-y-2">
          <CardTitle className="first-letter:capitalize">{title}</CardTitle>

          {status === "Active" && (
            <Badge className="w-fit" variant="success">
              active
            </Badge>
          )}

          {status === "Inactive" && (
            <Badge className="w-fit" variant="destructive">
              inactive
            </Badge>
          )}

          {status === "Pending" && (
            <Badge className="w-fit bg-yellow-400" variant="ghost">
              pending
            </Badge>
          )}

          <CardDescription>{description}</CardDescription>
        </div>

        {/* DropDown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto" align="end" offset={10}>
            <DropdownMenuItem className="px-2 py-1 text-sm hover:bg-[#f5f5f5] transition focus-visible:outline-none" onClick={() => router.push(`/dashboard/admin/transfers/vendors/${id}`)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="px-2 py-1 text-sm hover:bg-[#f5f5f5] transition focus-visible:outline-none" onClick={() => router.push(`/dashboard/admin/transfers/vendors/${id}/routes`)}>
              Routes
            </DropdownMenuItem>
            <DropdownMenuItem className="px-2 py-1 text-sm hover:bg-[#f5f5f5] transition focus-visible:outline-none" onClick={() => router.push(`/dashboard/admin/transfers/vendors/${id}/pricing`)}>
              Pricing
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-2 py-1 text-sm hover:bg-[#f5f5f5] transition focus-visible:outline-none"
              onClick={() => router.push(`/dashboard/admin/transfers/vendors/${id}/availability`)}
            >
              Availability
            </DropdownMenuItem>
            <DropdownMenuItem className="px-2 py-1 text-sm hover:bg-[#f5f5f5] transition focus-visible:outline-none" onClick={() => router.push(`/dashboard/admin/transfers/vendors/${id}/vehicles`)}>
              Vehicles
            </DropdownMenuItem>
            <DropdownMenuItem className="px-2 py-1 text-sm hover:bg-[#f5f5f5] transition focus-visible:outline-none" onClick={() => router.push(`/dashboard/admin/transfers/vendors/${id}/drivers`)}>
              Drivers
            </DropdownMenuItem>
            <DropdownMenuItem className="px-2 py-1 text-sm hover:bg-[#f5f5f5] transition focus-visible:outline-none text-red-600">Deactivate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <p className="text-sm font-normal">
          {vehicles && `Vehicle Types: ${vehicles}`} <br />
          {routes && `Service Areas: ${routes}`} <br />
          Suburbs Operating Hours: 06:00 - 22:00
        </p>
      </CardContent>

      <CardFooter className="grid md:grid-flow-col gap-2 p-4">
        <Button variant="outline" className="p-2" onClick={() => router.push(`/dashboard/admin/transfers/vendors/${id}/routes`)}>
          Routes
        </Button>
        <Button variant="outline" className="p-2" onClick={() => router.push(`/dashboard/admin/transfers/vendors/${id}/pricing`)}>
          Pricing
        </Button>
        <Button variant="outline" className="p-2" onClick={() => router.push(`/dashboard/admin/transfers/vendors/${id}/availability`)}>
          Availability
        </Button>
      </CardFooter>
    </Card>
  );
};

export const CardVendorRoute = ({ id, title = "", description = "", status = "", start_point = "", end_point = "", base_price = "", price_per_km = "" }) => {
  const router = useRouter(); // intialize route
  return (
    <Card className="max-w-full md:max-w-md space-y-2">
      <CardHeader className="flex flex-row justify-between items-start p-4 md:p-6 md:pb-4">
        <div className="space-y-4">
          <CardTitle className="first-letter:capitalize">{title}</CardTitle>
          <CardDescription className="text-sm first-letter:capitalize">{description}</CardDescription>
        </div>

        {status === "Active" && (
          <Badge className="w-fit" variant="success">
            active
          </Badge>
        )}

        {status === "Inactive" && (
          <Badge className="w-fit" variant="destructive">
            inactive
          </Badge>
        )}

        {status === "Pending" && (
          <Badge className="w-fit bg-yellow-400" variant="ghost">
            pending
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex flex-col pb-0">
        {start_point && (
          <span className="inline-flex text-sm items-center gap-2">
            <MapPin size={16} />
            From: {start_point}
          </span>
        )}

        {end_point && (
          <span className="inline-flex text-sm items-center gap-2">
            <MapPin size={16} />
            From: {end_point}
          </span>
        )}
      </CardContent>

      <CardFooter className="grid md:grid-flow-col gap-2  p-8 pt-0">
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span>Base Price:</span>
            <span className="font-medium">{base_price}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Price per KM:</span>
            <span className="font-medium">{price_per_km}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};


export const CardVendorPricing = ({
  vendor_id,
  name = "",
  description = "",
  status = "",
  base_price = "",
  price_per_km = "",
  min_distance = "",
  waiting_charge = "",
  peak_hour_multiplier = "",
  night_charge_multiplier = "",
}) => {
  return (
    <Card className="max-w-full md:max-w-md space-y-2">
      <CardHeader className="flex flex-row justify-between items-start p-4 md:p-6 md:pb-4">
        <div className="space-y-4">
          <CardTitle className="first-letter:capitalize">{name || "Unnamed Tier"}</CardTitle>
          <CardDescription className="text-sm first-letter:capitalize">{description || "No description provided"}</CardDescription>
        </div>

        {status === "Active" && (
          <Badge className="w-fit" variant="success">
            active
          </Badge>
        )}

        {status === "Inactive" && (
          <Badge className="w-fit" variant="destructive">
            inactive
          </Badge>
        )}

        {status === "Pending" && (
          <Badge className="w-fit bg-yellow-400" variant="ghost">
            pending
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex flex-col space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="font-light">Base Price:</span>
          <span className="font-medium">₹{base_price}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-light">Price per KM:</span>
          <span className="font-medium">₹{price_per_km}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-light">Minimum Distance:</span>
          <span className="font-medium">{min_distance} km</span>
        </div>

        <div className="flex justify-between">
          <span className="font-light">Waiting Charge:</span>
          <span className="font-medium">₹{waiting_charge}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-light">Night Charge Multiplier:</span>
          <span className="font-medium">×{night_charge_multiplier}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-light">Peak Hour Multiplier:</span>
          <span className="font-medium">×{peak_hour_multiplier}</span>
        </div>
      </CardContent>
    </Card>
  );
};
