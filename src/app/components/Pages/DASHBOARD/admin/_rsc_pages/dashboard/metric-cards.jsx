import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Box, DollarSign, TrendingUp, Users } from "lucide-react";

const metricCardsdata = [
  {
    title: "total revenue",
    icon: <DollarSign size={18} className="text-gray-500" />,
    total: 45321,
    change: 20,
  },
  {
    title: "total bookings",
    icon: <Box size={18} className="text-gray-500" />,
    total: 2350,
    change: 180,
  },
  {
    title: "active tours",
    icon: <Activity size={18} className="text-gray-500" />,
    total: 45321,
    change: 19,
  },
  {
    title: "active users",
    icon: <Users size={18} className="text-gray-500" />,
    total: 573,
    change: 10,
  },
];
export const MetricCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
      {metricCardsdata.map((item, index) => (
        <Card key={index} className="cursor-pointer transition-all ">
          <CardHeader className="flex flex-col  justify-between pb-2 flex-wrap">
            <CardTitle className="text-xs font-medium flex items-center justify-between w-full gap-2 capitalize">
              {item.title}
              {item.icon}
            </CardTitle>
            <div className="text-2xl mt-4 block font-bold">
              {index === 0 && "$"}
              {item.total.toLocaleString()}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-green-500 text-[12px] flex flex-wrap gap-1 items-center">
              <TrendingUp size={16} />
              {item.change}{" "}
              <span className="text-gray-400 font-medium">from last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
