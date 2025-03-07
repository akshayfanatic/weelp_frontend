"use client";
import React, { useEffect } from "react";
import {
  Form,
  FormLabel,
  FormDescription,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { generateSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useForm, useWatch } from "react-hook-form";
import { TaxonomyFormNavigation } from "../taxonomies_shared";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// schema
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Category name must be at least 3 characters.",
  }),
  slug: z.string().min(3, {
    message: "Slug is required.",
  }),
  description: z.string().min(3, {
    message: "Please enter a description.",
  }),
});

export const CreateTagPageForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  const nameValue = useWatch({ control: form.control, name: "name" });

  useEffect(() => {
    if (nameValue) {
      form.setValue("slug", generateSlug(nameValue), { shouldValidate: true });
    }
  }, [nameValue, form]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    // resetting form
    form.reset();

    // display notification
    toast({
      title: "Category Created Successfully",
    });
  };

  return (
    <div>
      <TaxonomyFormNavigation
        title={"Create Tag"}
        description={"Add a new tag to organize activities"}
        url={"/dashboard/admin/taxonomies/categories/"}
      />

      <div className="px-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 bg-white border p-6 shadow-sm rounded-lg"
          >
            <fieldset className="flex flex-col gap-4">
              <FormLabel className="font-semibold text-lg">
                Basic Information
              </FormLabel>
              <FormDescription>
                Enter the details for the new tag.
              </FormDescription>

              {/* Category Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g, Family Friendly" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g, family-friendly"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormDescription>
                      This is the URL-friendly version of the name. It should be
                      lowercase and contain only letters, numbers, and hyphens.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter category description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="flex gap-2">
                <Button
                  className="w-fit bg-secondaryDark hover:bg-secondaryDark"
                  type="submit"
                >
                  Create Tag
                </Button>
                <Button
                  className="w-fit bg-inherit hover:bg-inherit text-black border"
                  type="button"
                  onClick={() => {
                    router.push("/dashboard/admin/taxonomies/tags/");
                  }}
                >
                  Cancel
                </Button>
              </p>
            </fieldset>
          </form>
        </Form>
      </div>
    </div>
  );
};
