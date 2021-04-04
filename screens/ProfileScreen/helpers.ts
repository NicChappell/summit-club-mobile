import { IUserContact } from "../../services";

export const getInitials = (contact?: IUserContact) => {
  const firstNameInitial = contact?.firstName?.charAt(0);
  const lastNameInitial = contact?.lastName?.charAt(0);

  if (firstNameInitial && lastNameInitial) {
    return firstNameInitial + lastNameInitial;
  }

  return undefined;
};
