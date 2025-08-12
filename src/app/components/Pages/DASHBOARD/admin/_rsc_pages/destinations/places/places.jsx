"use client";
import React from "react";
import { NavigationDestinations } from "../components/Navigation";
import { useForm, FormProvider } from "react-hook-form";
import { SearchBar } from "../components/SearchBar";
import { RouteCard } from "../components/Cards";

export const PlacesPage = () => {
  const methods = useForm();

  // handle onsubmit
  const onSubmit = () => {};
  return (
    <>
      <NavigationDestinations title="places" description="Manage tourist attractions and points of interest" url="/dashboard/admin/destinations/places/new" name="Add Place" />

      {/* Form Filter */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className=" space-y-4">
          <SearchBar searchText="Search Places" />

          {/* CardList */}
          <div className="w-full grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 4, 4].map((val, index) => {
              return <RouteCard key={index} />;
            })}
          </div>
        </form>
      </FormProvider>
    </>
  );
};
