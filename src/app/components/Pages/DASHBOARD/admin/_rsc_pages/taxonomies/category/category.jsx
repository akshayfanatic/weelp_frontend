import axios from "axios";
import { TaxonomiesPageTitle } from "../taxonomies_shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/axiosInstance";
import { Badge } from "@/components/ui/badge";

// ✅ Fetch Function using axios
const fetchCategories = async () => {
  try {
    const response = await authApi.get("/api/activity-categories");
    return response.data;
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
};

export const CategoryPage = async () => {
  const data = await fetchCategories();
  let categories = data ?? [];
  //  categories=response || [];
  return (
    <div>
      <TaxonomiesPageTitle
        title="Categories"
        description="Manage activity categories and their organization"
        buttoninfo={{
          buttonName: "Add Category",
          buttonurl: "/dashboard/admin/taxonomies/categories/new",
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Categories</CardTitle>
          <CardDescription>
            A list of all categories for organizing activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell>{category.description || "N/A"}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          "bg-green-50 text-green-700 hover:text-green-700 hover:bg-gray-50"
                        }
                      >
                        active
                      </Badge>
                    </TableCell>
                    <TableCell className="">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {/* <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem> */}
                          <DropdownMenuItem className="text-red-600 cursor-pointer">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
