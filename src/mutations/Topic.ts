import { gql } from '../__generated__';

export const CREATE_TOPIC = gql(`
  mutation CreateTopic($input: createTopicInput!) {
    createTopic(input: $input) {
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

export const DELETE_TOPIC = gql(`
  mutation DeleteTopic($id: ID!) {
    deleteTopic(id: $id) {
      id
      title
      url
    }
  }
`);

export const UPDATE_TOPIC = gql(`
  mutation UpdateTopic($id: ID!, $input: updateTopicInput!) {
    updateTopic(id: $id, input: $input) {
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
