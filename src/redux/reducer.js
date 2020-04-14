const initialState = {};

function reducer(state = initialState, action) {

  switch (action.type) {
    case 'GET_EMPS':
      return {
        ...state
      };

    case 'EMPS_RECEIVED':
      return {
        ...state,
        emps: action.json
      }
    case 'ADD_EMP':
      return ;
    default:
      return state;
  }
}

export default reducer;