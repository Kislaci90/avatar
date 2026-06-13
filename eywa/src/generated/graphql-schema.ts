export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Address = {
  __typename?: 'Address';
  addressLine: Scalars['String']['output'];
  city: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
};

export type Contact = {
  __typename?: 'Contact';
  contactName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
};

export type HomeStatView = {
  __typename?: 'HomeStatView';
  totalCities: Scalars['Int']['output'];
  totalLocations: Scalars['Int']['output'];
  totalUsers: Scalars['Int']['output'];
  totalVenues: Scalars['Int']['output'];
};

export type LazyLocationView = {
  __typename?: 'LazyLocationView';
  address: Address;
  amenities: Array<Scalars['String']['output']>;
  contact: Contact;
  description: Scalars['String']['output'];
  geom: PointView;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  website: Scalars['String']['output'];
};

export type LocationFilter = {
  cities: Array<Scalars['String']['input']>;
  locationAmenities: Array<Scalars['String']['input']>;
  properties: Array<Scalars['String']['input']>;
  searchTerm: Scalars['String']['input'];
  surfaceTypes: Array<Scalars['String']['input']>;
  venueTypes: Array<Scalars['String']['input']>;
};

export type LocationPage = {
  __typename?: 'LocationPage';
  content: Array<LocationView>;
  pageable: Pageable;
  total: Scalars['Int']['output'];
};

export type LocationView = {
  __typename?: 'LocationView';
  address: Address;
  amenities: Array<Scalars['String']['output']>;
  contact: Contact;
  description: Scalars['String']['output'];
  geom: PointView;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  venues: Array<VenueView>;
  website: Scalars['String']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  expiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  register: RegisterResponse;
  resendVerificationEmail: Scalars['Boolean']['output'];
  verifyEmail: Scalars['Boolean']['output'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  registerUserInput: RegisterUserInput;
};


export type MutationResendVerificationEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String']['input'];
};

export type Pageable = {
  __typename?: 'Pageable';
  pageNumber: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
};

export type PointView = {
  __typename?: 'PointView';
  x: Scalars['String']['output'];
  y: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getHomeStat: HomeStatView;
  getLocation: LocationView;
  getMe?: Maybe<UserView>;
  getSearchFilters: SearchFilter;
  getVenue: VenueView;
  searchLocations: LocationPage;
  searchVenues: VenuePage;
};


export type QueryGetLocationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetVenueArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySearchLocationsArgs = {
  count: Scalars['Int']['input'];
  filter: LocationFilter;
  offset: Scalars['Int']['input'];
  sort: Scalars['String']['input'];
};


export type QuerySearchVenuesArgs = {
  count: Scalars['Int']['input'];
  filter: VenueFilter;
  offset: Scalars['Int']['input'];
  sort: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  loginResponse: LoginResponse;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user: UserView;
};

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SearchFilter = {
  __typename?: 'SearchFilter';
  cities: Array<Scalars['String']['output']>;
  locationAmenities: Array<Scalars['String']['output']>;
  surfaceTypes: Array<Scalars['String']['output']>;
  venueProperties: Array<Scalars['String']['output']>;
  venueTypes: Array<Scalars['String']['output']>;
};

export type UserView = {
  __typename?: 'UserView';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type VenueFilter = {
  cities: Array<Scalars['String']['input']>;
  locationAmenities: Array<Scalars['String']['input']>;
  properties: Array<Scalars['String']['input']>;
  searchTerm: Scalars['String']['input'];
  surfaceTypes: Array<Scalars['String']['input']>;
  venueTypes: Array<Scalars['String']['input']>;
};

export type VenuePage = {
  __typename?: 'VenuePage';
  content: Array<VenueView>;
  pageable: Pageable;
  total: Scalars['Int']['output'];
};

export type VenueView = {
  __typename?: 'VenueView';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: LazyLocationView;
  name: Scalars['String']['output'];
  properties: Array<Scalars['String']['output']>;
  surfaceType: Scalars['String']['output'];
  venueType: Scalars['String']['output'];
};
