import { IUser } from "../../../services/User";

export const MOCK_USER: IUser = {
  account: {
    username: "nwc",
    password: "RjS0yJB3z3ga5KP9aTK0OwAW",
  },
  contact: {
    firstName: "Nic",
    lastName: "Chappell",
    email: "nwc@nicchappell.com",
    countryCode: "+1",
    phone: "4029685985",
    streetAddress1: "971 Homer Circle",
    streetAddress2: "",
    city: "Lafayette",
    province: "CO",
    postalCode: "80026",
  },
  id: "12345",
  settings: {
    permissions: {
      location: undefined
    },
    preferences: {
      shareCheckIns: true
    }
  }
};
