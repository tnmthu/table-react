const initialState = {
  emps: [], 
  currentEmp: {
    "id": "",
    "employee_name": "",
    "employee_age": "",
    "employee_salary": ""
  },
  selectedRows: [],
  requests: [] // todo: clean request after the hullabaloo
};

let test = [
  {
    type: 'EDIT_EMP',
    edited: {
      id: "218",
      employee_name: "G Dragon",
      employee_salary: "1",
      employee_age: "30",
      profile_image: "profile_image 218"
    }
  },
  {
    type: 'EDIT_EMP',
    edited: {
      id: "218",
      employee_name: "G Dragon",
      employee_salary: "2",
      employee_age: "30",
      profile_image: "profile_image 218"
    }
  },
  {
    type: 'EDIT_EMP',
    edited: {
      id: "218",
      employee_name: "G Dragon",
      employee_salary: "3",
      employee_age: "30",
      profile_image: "profile_image 218"
    }
  },
  {
    type: 'EDIT_EMP',
    edited: {
      id: "222",
      employee_name: "G Dragon",
      employee_salary: "4",
      employee_age: "30",
      profile_image: "profile_image 218"
    }
  },
  {
    type: 'EDIT_EMP',
    edited: {
      id: "222",
      employee_name: "G Dragon",
      employee_salary: "5",
      employee_age: "30",
      profile_image: "profile_image 218"
    }
  },
]

function uniqueRequestByKeepLast(requests, key) {
  return [
    ...new Map(
      requests.map(x => [key(x), x])
    ).values()
  ]
}

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
      };

    case 'ADD_EMP':
      return {
        ...state,
        currentEmp: action.payload
      };

    case 'CLICK_ADD_BTN':
      return {
        ...state,
        requests: [
          ...state.requests,
          action.payload // payload { type: ADD_EMP, newEmp }
        ],
        emps: [
          action.payload.newEmp,
          ...state.emps,
        ],
        currentEmp: initialState.currentEmp
      }
    
    case 'DELETE_EMP':
      return {
        // ...state,

      };
    
    case 'CLICK_DELETE_BTN':
      return {
        ...state,
        requests: [
          ...state.requests,
          action.payload // { type: DELETE_EMP, payload }
        ],
        emps: state.emps.filter(function(emp) {
          return emp.id !== action.payload.empId;
        }),
        selectedRows: initialState.selectedRows
      };

    case 'CLICK_SAVE_BTN':
      let editRequests = state.requests.filter(function(item) {
        return item.type === 'EDIT_EMP';
      });
      let cleanEditReqs = uniqueRequestByKeepLast(editRequests, item => item.edited.id);
      console.log("clean edit requests", cleanEditReqs);
      return ;// initialstate

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
        currentEmp: action.payload
      };

    case 'UPDATE_CURRENT_EMP':
      return {
        ...state,
        requests: [
          ...state.requests,
          action.payload // { type: EDIT_EMP, edited }
        ],
        currentEmp: {
          ...action.payload.edited
        },
        emps: state.emps.map(function(emp) {
          return emp.id === action.payload.edited.id ? action.payload.edited : emp;
        })
      };

    case 'UNSELECT_EMP':
      return {
        ...state,
        currentEmp: {
          id: "",
          employee_name: "",
          employee_age: "",
          employee_salary: ""
        }
      };

    default:
      return state;
  }
}

export default reducer;