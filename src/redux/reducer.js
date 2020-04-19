const initialState = {
  emps: [], 
  currentEmp: {
    "key": "",
    "id": "",
    "employee_name": "",
    "employee_age": "",
    "employee_salary": "",
    "classes": ""
  },
  selectedRows: [],
};

function reducer(state = initialState, action) {

  switch (action.type) {
    case 'GET_EMPS':
      return {
        ...state
      };

    case 'EMPS_RECEIVED':
      return {
        ...state,
        // each emp have 'classes' property
        // if emp is newly added => rowKey = key; else rowKey = id  
        emps: action.json.map(function({profile_image, classes, ...others}) {
          return others.key === "" ? {key: others.key, classes: "", ...others} : {key: others.id, classes: "", ...others};
        })
      };

    case 'CLICK_ADD_BTN':
      return {
        ...state,
        emps: [
          action.payload.emp, // add new emp to table top
          ...state.emps,
        ],
        currentEmp: initialState.currentEmp
      }
    
    case 'CLICK_DELETE_BTN':
      return {
        ...state,
        emps: state.emps.map(function(emp) { // deleted row UI
          return emp.key === action.payload.emp.key ? action.payload.emp : emp;
        }),
        selectedRows: initialState.selectedRows
      };

    case 'CLICK_SAVE_BTN':
      return {
        ...state,
      };

    case 'SELECT_CHECKBOX':
      return {
        ...state,
        selectedRows: [
          ...action.payload,
        ]
      }

    case 'SELECT_EMP':
      return {
        ...state,
        currentEmp: action.payload,
        emps: state.emps.map(function(emp) { // select row UI
          return emp.key === action.payload.key ? action.payload : {...emp, classes: emp.classes.replace(/selected/g, '')};
        })
      };

    case 'UNSELECT_EMP':
      return {
        ...state,
        currentEmp: {
          id: "",
          employee_name: "",
          employee_age: "",
          employee_salary: "",
          classes: ""
        },
        emps: state.emps.map(function(emp) { // unselect row UI
          return emp.key === action.payload.key ? action.payload : emp;
        })
      };

    case 'UPDATE_CURRENT_EMP':
      return {
        ...state,
        currentEmp: {
          ...action.payload.edited
        },
        emps: state.emps.map(function(emp) { // change edited emp UI 
          return emp.key == action.payload.edited.key ? action.payload.edited : emp;
        })
      };

    case 'SAVE_SUCCESSFUL':
      return {
        ...initialState
      };

    default:
      return state;
  }
}

export default reducer;