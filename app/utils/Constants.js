import { gql } from '@apollo/client';

export const SUBSCRIPTIONS = {
    "MONTHLY": "Monthly Unlimited", 
    "PUNCH": "Punch Pass", 
    "SINGLE": "Single Wash",
    "NONE": "None"
}

export const BUTTONS = {
    "LOGOUT": "Logout", 
    "ADD": "Add User", 
    "UPDATE": "Update",
    "DELETE": "Delete",
    "CANCEL": "Cancel",
    "SAVE": "Save"
}

export const UI_TEXT = {
    "CUSTOMERS": "Customers", 
    "NAME": "Name",
    "EMAIL": "Email",
    "PHONE": "Phone Number",
    "ADDRESS": "Street Address",
    "CITY": "City",
    "STATE": "State",
    "COUNTRY": "Country",
    "PURCHASES": "Purchase History",
    "ADD_NEW_USER": "Add New User"
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

export const ADD_NEW_USER = gql`
  mutation AddUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      phone
      avatar
      createdAt
      updatedAt
      address {
        city
        country
        state
        street
      }
      purchases {
        date
        product
        subscription
        vehicle
      }
    }
  }
`;