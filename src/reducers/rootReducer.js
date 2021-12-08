import {combineReducers} from 'redux';

const EQUATIONTEXT = 'EQUATIONTEXT';
const DISPLAYTEXT = 'DISPLAYTEXT';
const RESULT = 'RESULT';

const equationReducer = (state = "", action) => {
  switch (action.type) {
    case EQUATIONTEXT:
      return action.text;
    default:
      return state
  }
};

const displayReducer = (state = "0", action) => {
  switch (action.type) {
    case DISPLAYTEXT:
      return action.text;
    default:
      return state
  }
};

const resultReducer = (state = "", action) => {
  switch (action.type) {
    case RESULT:
      return action.text;
    default:
      return state
  }
};

const rootReducer = combineReducers({
  displayText: displayReducer,
  equationText: equationReducer,
  result: resultReducer
});

export default rootReducer;
