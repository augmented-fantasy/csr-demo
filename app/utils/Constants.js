import { gql } from '@apollo/client';

export const SUBSCRIPTIONS = {
    "MONTHLY": "Monthly Unlimited", 
    "PUNCH": "Punch Pass", 
    "NONE": "None"
}

export const ON_CREATE_USER = gql`
  subscription OnCreateUser {
    onCreateUser {
      address {
        city
        country
        state
        street
      }
      avatar
      email
      id
      name
      phone
      purchases {
        date
        product
        subscription
        vehicle
      }
    }
  }
`;

// GraphQL Queries
export const GET_USERS = gql`
  query GetUsers {
    listUsers {
        items {
            name
            avatar
            createdAt
            email
            id
            phone
            purchases {
                date
                product
                subscription
                vehicle
            }
            address {
                city
                country
                state
                street
            }
        }
    }
}`;