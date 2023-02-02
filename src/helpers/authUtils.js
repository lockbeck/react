import { includes, isEmpty } from "lodash";
import { Cookies } from "react-cookie";

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
  const user = getLoggedInUser();
  if (!user) {
    return false;
  }

  return true;
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
  const cookies = new Cookies();
  const user = cookies.get("user");
  const token = cookies.get("token");
  return user && token ? {...user, ...token} : null;
};

const hasAccess = (roles = [], userRoles = []) => {
  console.log(roles);
  return !isEmpty(userRoles.filter(role => includes(roles, role.name)));
}

export { isUserAuthenticated, getLoggedInUser, hasAccess };
