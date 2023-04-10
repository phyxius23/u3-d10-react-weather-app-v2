const initialState = {
  cities: {
    content: null,
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
      case "ADD_CITY":
        return {
          ...state,
          cities: {
            ...state.cities,
            content: action.payload,
          }
        };
      default:
        return state;
    }
  };
  
  export default mainReducer;