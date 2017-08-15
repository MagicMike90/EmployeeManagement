import * as types from '../actions/actionTypes';
import initEmployee from './initEmployee';


/* 
Things you should never do inside a reducer:
Mutate its arguments;
Perform side effects like API calls and routing transitions;
Call non-pure functions, e.g. Date.now() or Math.random().
*/

const employees = (state = initEmployee, action) => {
  switch (action.type) {
    case types.SEND_REQUEST:
      // console.log('SEND_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.TURN_ON_FILTER:
      return Object.assign({}, state, {
        openFilter: true,
      });
    case types.TURN_OFF_FILTER:
      return Object.assign({}, state, {
        openFilter: false,
      });
    case types.REQUEST_SERVER_ERROR:
      // console.log('REQUEST_SERVER_ERROR', action);
      return Object.assign({}, state, {
        error: action.error,
        receivedAt: action.receivedAt,
        isFetching: false
      });

    case types.LOAD_EMPLOYEES_SUCCESS:
      // console.log('LOAD_EMPLOYEES_SUCCESS');
      return Object.assign({}, state, {
        employees: action.data.employees,
        totalCount: action.data.totalCount,
        isFetching: false,
        pageNum: action.data.pageNum,
        offset: action.data.offset,
        receivedAt: action.receivedAt
      });

    case types.CREATE_EMPLOYEE_SUCCESS:
      // console.log('CREATE_EMPLOYEE_SUCCESS');
      const updatedIssue = action.issue;
      return Object.assign({}, state, {
        employees: state.employees.concat(updatedIssue),
        receivedAt: action.receivedAt
      });

    case types.DELETE_EMPLOYEE_SUCCESS:
      // console.log('DELETE_EMPLOYEE_SUCCESS');
      const newIssues = state.employees.filter(issue => action.issueIds.indexOf(issue._id) == -1);
      return Object.assign({}, state, {
        employees: newIssues,
        deletedIssues: state.deletedIssues.concat(action.issueIds),
        isFetching: false,
        receivedAt: action.receivedAt
      });
    default:
      return state
  }
}

export default employees
