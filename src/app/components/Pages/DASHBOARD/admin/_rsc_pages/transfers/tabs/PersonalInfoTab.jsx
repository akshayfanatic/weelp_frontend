import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateSlug } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { TRANSFER_TYPES } from "@/lib/constants/transfer";

// Basic Information
const PersonalInfoTab = () => {
  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useFormContext();

  // handling value when blur
  const handleBlur = () => {
    const name = getValues("name");
    const currentSlug = getValues("slug");
    const newSlug = generateSlug(name);

    if (currentSlug !== newSlug) {
      setValue("slug", newSlug);
    }
  };


  return (
    <div className="space-y-4 py-6">
      <h2 className="text-base font-semibold text-[#09090B]">Transfer Details</h2>
      <p className="text-sm text-gray-600">Enter the basic detail of transfer service</p>

      {/* Name */}
      <div className="flex w-full gap-4 flex-col sm:flex-row">
        <div className="pb-2 space-y-2 w-full">
          <Label htmlFor="name" className={`block text-sm font-medium ${errors?.name ? "text-red-400" : "text-black"}`}>
            Name
          </Label>
          <Input
            placeholder="Enter Transfer Name"
            id="name"
            {...register("name", { required: "Name is required" })}
            className="mt-1 p-2 text-sm block w-full rounded-md border border-gray-300 shadow-sm focus-visible:ring-secondaryDark"
            onBlur={handleBlur}
          />
          {errors?.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="pb-2 space-y-2 w-full">
          <Label htmlFor="slug" className={`block text-sm font-medium ${errors?.slug ? "text-red-400" : "text-black"}`}>
            Slug
          </Label>
          <Input
            placeholder="Enter Url slug"
            id="slug"
            {...register("slug", { required: "Slug is required" })}
            className="mt-1 p-2 text-sm block w-full rounded-md border border-gray-300 shadow-sm focus-visible:ring-secondaryDark"
            onBlur={handleBlur}
          />
          {errors?.slug && <p className="text-red-500 text-sm mt-1">{errors?.slug.message}</p>}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className={`block text-sm font-medium ${errors?.description ? "text-red-400" : "text-black"}`}>
          Description
        </Label>
        <Textarea
          placeholder="Detailed description"
          id="description"
          {...register("description", {
            required: "Description is required",
          })}
          className="mt-1 p-2 text-sm block w-full rounded-md border border-gray-300 shadow-sm focus-visible:ring-secondaryDark"
        />
        {errors?.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      {/* Transfer Type */}
      <div className="space-y-2">
        <Label htmlFor="transfer_type" className={`block text-sm font-medium ${errors?.transfer_type ? "text-red-400" : "text-black"}`}>
          Transfer Type
        </Label>
        <Controller
          name="transfer_type"
          control={control}
          rules={{ required: "Field Required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select transfer type" />
              </SelectTrigger>
              <SelectContent>
                {TRANSFER_TYPES.map((transfer) => (
                  <SelectItem key={transfer.value} value={transfer.value}>
                    {transfer.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors?.transfer_type && <p className="text-red-500 text-sm mt-1">{errors?.transfer_type?.message}</p>}
      </div>
    </div>
  );
};

export default PersonalInfoTab;
