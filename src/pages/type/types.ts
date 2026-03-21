//path=":city"
//path=":categoryId"
//path=":abbr"
//path=":subCategoryId"
//path=":topicId/:categoryId"
export type CityParams = {
  city: string;
};
export type CategoryParams = {
  categoryId: string;
};
export type AbbrParams = {
  abbr: string;
};
export type SubCategoryParams = {
  subCategoryId: string;
};
export type TopicAndCategoryParams = {
  topicId: string;
  categoryId: string;
};

export type CategoryFormValues = {
  name: string;
  abbr: string;
};

export interface SubCategoryFormValues {
  categoryId: string;
  name: string;
  order: string;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export interface TopicFormValues {
  category: string;
  subCategory: string;
  title: string;
  url: string;
  order?: string;
}
