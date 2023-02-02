import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const generateResponseData = createAsyncThunk(
  'exhibition/search',
  async (data, state) => {
    try {
      const { abortController, obj } = data;
      abortController.current = new AbortController();
      const response = await fetch(`/api/v1/exhibition/search/`, {
        signal: abortController.current.signal,
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
      const res = await response.json();
      return res;
    } catch (error) {
      console.log(`Ошибка передачи запроса ${error}`);
    } finally {
      // console.log(`${23}`)
    }
  }
);

const initialState = {
  data: false,
  result: null,
  simpleFilter: [],
  temporary: null,
  advancedForm:[]
};

const test4Slice = createSlice({
  name: 'test4',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = !state.data;
    },
    setAdvancedForm(state, action) {
      state.advancedForm = action.payload || [];
    },
    addSimpleFilter(state, action) {
      if (state.simpleFilter[action.payload]) {
      } else {
        state.simpleFilter.push(action.payload);
      }
    },
    removeSimpleFilter(state, action) {
      state.simpleFilter = state.simpleFilter.filter(
        (element) => element !== action.payload
      );
    },
    clearSimpleFilter(state, action) {
      state.simpleFilter = [];
    },
    setResultDataSet(state, action) {
      // const { usagesConnection } = action.payload;
      state.result = action.payload;
    },
    clearResultDataSet(state) {
      state.result = null;
    },
  },
  extraReducers: {
    [generateResponseData.pending]: (state, action) => {},
    [generateResponseData.fulfilled]: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  setData,
  setResultDataSet,
  addSimpleFilter,
  clearSimpleFilter,
  removeSimpleFilter,
  clearResultDataSet,
  setAdvancedForm
} = test4Slice.actions;

export default test4Slice.reducer;
