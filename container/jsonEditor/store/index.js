import { combineReducers } from 'redux'

import config from './config/slice'
import modal from './modal/slice'

const rootReducer = combineReducers({
  config,
  modal,
})

export default rootReducer
