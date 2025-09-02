"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function ModalLayout({ children }) {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogTitle className="sr-only">Review Form</DialogTitle>
      <DialogDescription className="sr-only" aria-describedby={undefined}>
        A Form Dialog Form Creating/Editing Review
      </DialogDescription>
      <DialogContent className="max-w-md w-full h-[60vh] overflow-y-auto ">{children}</DialogContent>
    </Dialog>
  );
}
