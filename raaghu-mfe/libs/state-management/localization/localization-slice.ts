import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    AnyAction,
  } from "@reduxjs/toolkit";
  import {ServiceProxy} from '../../shared/service-proxy'
 
  
  type localInitialState = {
    localization: any;
    error: string;
    status: "pending" | "loading" | "error" | "success";
  };
  export const localInitialState: localInitialState = {
    localization: [],
    error: "",
    status: "pending",
  };
  const proxy = new ServiceProxy()
 
   
  
  export const fetchLocalization = createAsyncThunk(
    "Localization/fetchLocalization",
    (cultureName:any)=>{
      return proxy.applicationLocalization(cultureName,false).then((result:any)=>{
        return result;
      })
    }
  );
  
  const Localizationslice = createSlice({
    name: "Localization",
    initialState:localInitialState,
    reducers:{},
    extraReducers: (builder) => {
      builder.addCase(fetchLocalization.pending, (state) => {
        state.status = "loading";
      });
      builder.addCase(
        fetchLocalization.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "success";
          state.localization = action.payload;
          state.error = "";
        }
      );
      builder.addCase(fetchLocalization.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || "Something went wrong";
      });
  
    },
  });
  export default Localizationslice.reducer;