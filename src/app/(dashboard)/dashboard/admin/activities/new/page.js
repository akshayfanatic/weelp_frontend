"use client";
import React, { useEffect } from "react";
import {
  useForm,
  FormProvider,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { useState } from "react";
import {
  Briefcase,
  Check,
  ChevronsUpDown,
  Command,
  MapPin,
  Plus,
  PlusCircle,
  User,
  X,
} from "lucide-react";
import { log } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  getAllAttributesAdmin,
  getAllCitiesAdmin,
  getAllTagsAdmin,
  getCategoriesAdmin,
} from "@/lib/services/global";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Combobox } from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ComboboxMultiple,
  ComboboxMultipleAttribute,
} from "@/components/ui/combobox_multi";
import { Card } from "@/components/ui/card";

const CreateActivityPage = () => {
  const methods = useForm({ mode: "onChange" });
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  // Handle Global Level Error
  const { errors, isValid } = methods?.formState;

  //  Main Steps
  const steps = [
    {
      id: 1,
      title: "Basic Information",
      description: "Name , description and status",
    },
    {
      id: 2,
      title: "Location",
      description: "Activity type and where it takes place",
    },
    {
      id: 3,
      title: "Taxonomies & Attributes",
      description: "Duration , difficulty and requirements",
    },
    {
      id: 4,
      title: "Pricing & Booking",
      description: "Prices , group sizes, and booking info",
    },
  ];

  const NavigationForm = () => {
    return (
      <div className="flex justify-between w-full py-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create new Activity
          </h1>
          <p className="text-sm text-muted-foreground">
            Create a new activity for your customers
          </p>
        </div>
        <div className="flex gap-4">
          <Button className={"bg-white text-black border hover:bg-white "}>
            Cancel
          </Button>
          <Button className={"bg-secondaryDark hover:bg-secondaryDark"}>
            Create Activity
          </Button>
        </div>
      </div>
    );
  };

  // Basic Information
  const PersonalInfoTab = () => {
    const {
      register,
      watch,
      getValues,
      formState: { errors },
    } = methods;

    return (
      <div className="space-y-4 py-6">
        <div className="pb-2 space-y-2">
          <Label
            htmlFor="name"
            className={`block text-sm font-medium ${
              errors?.name ? "text-red-400" : "text-gray-700"
            }`}
          >
            Name
          </Label>
          <Input
            placeholder="Activity name"
            id="name"
            {...register("name", { required: "Name is required" })}
            className="mt-1 p-2 text-sm block w-full rounded-md border border-gray-300 shadow-sm focus:outline-secondaryDark"
          />
          {errors?.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="pb-2 space-y-2">
          <Label
            htmlFor="description"
            className={`block text-sm font-medium ${
              errors?.description ? "text-red-400" : "text-gray-700"
            }`}
          >
            Description
          </Label>
          <Textarea
            placeholder="Detailed description"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="mt-1 p-2 text-sm block w-full rounded-md border border-gray-300 shadow-sm h-28 focus:outline-secondaryDark"
          />
          {errors?.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="pb-2 space-y-2">
          <Label
            htmlFor="short_description"
            className={`block text-sm font-medium ${
              errors?.short_description ? "text-red-400" : "text-gray-700"
            }`}
          >
            Short Description
          </Label>
          <Textarea
            placeholder="Short description"
            id="short_description"
            {...register("short_description", {
              required: "Field is required",
            })}
            className="mt-1 p-2 text-sm block w-full rounded-md border border-gray-300 h-20 focus:outline-secondaryDark"
          />
          {errors?.short_description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.short_description.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            Feature Activity
          </label>
          <Controller
            name="featured_activity"
            defaultValue={false}
            control={methods.control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className="group relative inline-flex h-6 w-11 items-center rounded-full transition bg-gray-300 data-[state=checked]:bg-secondaryDark"
              >
                <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition-transform group-data-[state=checked]:translate-x-5" />
              </Switch>
            )}
          />
        </div>
      </div>
    );
  };

  // Locations
  const LocationsTab = () => {
    const [allCities, setAllCities] = useState([]);

    // Fetch all attributes & categories
    useEffect(() => {
      const getData = async () => {
        const cities = await getAllCitiesAdmin();
        setAllCities(cities);
      };

      getData();
    }, []);

    const {
      register,
      control,
      watch,
      getValues,
      setValue,
      formState: { errors },
    } = methods;

    const {
      fields: locationFields,
      append: appendLocation,
      remove: removeLocation,
    } = useFieldArray({
      control,
      name: "locations", // Field array for locations
    });

    return (
      <div className="space-y-4">
        {/* Min Group Size */}
        <div className="flex justify-between gap-4 py-2">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Minimum Age
            </label>
            <Controller
              name="minimum_age"
              control={methods?.control}
              rules={{ required: "Field required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min={1}
                  placeholder="Min Age"
                  value={field.value || ""} // Ensure it's controlled
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus-visible:focus:outline-secondaryDark"
                />
              )}
            />

            {errors.minimum_age && (
              <p className="text-red-500 text-sm mt-1">
                {errors.minimum_age.message}
              </p>
            )}
          </div>

          {/** Max Group Size */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Max Group Size
            </label>
            <Controller
              name="maxgroup_size"
              control={methods.control}
              defaultValue=""
              rules={{ required: "Group Size Required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min={1}
                  max={50}
                  placeholder="Max group size"
                  value={field.value || ""} // Ensure it's controlled
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus-visible:outline-secondaryDark"
                />
              )}
            />
            {errors?.maxgroup_size && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxgroup_size.message}
              </p>
            )}
          </div>
        </div>

        {/* Locations */}
        <div>
          <label className="block py-2 text-sm font-medium text-gray-700">
            Locations
          </label>
          <p className="py-4 px-8 space-y-4 bg-white">
            {/* Primary Location */}
            <span className="block pb-2 text-sm font-medium text-gray-700">
              Primary Location
            </span>
            {methods.formState.errors?.locations && (
              <span className="text-red-400">All Fields Required</span>
            )}

            <Controller
              name="locations.0.city_id"
              control={methods.control}
              render={({ field }) => (
                <Combobox
                  data={allCities}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="locations.0.location_label"
              control={methods.control}
              rules={{ required: "Type required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full rounded-md text-start focus:outline-secondaryDark">
                    <SelectValue placeholder="Location Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Starting Point", "Main Location", "End Point"].map(
                      (category, index) => (
                        <SelectItem
                          className="capitalize"
                          key={index}
                          value={category}
                        >
                          {category}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />

            {/* Hidden Input to Set Primary Type */}
            <input
              type="hidden"
              {...methods.register("locations.0.location_type")}
              value="primary"
            />

            {/* Primary Location Duration
            <Controller
              name="locations.0.duration"
              control={methods.control}
              defaultValue={0}
              rules={{ required: "Field Required" }}
              render={({ field }) => (
                <Input
                  type="number"
                  min={1}
                  placeholder="Duration (in minutes)"
                  className="w-full p-2 mt-2 border rounded-md"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            /> */}
          </p>

          {/* Additional Locations */}
          <div className="flex flex-col w-full">
            {locationFields.slice(1).map((item, index) => (
              <div key={item.id} className="mt-4 py-4 px-8 space-y-4 bg-white">
                <span className="block text-sm font-medium text-gray-700">
                  Additional Location {index + 1}
                </span>

                <Controller
                  name={`locations[${index + 1}].city_id`}
                  control={methods.control}
                  render={({ field }) => (
                    <Combobox
                      data={allCities}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <div className="flex items-center gap-4">
                  <Controller
                    name={`locations[${index + 1}].location_label`}
                    control={methods.control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full rounded-md text-start focus:outline-secondaryDark">
                          <SelectValue placeholder="Location Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {["StopOver", "Highlight", "Optional"].map(
                            (category, idx) => (
                              <SelectItem
                                className="capitalize"
                                key={idx}
                                value={category}
                              >
                                {category}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {/* Addional Location Duration */}
                  <Controller
                    name={`locations[${index + 1}].duration`}
                    control={methods.control}
                    defaultValue={1}
                    rules={{ required: "Field Required" }}
                    render={({ field }) => (
                      <Input
                        type="number"
                        min={1}
                        placeholder="Duration (in minutes)"
                        className="w-full p-2 mt-2 border rounded-md"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />

                  {/* Hidden Input to Set Additional Type */}
                  <Input
                    type="hidden"
                    {...methods.register(
                      `locations[${index + 1}].location_type`
                    )}
                    value="additional"
                  />

                  <X
                    onClick={() => removeLocation(index + 1)}
                    className="hover:cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add Additional Location Button */}
          <Button
            type="button"
            onClick={() =>
              appendLocation({
                city_id: null,
                location_label: "",
                location_type: "additional", // Predefined as additional
                duration: null,
              })
            }
            className="mt-4 w-full bg-white text-black hover:bg-inherit border shadow-sm"
          >
            Add Additional Location
          </Button>
        </div>
      </div>
    );
  };

  // Attributes and Taxonomies
  const TaxonomiesAttributesTab = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [allAttributes, setAllAttributes] = useState([]);
    const [allTags, setAlltags] = useState([]);

    // Fetch all attributes & categories
    useEffect(() => {
      const getData = async () => {
        const categories = await getCategoriesAdmin();
        const attributes = await getAllAttributesAdmin();
        const tags = await getAllTagsAdmin();
        setAllCategories(categories);
        setAlltags(tags);
        setAllAttributes(attributes);
      };

      getData();
    }, []);

    const {
      register,
      getValues,
      formState: { errors },
    } = methods;

    return (
      <div className="space-y-4">
        {/* Categories */}
        <div>
          <Label
            htmlFor={"categories"}
            className="block py-2 text-sm font-medium text-gray-700"
          >
            Categories
          </Label>
          <Controller
            control={methods.control}
            name="categories"
            rules={{ required: "Categories Required" }}
            render={({ field: { value, onChange } }) => (
              <ComboboxMultiple
                id={"categories"}
                type={"categories"} //Required
                items={allCategories} //Required
                value={value || []} //Required
                onChange={onChange} //Required
              />
            )}
          />
          {errors?.categories && (
            <span className="text-red-400">{errors?.categories?.message}</span>
          )}
        </div>

        {/* Tags */}
        <div>
          <Label
            htmlFor={"tags"}
            className="block py-2 text-sm font-medium text-gray-700"
          >
            Tags
          </Label>

          {/* Dropdown that allows multiple selections */}
          <Controller
            control={methods.control}
            name="tags"
            rules={{ required: "Tags Required" }}
            render={({ field: { value, onChange } }) => (
              <ComboboxMultiple
                id={"tags"}
                type={"tags"} // Required
                items={allTags} //Required
                value={value || []} //Required
                onChange={onChange} //Required
              />
            )}
          />

          {errors?.tags && (
            <span className="text-red-400">{errors?.tags?.message}</span>
          )}
        </div>

        {/* Attributes */}
        <div>
          <Label
            htmlFor={"attributes"}
            className="block py-2 text-sm font-medium text-gray-700"
          >
            Attributes
          </Label>
          <Controller
            name="attributes"
            defaultValue={[]}
            control={methods?.control}
            rules={{ required: "Please Select Attributes" }}
            render={({ field: { onChange, value } }) => (
              <ComboboxMultipleAttribute
                id={"attributes"}
                attributes={allAttributes}
                value={value}
                onChange={onChange}
              />
            )}
          />

          {errors?.attributes && (
            <span className="text-red-400">{errors?.attributes?.message}</span>
          )}
        </div>

        <div className="hidden  justify-between gap-4 py-2">
          {/* Duration Input */}
          <div className="w-full">
            <Label
              htmlFor={"duration"}
              className="block text-sm font-medium text-gray-700"
            >
              Duration
            </Label>
            <Controller
              name="duration"
              control={methods?.control}
              rules={{ required: "Duration is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  min={1}
                  type="number"
                  id={"duration"}
                  value={field.value || ""} // Ensure it's controlled
                  onChange={(e) => field.onChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus-visible:outline-secondaryDark"
                />
              )}
            />

            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <Label
              htmlFor={"unit"}
              className="block text-sm font-medium text-gray-700"
            >
              Unit
            </Label>
            <Controller
              name="unit"
              control={methods.control}
              defaultValue="hours"
              rules={{ required: { message: "Field Required" } }}
              render={({ field }) => (
                <Select
                  id={"unit"}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="mt-1 w-full capitalize rounded-md focus:outline-secondaryDark">
                    <SelectValue placeholder="Select a unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {["minutes", "hours", "day"].map((val, index) => (
                      <SelectItem
                        key={index}
                        value={val}
                        className="capitalize"
                      >
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="w-full py-2">
          <Label
            htmlFor={"difficulty"}
            className="block text-sm font-medium text-gray-700"
          >
            Difficulty Level
          </Label>
          <Controller
            name="difficulty"
            control={methods.control}
            defaultValue="easy"
            render={({ field }) => (
              <Select
                id={"difficulty"}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger className="mt-1 w-full capitalize rounded-md p-2 focus:outline-secondaryDark">
                  <SelectValue placeholder="Select a unit" />
                </SelectTrigger>
                <SelectContent>
                  {["easy", "moderate", "challenging", "experts"].map(
                    (val, index) => (
                      <SelectItem
                        key={index}
                        value={val}
                        className="capitalize"
                      >
                        {val}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    );
  };

  // Pricing Tab
  const PricingTab = () => {
    const [isSeasonPricing, setSeasonPricing] = useState(false);

    // setup price
    const {
      register,
      formState: { errors },
    } = methods;

    return (
      <div className="space-y-6">
        {/* Base Pricing */}
        <div className="flex flex-col justify-between gap-4 p-8 shadow-md bg-white rounded-md">
          <h3 className="text-lg font-medium text-gray-900">$ Base Pricing</h3>
          <div className="w-full flex gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="regular_price" className="w-full">
                Regular Price
              </Label>
              <Controller
                name="pricing.regular_price"
                control={methods.control}
                defaultValue={0}
                rules={{ required: "Base Price is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="regular_price"
                    type="number"
                    required={true}
                    min={1}
                    placeholder="e.g: 10 , 20"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />

              {errors?.pricing?.regular_price && (
                <span className="text-red-500 text-sm">
                  {errors.pricing.regular_price.message}
                </span>
              )}
            </div>

            <div className="w-full space-y-2">
              <Label htmlFor="currency" className="w-full">
                Currency
              </Label>
              <Controller
                name="pricing.currency"
                control={methods?.control}
                defaultValue="USD" // 👈 Ensures it has a default value
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? "USD"} // 👈 Ensures it's never undefined
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div>
            {/* Switch */}
            <div className="flex items-center gap-4">
              <Switch
                className={isSeasonPricing ? "stroke-secondaryDark fill-secondaryDark" : ""}
                checked={isSeasonPricing}
                onCheckedChange={() => {
                  setSeasonPricing(!isSeasonPricing);
                }}
              />
              <Label className="text-sm font-medium text-gray-900">
                Enable Seasonal Pricing
              </Label>
            </div>
            {isSeasonPricing &&<span>ys</span>}
          </div>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoTab />;
      case 2:
        return <LocationsTab />;
      case 3:
        return <TaxonomiesAttributesTab />;
      case 4:
        return <PricingTab />;
      default:
        return null;
    }
  };

  const onSubmit = (data) => {
    if (currentStep < 4) {
      setFormData({ ...formData, ...data });
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Form submitted:", { ...formData, ...data });
      // Handle final submission
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-12 sm:px-6 lg:px-8">
      <NavigationForm />
      <div className="w-full space-y-8">
        <FormProvider {...methods}>
          <div className="w-full bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mb-8 w-full">
              <ul className="flex justify-between gap-8 items-center w-full mb-4  ">
                {steps &&
                  steps.map((step) => (
                    <li
                      key={step.id}
                      onClick={() => {
                        setCurrentStep(step?.id);
                      }}
                      className={`flex flex-col items-center w-full space-y-1 cursor-pointer group relative`}
                    >
                      <Separator
                        className={` pt-1 rounded-full   ${
                          currentStep >= step?.id &&
                          "bg-secondaryDark group-hover:bg-blue-600 "
                        }`}
                      />

                      <div className={`text-sm font-medium pt-2`}>
                        {step.title}
                      </div>
                      <span className="text-sm text-gray-500">
                        {step?.description}
                      </span>
                      {/* {step?.id === currentStep && !isValid && <span className="absolute top-full text-sm text-red-400">Field Requireds To Toggle</span>} */}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            {renderStep()}

            <div className="flex justify-between pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Previous
                </button>
              )}
              <button
                type="submit"
                className="ml-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondaryDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {currentStep === 4 ? "Submit" : "Next"}
              </button>
            </div>
            {isValid ? "yes" : "no"}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateActivityPage;
