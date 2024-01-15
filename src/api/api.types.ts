export type AppFetchRequestResponseItem<T> = {
  data?: T;
  success?: boolean;
  msg?: string;
  type?: number;
};

export type AppFetchRequestResponse<T> = AppFetchRequestResponseItem<T>;

export type FetchResponse<T> = AppFetchRequestResponse<T>;
type KeyValuePairs = Record<string, string | number>;

export type Params =
  | KeyValuePairs
  | SocialsResponse
  | EducationType
  | WorkExperienceType
  | ActivityType
  | EndorseType
  | MessageType
  | IdeaProps
  | OpportunityProps
  | FormData
  | CompanyParams;
