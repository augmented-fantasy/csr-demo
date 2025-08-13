## AMP Demo CSR Portal

### Frontend Features
- **NEXT**: Next.js React SPA framework.
- **GraphQL**: GraphQL based data queries and mutations.
- **MUI**: Material Design UI with Emotion CSS-in-JS styling.
- **TS**: Full TypeScript support.

### Backend Features

- **CDN**: Deployed on AWS edge server content distribution network.
- **DB**: Real-time NoSQL AWS DynamoDB includes Users, Purchases and Subscriptions tables with foreign key associations.
- **API**: GraphQL endpoint with AWS AppSync.
- **Auth**: Amazon Cognito user pool integration for secure user authentication.
- **WAF**: Web application firewall enabled.
- **SSL**: Secure socket layer encrypts data in transit.
- **IaC**: Infrastructure-as-Code fully captures AWS backend within the `/amplify` folder and `amplify_outputs.json` file for integrated backend maintenance or redeployment.
- **CICD**: Continuous integration / continuous deployment pipeline connected to GitHub `main` branch.

### Getting Started

Install dependencies: `npm i`

Copy the `amplify_outputs.json` and `.env` files to the root folder of your project.

Start the development server: `npm run dev` Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Additional scripts

`build`: Builds the application for production.

`start` Starts the production server.

`lint`: Runs ESLint.
