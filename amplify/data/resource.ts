import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a.model({
    id: a.id().required(),
    name: a.string(),
    email: a.email(),
    phone: a.phone(),
    avatar: a.integer(),
    vehicles: a.string().array(),
    address: a.customType({
      street: a.string(),
      city: a.string(),
      state: a.string(),
      country: a.string()
    })
  }),
  Purchases: a.model({
    id: a.id().required(),
    user: a.ref('User'),
    dates: a.date().array(),
    type: a.enum(["MONTHLY", "PUNCH", "NONE"])
  }),
  Products: a.model({
    id: a.id().required(),
    purchases: a.ref('Purchases'),
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
