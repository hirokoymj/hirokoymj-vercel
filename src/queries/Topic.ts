import { gql } from '../__generated__';

export const TOPICS = gql(`
	query Topics {
		topics {
			id
			order
			title
			updatedAt
			url
			createdAt
			category {
				id
				name
				abbr
				createdAt
				order
				updatedAt
			}
			subCategory {
				id
				name
				order
				createdAt
				updatedAt
			}
		}
	}	
`);

export const TOPIC_ALL = gql(`
	query TopicAll($limit: Int, $skip: Int) {
	topicAll(limit: $limit, skip: $skip) {
		topics {
		id
		title
		url
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
		subCategory {
			id
			name
			order
			createdAt
			updatedAt
		}
		}
		totalCount
	}
	}
`);

export const TOPIC_BY_ID = gql(`
  query TopicById($id: ID!) {
    topicById(id: $id) {
      id
      title
      url
      category {
		id
		name
		abbr
		order
		createdAt
		updatedAt		
      }
      subCategory {
		id
		name
		order
		createdAt
		updatedAt
      }
      order
    }
  }
`);

export const TOPIC_BY_CATEGORY = gql(`
  query TopicByCategory($id: ID!) {
    topicByCategory(categoryId: $id) {
      id
      title
      url
      category {
		id
		name
		abbr
		order
		createdAt
		updatedAt
      }
      subCategory {
		id
		name
		order
		createdAt
		updatedAt
      }
      order
    }
  }
`);

export const TOPIC_BY_CATEGORY_ABBR = gql(`
  query TopicByCategoryAbbr($abbr: String!) {
    topicByCategoryAbbr(abbr: $abbr) {
      id
      title
      url
      category {
		id
		name
		abbr
		order
		createdAt
		updatedAt
      }
      subCategory {
		id
		name
		order
		createdAt
		updatedAt
      }
      order
    }
  }
`);
