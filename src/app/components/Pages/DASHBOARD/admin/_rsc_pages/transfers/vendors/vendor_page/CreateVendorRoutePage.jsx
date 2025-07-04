import dynamic from "next/dynamic";

const CreateVendorRouteDialog = dynamic(() => import("../modals/CreateVendorRouteDialog")); // import Createvendor Form
const FilterVendorRoutePage = dynamic(() => import("../vendor_filters/FilterVendorRoutePage")); // import Filter Vendor Route Form

const CreateVendorPageRoute = () => {
  return (
    <div>
      <CreateVendorRouteDialog title={"Routes"} desciption={"Manage your transfer routes and pricing"} label={"Add Route"} />
      <FilterVendorRoutePage />
    </div>
  );
};

export default CreateVendorPageRoute;
