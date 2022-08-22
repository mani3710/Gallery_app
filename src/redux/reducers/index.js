import { combineReducers } from '@reduxjs/toolkit';

import dataReducer from './dataReducer';

const rootReducer = combineReducers({
  data: dataReducer
});

export default rootReducer;
