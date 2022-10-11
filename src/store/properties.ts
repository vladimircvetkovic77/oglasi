import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

const enum Category {
  FLATS = "flats",
  HOUSES = "houses",
}

const enum Currency {
  USD = "USD",
  EUR = "EUR",
  KN = "KN",
}

const enum Module {
  REAL_ESTATE = "real_estate",
}

type Summary = {
  area: number;
  yearBuilt: string;
  numberOfRooms: number;
};

export type Property = {
  isFavorite: boolean;
  summary: Summary;
  category: Category;
  videoUrl: string | null;
  id: string;
  imageIds: string[];
  module: Module;
  postedTime: string;
  price: number;
  priceCurrency: Currency;
  title: string;
  smartLink: string;
  code: number;
};

export type PropertiesState = {
  data: Property[];
  loading: boolean;
  error: string | undefined;
};

export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async () => {
    const response = await axios.get(
      "https://www.index.hr/testni-zadatak/oglasi"
    );
    return response.data;
  }
);

const initialState: PropertiesState = {
  data: [],
  loading: false,
  error: undefined,
};

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setIsFavorite: (state, action) => {
      const propertyId = action.payload;
      const property = state.data.find((p) => p.id === propertyId);
      if (property) {
        property.isFavorite = !property.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProperties.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProperties.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const selectProperties = (state: RootState) => state.properties;
export const { setIsFavorite } = propertiesSlice.actions;
export default propertiesSlice.reducer;
