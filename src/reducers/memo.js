import * as types from 'actions/ActionTypes';

const initialState = {
  post: {
    status: 'INIT', 
    error: -1
  }, 
  list: {
    status: 'INIT', 
    data: [], 
    isLast: false
  }, 
  edit: {
    status: 'INIT', 
    error: -1
  }, 
  remove: {
    status: 'INIT', 
    error: -1
  }, 
  star: {
    status: 'INIT', 
    error: -1
  }
};

export default function memo(state = initialState, action) {
  switch(action.type) {
    case types.MEMO_POST: 
      return {
        ...state, 
        post: {
          ...state.post, 
          status: 'WAITING', 
          error: -1
        }
      };
    case types.MEMO_POST_SUCCESS: 
      return {
        ...state, 
        post: {
          ...state.post, 
          status: 'SUCCESS'
        }
      };
    case types.MEMO_POST_FAILURE: 
      return {
        ...state, 
        post: {
          ...state.post, 
          status: 'FAILURE', 
          error: action.error
        }
      };
    case types.MEMO_LIST: 
      return {
        ...state, 
        list: {
          ...state.list, 
          status: 'WAITING'
        }
      };
    case types.MEMO_LIST_SUCCESS: 
      if (action.isInitial) {
        return {
          ...state, 
          list: {
            ...state.list, 
            status: 'SUCCESS', 
            data: action.data, 
            isLast: action.data.length < 6
          }
        }
      } else {
        if (action.listType === 'new') {
          return {
            ...state, 
            list: {
              ...state.list, 
              status: 'SUCCESS', 
              data: [...action.data, ...state.list.data]
            }
          }
        } else {
          return {
            ...state, 
            list: {
               ...state.list, 
               status: 'SUCCESS', 
               data: [...state.list.data, ...action.data], 
               isLast: action.data.length < 6
            }
          }
        }
      }
      return state;
    case types.MEMO_LIST_FAILURE: 
      return {
        ...state, 
        list: {
          ...state.list, 
          status: 'FAIURE'
        }
      };
    case types.MEMO_EDIT: 
      return {
        ...state, 
        edit: {
          ...state.edit, 
          status: 'WAITING', 
          error: -1, 
          memo: undefined
        }
      };
    case types.MEMO_EDIT_SUCCESS: 
      let editBefore = state.list.data.slice(0, action.index);
      let editAfter = state.list.data.slice(action.index+1);
      return {
        ...state, 
        edit: {
          ...state.edit, 
          status: 'SUCCESS'
        }, 
        list: {
          ...state.list, 
          data: [...editBefore, action.memo, ...editAfter]
        }
      };
    case types.MEMO_EDIT_FAILURE: 
      return {
        ...state, 
        edit: {
          ...state.edit, 
          status: 'FAILURE', 
          error: action.error
        }
      };
    case types.MEMO_REMOVE:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: 'WAITING',
          error: -1
        }
      };
    case types.MEMO_REMOVE_SUCCESS:
      let removeBefore = state.list.data.slice(0, action.index);
      let removeAfter = state.list.data.slice(action.index+1);
      return {
        ...state,
        remove: {
          ...state.remove,
          status: 'SUCCESS'
        },
        list: {
          ...state.list,
          data: [...removeBefore, ...removeAfter]
        }
      };
    case types.MEMO_REMOVE_FAILURE:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: 'FAILURE',
          error: action.error
        }
      };
    case types.MEMO_STAR:
      return {
        ...state,
        star: {
          ...state.star,
          status: 'WAITING',
          error: -1
        }
      };
    case types.MEMO_STAR_SUCCESS:
      let starBefore = state.list.data.slice(0, action.index);
      let starAfter = state.list.data.slice(action.index+1);
      return {
        ...state,
        star: {
          ...state.star,
          status: 'SUCCESS'
        },
        list: {
          ...state.list,
          data: [...starBefore, action.memo ,...starAfter]
        }
      };
    case types.MEMO_STAR_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          status: 'FAILURE',
          error: action.error
        }
      };
    default: 
      return state;
  }
}
