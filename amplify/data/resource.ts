import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a
    .model({
      name: a.string(),
      email: a.string(),
      street: a.string(),
      city: a.string(),
      state: a.string(),
      country: a.string(),
      phone: a.string(),
      avatar: a.string(),
      subscriptions: a.enum(["MONTHLY", "PUNCH", "NONE"]),
      purchaseHistory: a.string().array(),
      Location: a.customType({
        street: a.string().default('1500 Dry Run Creek'),
        city: a.string().default('Los Angeles'),
        state: a.string().default('CA'),
        country: a.string().default('US')
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
