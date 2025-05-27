"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TaxonomiesPageTitle } from "../taxonomies_shared";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, Trash, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteTag } from "@/lib/actions/tags";
import { DataTableTags } from "./data-table-tags";

export const TagPage = ({ tags = [] }) => {
  const { toast } = useToast();
  const [selectedTagId, setSelectedtagId] = useState("");

  const handleOnDelete = async () => {
    if (!selectedTagId) return;

    // API call here
    try {
      const res = await deleteTag(selectedTagId);

      //  delete sucess fully
      if (res.success) {
        toast({
          title: "Category Deleted Successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Seomthing went Wrong",
        variant: "destructive",
      });
      setSelectedTagId(null);
    }
  };

  return (
    <div className="space-y-4">
      <TaxonomiesPageTitle
        title={"tags"}
        buttoninfo={{
          buttonName: "add tag",
          buttonurl: "/dashboard/admin/taxonomies/tags/new",
        }}
      />

      <DataTableTags tags={tags} />
    </div>
  );
};
