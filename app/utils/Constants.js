import { gql } from '@apollo/client';

export const SUBSCRIPTIONS = {
    "ANNUAL": "ANNUAL",
    "MONTHLY": "MONTHLY", 
    "LIFETIME": "LIFETIME",
    "PUNCH": "PUNCH", 
    "SINGLE": "SINGLE",
    "NONE": "NONE",
}

export const BUTTONS = {
    "LOGOUT": "Logout", 
    "ADD": "Add User", 
    "UPDATE": "Update",
    "DELETE": "Delete",
    "EXIT": "Exit",
    "SAVE": "Save",
    "CLOSE": "Close",
    "PURCHASE_HISTORY": "PURCHASE HISTORY",
    "SUBSCRIPTIONS": "EDIT SUBSCRIPTIONS",
    "CHANGE_VEHICLE": "CHANGE VEHICLE",
    "ADD_SUBSCRIPTION": "NEW SUBSCRIPTION",
    "DONE": "DONE"
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
  "TITLE": "AMP CSR Portal",
  "DESCRIPTION": "Demo App for AMP CSR Portal",
  "FORM_HEADER": "This information can be edited.",
  "CUSTOMER_PROFILE": "Customer Profile",
  "SUBSCRIPTIONS": "Subscriptions",
  "PURCHASES": "Purchases",
  "LOYALTY": "Loyalty Points",
  "CREATE_SUBSCRIPTION": "Assign a new subscription",
  "VEHICLE": "Vehicle",
  "PRODUCT": "Product",
  "VEHICLES": "Vehicles (Comma Separated List)"
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
      loyalty
      vehicles
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
        loyalty
        vehicles
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
        subscriptions {
          items {
            vehicle
            date
            price
            product
            userId
            id
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
      loyalty
      vehicles
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