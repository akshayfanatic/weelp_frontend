// File Handle Shard Component Regarding Activities

export const NavigationActivity = ({ title, desciption }) => {
  if (title && desciption) {
    return (
      <div className="flex justify-between w-full py-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{desciption}</p>
        </div>
      </div>
    );
  }
  return <div className="flex justify-between w-full py-4 font-extrabold"> Props Not Passed </div>;
};
