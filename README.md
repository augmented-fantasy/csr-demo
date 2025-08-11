## AMP Demo CSR Portal

### Frontend Features
- **Search / Edit / Sort / Add / Filter / Delete**: Customers and Customer Info.
- **View / Modify / Add / Remove**: Customer Purchases.
- **NEXT**: Next.js React SPA framework.
- **GraphQL**: GraphQL based data queries and mutations.
- **Live Data**: Websocket data subscription for live updates.
- **MUI**: Material Design UI with Emotion CSS-in-JS styling.
- **TS**: Full TypeScript support.

### Backend Features

- **CDN**: Hosted on AWS edge server content distribution network.
- **WAF**: Web application firewall enabled.
- **SSL**: Secure socket layer encrypts data in transit.
- **IaC**: AWS backend fully captured as Infrastructure-as-Code within the `/amplify` folder and `amplify_outputs.json` file.
- **Auth**: Amazon Cognito user pool integration for secure user authentication.
- **DB**: Real-time NoSQL AWS DynamoDB with Users and Purchases tables with foreign key association.
- **API**: GraphQL endpoint with AWS AppSync.
- **CICD**: Continuous integration / continuous deployment pipeline connected to GitHub `main` branch.

### Getting Started

Install dependencies: `npm i`

Copy the `amplify_outputs.json` and `.env` files to the root folder of your project.

Start the development server: `npm run dev` Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Additional scripts

`build`: Builds the application for production.

`start` Starts the production server.

`lint`: Runs ESLint.
