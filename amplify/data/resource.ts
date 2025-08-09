import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a
    .model({
      name: a.string(),
      email: a.email(),
      phone: a.phone(),
      avatar: a.integer(),
      subscriptions: a.enum(["MONTHLY", "PUNCH", "NONE"]),
      address: a.customType({
        street: a.string(),
        city: a.string(),
        state: a.string(),
        country: a.string()
      }),
      purchases: a.customType({
        dates: a.date().array(),
        vehicles: a.string().array(),
        subscriptions: a.ref('subscriptions').array()
      }),
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
