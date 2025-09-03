// @ts-check

/**
 * @type {ReviewStatus[]}
 */
export const REVIEW_STATUS = ["approved", "pending"];

/**
 * @type {ReviewFormValues}
 */
export const FORM_REVIEWS_VALUES_DEFAULT = {
  user_id: null,
  item_type: "",
  item_id: null,
  rating: null,
  review_text: "",
  media_gallery: [],
  status: "approved",
};

/**
 * @type {ReviewSelectOption[]}
 */
export const FORM_REVIEW_ITEM_TYPE = [
  { value: "package", label: "Package" },
  { value: "activity", label: "Activity" },
  { value: "itinerary", label: "Itinerary" },
];




