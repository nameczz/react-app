export function authCheck (
  state = {
    isAuth: false,
    name: 'czz'
  },
  action
) {
  switch (action.type) {
    case 'Login':
      return { ...state, isAuth: true }
    case 'Logout':
      return { ...state, isAuth: false }
    default:
      return { ...state, isAuth: false }
  }
}

export function login () {
  return { type: 'Login' }
}

export function logout () {
  return { type: 'Logout' }
}
