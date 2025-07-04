import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext, Controller, useWatch } from "react-hook-form";

// Pricing Tab
const PricingTab = () => {
  const {
    control,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const isVendor = useWatch({ control, name: "isVendor" });

  // currency option
  const currencyOptions = [
    { label: "USD", value: "usd" },
    { label: "EUR", value: "eur" },
    { label: "GBP", value: "gbp" },
  ];

  // price option
  const priceTypeOptions = [
    { label: "Per Vehicle", value: "per_vehicle" },
    { label: "Per Person", value: "per_person" },
  ];

  return (
    <div className="flex flex-col justify-between py-2  rounded-md space-y-8">
      {isVendor ? (
        <div>Vendor Fields</div>
      ) : (
        <div>
          <Card className="p-6 border-none space-y-4 ">
            <CardHeader className="p-0">
              <CardTitle className="text-base">Pricing Details</CardTitle>
              <CardDescription>Set up pricing for the transfer service</CardDescription>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-0 ">
              <Card className="flex gap-4 border-none">
                {/* Price  */}
                <div className="w-full space-y-2">
                  <Label htmlFor="price">Base Price</Label>
                  <Input id="price" {...register("price", { required: "Price Required", valueAsNumber: true })} type="number" min="0" />

                  {/* Errors */}
                  {errors?.price && <p className="text-red-500 text-sm mt-1">{errors?.price?.message}</p>}
                </div>

                {/* Currency  */}
                <div className="w-full space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Controller
                    name="currency"
                    control={control}
                    rules={{ required: "Currency Required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencyOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {/* Errors */}
                  {errors?.currency && <p className="text-red-500 text-sm mt-1">{errors?.currency?.message}</p>}
                </div>
              </Card>

              {/* priceType  */}
              <div className="w-full space-y-2">
                <Label htmlFor="priceType">Price Type</Label>
                <Controller
                  name="priceType"
                  control={control}
                  rules={{ required: "Price Type required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="priceType">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceTypeOptions.map((price) => {
                          return (
                            <SelectItem key={price.value} value={price.value}>
                              {price.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  )}
                />

                {/* Errors */}
                {errors?.priceType && <p className="text-red-500 text-sm mt-1">{errors?.priceType?.message}</p>}
              </div>
            </CardContent>

            <CardFooter className="p-0 flex flex-col justify-start items-start space-y-4">
              {/* Additinal Charges  */}
              <p className="text-base font-semibold">Addional Charges</p>

              <div className="flex gap-4 flex-col sm:flex-row w-full">
                <div className="w-full space-y-2">
                  <Label htmlFor="extra_charges">Extra Charges</Label>
                  <Input type="number" min="0" {...register("extra_charges", { required: "Field Required", valueAsNumber: true })} />

                  {/* Errors */}
                  {errors?.extra_charges && <p className="text-red-500 text-sm mt-1">{errors?.extra_charges?.message}</p>}
                </div>

                <div className="w-full space-y-2">
                  <Label htmlFor="waiting_charges">Waiting Charges (per hour)</Label>
                  <Input type="number" min="0" {...register("waiting_charges", { required: "Field Required", valueAsNumber: true })} />

                  {/* Errors */}
                  {errors?.waiting_charges && <p className="text-red-500 text-sm mt-1">{errors?.waiting_charges?.message}</p>}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PricingTab;
