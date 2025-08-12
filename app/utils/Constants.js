import { gql } from '@apollo/client';

export const SUBSCRIPTIONS = {
    "MONTHLY": "MONTHLY", 
    "PUNCH": "PUNCH", 
    "SINGLE": "SINGLE",
    "NONE": "NONE"
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
  "SITE_TITLE": "AMP Customer Service Admin Portal",
  "CUSTOMERS": "Customers", 
  "NAME": "Name",
  "EMAIL": "Email",
  "PHONE": "Phone Number",
  "ADDRESS": "Street Address",
  "CITY": "City",
  "STATE": "State",
  "COUNTRY": "Country",
  "PURCHASES": "Purchase History",
  "ADD_NEW_USER": "Add New User",
  "CLICK_TO_VIEW_EDIT": "Click to View / Edit"
}

export const ON_CREATE_USER = gql`
  subscription OnCreateUser {
    onCreateUser {
      avatar
      createdAt
      email
      id
      name
      phone
      purchases {
        items {
          date
          id
          price
          product
          user {
            avatar
            email
            id
            name
            phone
            address {
              city
              country
              state
              street
            }
            purchases {
              items {
                date
                price
                product
                vehicle
              }
            }
          }
        }
      }
      address {
        city
        country
        state
        street
      }
    }
  }`
;

export const GET_USERS = gql`
  query {
    listUsers {
      items {
        name
        avatar
        createdAt
        email
        id
        phone
        address {
          city
          country
          state
          street
        }
        purchases {
          items {
            vehicle
            date
            price
            product
          }
        }
      }
    }
  }`
;

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
    }
  }`
;