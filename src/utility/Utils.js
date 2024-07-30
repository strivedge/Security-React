// import { DefaultRoute } from '../router/routes'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
// export const getHomeRouteForLoggedInUser = userRole => {
//   if (userRole === 'admin') return DefaultRoute
//   if (userRole === 'client') return '/access-control'
//   return '/login'
// }

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))
export const getCurrentLng = () => localStorage.getItem('i18nextLng')

/* Get logged user from local storage */
export const getCurrentUser = () => {
  let user = null
  try {
    user =
      localStorage.getItem('userData') !== null ? JSON.parse(localStorage.getItem('userData')) : null
  } catch (error) {
    console.log(">>>>: src/utility/Utils.js  : getCurrentUser -> error", error)
    user = null
  }
  return user
}

export const setCurrentLang = (user) => {
  try {
    if (user) {
      localStorage.setItem('i18nextLng', user);
    } else {
      localStorage.removeItem('i18nextLng');
    }
  } catch (error) {
    console.log(">>>>: src/utility/Utils.js : setCurrentUser -> error", error);
  }
};

/* Get logged user from local storage */
export const logoutCurrentUser = () => {
  try {
    localStorage.clear()
  } catch (error) {
    console.log(">>>>: src/utility/Utils.js  : getCurrentUser -> error", error)
  }
}

/* Set logged user on local storage  */
export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      localStorage.removeItem('userData');
    }
  } catch (error) {
    console.log(">>>>: src/utility/Utils.js : setCurrentUser -> error", error);
  }
};

/* Set logged user on local storage  */
export const setCurrentUserRole = (RoleData) => {
  try {
    if (RoleData) {
      localStorage.setItem('currentRole', JSON.stringify(RoleData));
    } else {
      localStorage.removeItem('currentRole');
    }
  } catch (error) {
    console.log(">>>>: src/utility/Utils.js : setCurrentUserRole -> error", error);
  }
};

/* Get logged user from local storage */
export const getCurrentUserRole = () => {
  let user = null
  try {
    user =
      localStorage.getItem('currentRole') !== null ? JSON.parse(localStorage.getItem('currentRole')) : null
  } catch (error) {
    console.log(">>>>: src/utility/Utils.js  : getCurrentUserRole -> error", error)
    user = null
  }
  return user
}


/* Get access token or token from local storage */
export const getAccessToken = () => {
  let token = null;
  try {
    token =
      localStorage.getItem('accessToken') !== null ? JSON.parse(localStorage.getItem('accessToken')) : null;
  } catch (error) {
    console.log(">>>>: src/utility/Utils.js  : getAccessToken -> error", error);
    token = null;
  }
  return token;
};

/* Set access token or token on local storage */
export const setAccessToken = (token) => {
  try {
    if (token) {
      localStorage.setItem('accessToken', JSON.stringify(token));
    } else {
      localStorage.removeItem('accessToken');
    }
  } catch (error) {
    console.log(">>>>: src/utility/Utils.js : setAccessToken -> error", error);
  }
};


export const setUserEmail = (email) => {
  try {
    if (email) {
      localStorage.setItem('userEmail', JSON.stringify(email));
    } else {
      localStorage.removeItem('userEmail');
    }
  } catch (error) {
    console.log(">>>>: src/utility/Utils.js : setAccessToken -> error", error);
  }
};

export const getUserEmail = () => {
  let email = null;
  try {
    email =
      localStorage.getItem('userEmail') !== null ? JSON.parse(localStorage.getItem('accessToken')) : null;
  } catch (error) {
    console.log(">>>>: src/utility/Utils.js  : getAccessToken -> error", error);
    email = null;
  }
  return email;
};
