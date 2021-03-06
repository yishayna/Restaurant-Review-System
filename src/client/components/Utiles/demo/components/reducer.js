const {List} = require('immutable');
import initialState from '../../../../initialState';


const SearchBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SearchBar.UPDATE":
      return state.set(action.payload.name, action.payload.value);
    default: //otherwise state is lost!
      return state;
  }
};

export default SearchBarReducer
