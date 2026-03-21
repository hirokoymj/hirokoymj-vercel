import { gql } from '../__generated__';

export const CREATE_SUB_CATEGORY = gql(`
  mutation CreateSubCategory($input: createSubCategoryInput!) {
    createSubCategory(input: $input) {
      id
      name
      order
      createdAt
      updatedAt
      category {
		id
		name
		abbr
		order
		createdAt
		updatedAt
      }
    }
  }
`);

export const DELETE_SUB_CATEGORY = gql(`
  mutation DeleteSubCategory($id: ID!) {
    deleteSubCategory(id: $id) {
      id
      name
      order
      createdAt
      updatedAt
    }
  }
`);

export const UPDATE_SUB_CATEGORY = gql(`
  mutation UpdateSubCategory($id: ID!, $input: updateSubCategoryInput!) {
    updateSubCategory(id: $id, input: $input) {
      id
      name
      order
      createdAt
      updatedAt
      category {
		id
		name
		abbr
		order
		createdAt
		updatedAt
      }
    }
  }
`);
