import { configureStore } from '@reduxjs/toolkit'
import test4Slice from './reducers/app-reducer';

export default configureStore({
  reducer: {
    test4: test4Slice,
  }
});