import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a.model({
    id: a.id().required(),
    name: a.string(),
    email: a.email(),
    phone: a.string(),
    avatar: a.integer(),
    address: a.customType({
      street: a.string(),
      city: a.string(),
      state: a.string(),
      country: a.string()
    }),
    loyalty: a.integer(),
    vehicles: a.string().array(),
    purchases: a.hasMany('Purchases', 'userId'),
    subscriptions: a.hasMany('Subscriptions', 'userId'),
  })
  .authorization((allow) => [allow.publicApiKey()]),

  Purchases: a.model({
    id: a.id().required(),
    vehicle: a.string(),
    date: a.date(),
    price: a.float(),
    product: a.enum(["MONTHLY", "PUNCH", "SINGLE", "NONE"]),
    userId: a.id().required(),
    user: a.belongsTo('User', 'userId'),
  })
  .authorization((allow) => [allow.publicApiKey()]),

  Subscriptions: a.model({
    id: a.id().required(),
    vehicle: a.string(),
    date: a.date(),
    price: a.float(),
    product: a.enum(["MONTHLY", "ANNUAL", "LIFETIME"]),
    userId: a.id().required(),
    user: a.belongsTo('User', 'userId'),
  })
  .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 3,
    },
  },
});
