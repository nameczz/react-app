// reducer
export function counter(state = 0, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'remove':
      return state - 1
    default:
      return 10
  }
}

export function add() {
  return {
    type: 'add'
  }
}

export function remove() {
  return {
    type: 'remove'
  }
}

export function addAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 1000)
  }
}