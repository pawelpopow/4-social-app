export default function reducer(
  state = {
    loggedIn: false,
    userId: undefined,
    isEditingProfile: false
  }, action) {
    switch(action.type) {
      case 'LOG_IN': {
        const activeUser = action.payload.list.find((user) => {
          return ((user.username === action.payload.username) && (user.password === action.payload.password));
        })
        if(activeUser === undefined) {
         
          return {
            loggedIn: false,
            userId: undefined
          };
        }
        else {
          return {
            loggedIn: true,
            userId: activeUser.id
          }
        }
      }

      case 'QUICK_LOG_IN': {
        const activeUser = action.payload.list.find((user) => {
          return user.id === action.payload.id;
        })

        if(activeUser === undefined) {
        
          return {
            loggedIn: false,
            userId: undefined
          };
        }
        else {
          return {
            loggedIn: true,
            userId: activeUser.id
          }
        }
      }

      case 'LOG_OUT': {
        return {
          loggedIn: false,
          userId: undefined,
          isEditingProfile: false
        }
      }

      case 'TOGGLE_PROFILE_EDITING': {
        return {
          ...state,
          isEditingProfile: !state.isEditingProfile
        }
      }
    }
  return state;
}
