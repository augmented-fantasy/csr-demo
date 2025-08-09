import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a.model({
    id: a.id().required(),
    name: a.string(),
    email: a.email(),
    phone: a.phone(),
    avatar: a.integer(),
    address: a.customType({
      street: a.string(),
      city: a.string(),
      state: a.string(),
      country: a.string()
    }),
    purchases: a.customType({
      vehicle: a.string().array(),
      date: a.date().array(),
  subscription: a.integer().array(),
      product: a.string().array()
  })
  })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
