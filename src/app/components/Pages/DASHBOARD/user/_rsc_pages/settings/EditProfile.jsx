"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editUserProfileAction } from "@/lib/actions/userActions";
import { Trash2 } from "lucide-react";

// Validation schema
const formSchema = z
  .object({
    username: z.string().transform((val) => val),
    email: z.string().transform((val) => val),
    bio: z.string().optional(),
    urls: z
      .array(
        z
          .string()
          .url({ message: "Invalid URL format" })
          .min(1, { message: "URL cannot be empty" }) // Prevent empty strings
      )
      .optional(), // Makes `urls` optional
  })
  .refine((data) => data.bio?.trim() || (data.urls && data.urls.length > 0), {
    message: "Either bio or at least one URL is required",
    path: ["bio"], // Shows the error under `bio`
  })
  .refine((data) => data.bio?.trim() || (data.urls && data.urls.length > 0), {
    message: "Either bio or at least one URL is required",
    path: ["urls"], // Shows the error under `urls`
  });

export function EditProfile({ user }) {
  const { toast } = useToast();
  const { name, email, meta, profile } = user;

  // Then use optional chaining and default values
  const bio = meta?.bio || "";
  const urls = profile?.urls || [];
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: name,
      email: email,
      bio: bio ?? " ",
      urls:
        user?.profile?.urls?.length > 0
          ? user.profile.urls.map(({ url }) => url) // Extract URLs as strings
          : [""], // Default empty string for an input field
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = form;
  // Handling dynamic fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "urls",
  });
  // handle Submission
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      // Append fields only if they exist
      formData.append("bio", data.bio);
      formData.append("urls", JSON.stringify(data.urls));
      // Send to server action
      const result = await editUserProfileAction(formData);
      // await editUserProfileAction(data);
      const { success, message } = result;
      // sucesss
      if (success) {
        toast({
          title: message ?? "Data Submitted SuccessFully",
        });
        return;
      }
      // on failed
      toast({
        variant: "destructive",
        title: message ?? "Data not submitted",
      });
    } catch (error) {
      // error
      toast({
        variant: "destructive",
        title: "Something Went Wrong",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <fieldset
          disabled={isSubmitting}
          className={`${isSubmitting ? "cursor-wait" : "cursor-pointer"}`}
        >
          {/* Username */}
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} disabled />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} disabled />
                </FormControl>
                <FormDescription>
                  You can manage verified email addresses in your email
                  settings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio */}
          <FormField
            control={control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Write something about yourself"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can @mention other users and organizations to link to
                  them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* URLs (Dynamic Array of Fields) */}
          <div className="space-y-2">
            <FormLabel>URLs</FormLabel>
            <FormDescription>
              Add links to your website, blog, or social media profiles.
            </FormDescription>

            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={control}
                name={`urls.${index}`} // Access `urls[index]` directly as a string
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row items-center gap-2">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="http://twitter.com"
                        className="resize-none"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="destructive"
                      className="self-start"
                    >
                      <Trash2 />
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="button"
              className={
                "bg-white text-black border hover:bg-black hover:text-white"
              }
              onClick={() => append("")}
            >
              + Add URL
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isValid}
            className={"bg-secondaryDark mt-4"}
          >
            {isSubmitting ? "Updating Profile" : "Update Profile"}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
