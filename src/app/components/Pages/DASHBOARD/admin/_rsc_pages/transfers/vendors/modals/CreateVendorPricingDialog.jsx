"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import dynamic from "next/dynamic";

const CreateVendorPricingForm = dynamic(() => import("../vendor_form/CreateVendorPricingForm"), { ssr: false }); // for lazy load

// Order Navigation
const CreateVendorPricingDialog = ({ title, desciption, label }) => {
  const [open, setOpen] = useState(false);

  // title description
  if (title && desciption) {
    return (
      <div className="flex justify-between w-full py-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-4">{title}</h1>
          <p className="text-sm text-muted-foreground">{desciption}</p>
        </div>

        {label && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)} className="bg-secondaryDark text-white">
                <span className="flex items-center gap-2">
                  <Plus size={16} />
                  {label}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Pricing Tier</DialogTitle>
                <DialogDescription>Create a new pricing tier with rates and features</DialogDescription>
              </DialogHeader>

              {/* Create Vendor Form*/}
              <CreateVendorPricingForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  }
  return <div className="flex justify-between w-full py-4 font-extrabold"> Props Not Passed </div>;
};

export default CreateVendorPricingDialog;
