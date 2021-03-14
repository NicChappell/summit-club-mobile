import { IUser } from "../../services/User";

export const getInitials = (user?: IUser) => {
  const firstNameInitial = user?.contact.firstName?.charAt(0);
  const lastNameInitial = user?.contact.lastName?.charAt(0);

  if (firstNameInitial && lastNameInitial) {
    return firstNameInitial + lastNameInitial;
  }

  return undefined;
};
