import { Star, UserRound, ThumbsUp, Trash2, FilePen } from "lucide-react";
import BreakSection from "./BreakSection";
import { SingleProductPhotoGallery } from "./SingleProductPhotoGallery";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ReviewCard = ({ title, rating, comment }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-1 sm:w-[360px] w-full h-[200px] ">
      <h5 className="text-black font-medium text-base">{title}</h5>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, index) => (
            <Star key={index} className="fill-yellow-400 stroke-none" />
          ))}
      </div>
      <p className="text-base text-black overflow-x-hidden tfc_scroll">
        {comment}
      </p>
    </div>
  );
};

export default ReviewCard;

export const ReviewCard2 = ({
  userImageSrc,
  userName,
  galleryImages,
  date,
  title,
  rating,
  comment,
}) => {
  return (
    <div
      className={`bg-white p-6 sm:py-7 sm:px-6 rounded-xl shadow-md flex flex-col gap-2 justify-evenly w-full ${
        galleryImages && galleryImages.length > 0 ? "h-full" : "h-[300px]"
      }`}
    >
      <div className="flex gap-4">
        {userImageSrc ? (
          <img
            className="size-12 rounded-full"
            alt="userImage"
            src={`${userImageSrc}`}
          />
        ) : (
          <UserRound
            size={42}
            className="stroke-gray-400 border-gray-400 border-2 rounded-full"
          />
        )}
        {userName ? (
          <h5 className="flex flex-col gap-1 sm:text-base font-medium capitalize">
            {userName}{" "}
            {date && <span className="text-xs text-gray-400">{date}</span>}
          </h5>
        ) : null}
      </div>

      {rating && (
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <Star key={index} className="fill-yellow-400 stroke-none" />
            ))}
        </div>
      )}
      {galleryImages && galleryImages.length > 0 && (
        <SingleProductPhotoGallery photos={galleryImages} />
      )}

      {title && (
        <h5 className="text-black font-medium sm:text-lg pt-3 capitalize">
          {title}
        </h5>
      )}
      {comment && (
        <p className="text-base text-black capitalize h-24 overflow-y-scroll tfc_scroll">
          {comment}
        </p>
      )}
      <BreakSection marginTop={"mt-2"} className={"mb-4"} />
      <button className="w-fit flex gap-2 items-center group-active:first:fill-secondaryDark ">
        <ThumbsUp
          size={20}
          className=" text-secondaryDark active:fill-secondaryDark "
        />
        <span className="capitalize underline font-medium">helpful</span>
      </button>
    </div>
  );
};

export const SingleProductReviewCard = ({ title, rating, comment }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-1 w-full h-[200px]">
      <h5 className="text-black font-medium text-base">{title}</h5>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, index) => (
            <Star key={index} className="fill-yellow-400 stroke-none" />
          ))}
      </div>
      <p className="text-base text-black overflow-x-hidden tfc_scroll">
        {comment}
      </p>
    </div>
  );
};

// used in user dashboard reviews page
export const UserDashboardReviewCard = () => {
  return (
    <Card className={"flex w-full max-w-full sm:max-w-md flex-col"}>
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <Card className={"shadow-none bg-inherit border-none w-full"}>
          <CardTitle className={"text-[#143042] text-xl"}>
            Evening Desert
          </CardTitle>
          <span className="text-grayDark text-lg">Abu Dhabi</span>
        </Card>
        <Card
          className={"shadow-none bg-inherit border-none flex flex-col w-full"}
        >
          <span className="text-end text-grayDark text-lg">Evening Desert</span>
          <span className="text-end text-[#747474] text-lg sm:text-nowrap">
            Booking ID:4567865431
          </span>
        </Card>
      </CardHeader>
      <Separator className={"w-11/12 mx-auto"} />
      <CardContent className={"space-y-2 py-4"}>
        <CardTitle className={"text-black text-base font-semibold"}>
          Your Review
        </CardTitle>
        <Card className={"shadow-none bg-inherit border-none w-full"}>
          <Card className="flex shadow-none border-none bg-inherit gap-1">
            <Star className="fill-yellow-400 text-yellow-400  size-4" />
            <Star className="fill-yellow-400 text-yellow-400  size-4" />
            <Star className="fill-yellow-400 text-yellow-400  size-4" />
            <Star className="fill-yellow-400 text-yellow-400  size-4" />
          </Card>
        </Card>
        <CardDescription>
          The staff were great, especially Anthony who took care of me for the
          day. Lots of opportunities for taking photos, food and drinks was
          amazing Pack lots of sunscreen and hat
        </CardDescription>
        <Card
          className={
            "shadow-none bg-inherit border-none w-full pt-8 flex justify-end gap-4"
          }
        >
          <Trash2 className="text-[#747474] cursor-pointer" />
          <FilePen className="text-[#747474] cursor-pointer" />
        </Card>
      </CardContent>
    </Card>
  );
};
