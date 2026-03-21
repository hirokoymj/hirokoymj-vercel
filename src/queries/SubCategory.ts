import { gql } from '../__generated__';

export const SUB_CATEGORIES = gql(`
	query SubCategories {
		subCategories {
			id
			name
			order
			updatedAt
			createdAt
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

export const SUB_CATEGORY_ALL = gql(`
query SubCategoryAll($limit: Int, $skip: Int) {
  subCategoryAll (limit: $limit, skip: $skip){
    subCategories {
      id
      name
      order
      updatedAt
      createdAt
      category {
        id
        name
        order
        createdAt
        abbr
        updatedAt
      }
    }
    totalCount
  }
}
`);

export const SUB_CATEGORY_BY_ID = gql(`
  query SubCategoryById($id: ID!) {
    subCategoryById(id: $id) {
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

export const SUB_CATEGORY_BY_CATEGORY = gql(`
  query SubCategoryByCategory($categoryId: ID!) {
    subCategoryByCategory(categoryId: $categoryId) {
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
