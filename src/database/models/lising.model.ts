import { model, Schema } from "mongoose";

const ListingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    video: {
      public_id: String,
      url: String,
    },
    banners: [
      {
        public_id: String,
        url: String,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    facilities: [
      {
        type: String,
      },
    ],
    opening_time: {
      type: String,
      required: true,
    },
    closing_time: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
    contact_no: {
      type: String,
      required: true,
    },
    no_of_rooms: {
      type: Number,
      default: 1,
    },
    monthly_rent: {
      type: Number,
      required: true,
    },
    electricity_cost: {
      type: Number,
    },
    is_call_allowed: {
      type: Boolean,
      default: false,
    },
    extra: {
      main_city: String,
      details: String,
      distance: {
        railway_station: Number,
        library: Number,
        mall: Number,
        medical_shop: Number,
      },
      friends_allowed: {
        type: Boolean,
        default: false,
      },
      for_all: Boolean,
      for_family: Boolean,
      for_girls: Boolean,
      for_boys: Boolean,
      free_electricity: Boolean,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        message: {
          type: String,
        },
        star: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

const Listing = model("Listing", ListingSchema);
export { Listing };
