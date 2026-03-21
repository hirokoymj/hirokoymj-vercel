import { gql } from '../__generated__';

export const CATEGORIES = gql(`
	query Categories {
		categories {
			id
			name
			abbr
			order
			createdAt
			updatedAt
		}
	}
`);

export const CATEGORY_ALL = gql(`
  query CategoryAll ($limit: Int, $skip: Int){
	categoryAll (limit: $limit, skip: $skip){
		categories{
			id
			name
			abbr
			order
			createdAt
			updatedAt
		}
		totalCount
    }
  }
`);

export const CATEGORY_BY_ID = gql(`
  query Category_By_Id($id: ID!) {
    categoryById(id: $id) {
      id
      name
      abbr
      order
      createdAt
      updatedAt
    }
  }
`);
