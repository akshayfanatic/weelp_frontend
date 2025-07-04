import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// VendorTab
const VendorTab = () => {
  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useFormContext();

  const isVendor = useWatch({ control, name: "isVendor" });

  // vehicletype
  const vehicleType = [
    { label: "Sedan (1-4 passengers)", value: "car" },
    { label: "Van (5-8 passengers)", value: "van" },
    { label: "Minibus (9-16 passengers)", value: "minibus" },
    { label: "Bus (17+ passengers)", value: "bus" },
  ];

  return (
    <div className="space-y-4 py-6">
      <div className="flex items-center space-x-2">
        <Controller
          name="isVendor"
          control={control}
          render={({ field }) => <Switch id="isVendor" className="data-[state=checked]:bg-secondaryDark" checked={field.value} onCheckedChange={field.onChange} />}
        />
        <Label htmlFor="isVendor">Is Vender ?</Label>
      </div>

      {/* Display Form Based on isVendor */}
      {isVendor ? (
        <div>
          <h2 className="text-base font-semibold text-[#09090B]">Select Vendor </h2>
          <p className="text-gray-600 text-sm">Choose a vendor and route for this transfer</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-2 flex-col sm:flex-row">
            <Card className="flex flex-col space-y-2 w-full p-2 border-none">
              <Label htmlFor="pickup_location">PickUp Location</Label>
              <Controller
                name="pickup_location"
                control={control}
                rules={{ required: "Pickup location required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Pickup Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {/* Displaying  Errors */}
              {errors?.pickup_location && <p className="text-red-500 text-sm mt-1">{errors?.pickup_location?.message}</p>}
            </Card>

            <Card className="flex flex-col space-y-2 w-full p-2 border-none">
              <Label htmlFor="dropoff_location">Dropoff Location</Label>
              <Controller
                name="dropoff_location"
                control={control}
                rules={{ required: "Dropoff location required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Dropoff Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {/* Displayin DropOff Location Erro */}
              {errors?.dropoff_location && <p className="text-red-500 text-sm mt-1">{errors?.dropoff_location?.message}</p>}
            </Card>
          </div>

          <Card className="flex flex-col space-y-2 w-full p-2 border-none">
            <Label htmlFor="vehicle_type">Vehicle Type</Label>
            <Controller
              name="vehicleType"
              rules={{ required: "Vehicle Type Required" }}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select or create vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleType.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {/* Displayin DropOff Location Erro */}
            {errors?.vehicleType && <p className="text-red-500 text-sm mt-1">{errors?.vehicleType?.message}</p>}
          </Card>

          <Card className="flex flex-col space-y-2 w-full p-2 border-none">
            <Label htmlFor="inclusions">Inclusion</Label>
            <Textarea id="inclusions" {...register("inclusions" ,{required:"Field Required"})} placeholder="Enter what's included in the transfers" />
              {errors?.inclusions && <p className="text-red-500 text-sm mt-1">{errors?.inclusions?.message}</p>}
          </Card>
        </div>
      )}
    </div>
  );
};

export default VendorTab;
