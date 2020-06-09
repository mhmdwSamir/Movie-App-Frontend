export interface Location {
  street: string;
  city: string;
  state: string;
  postcode: number;
}

export interface User {
  email: string;
  gender: string;
  phone_number: string;
  birthdate: number;
  location: Location;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  title: string;
  picture: string;
}
