## AMP Demo CSR Portal

### Frontend Features
- **NEXT**: Next.js React SPA framework.
- **Live Data**: Websocket subscription for live data updates.
- **GraphQL**: GraphQL based data queries and mutations.
- **MUI**: Material Design UI with Emotion CSS-in-JS styling library.
- **HOC**: AWS Amplify Higher-Order Components for React.
- **TS**: Full TypeScript support.

### Backend Features

- **CDN**: Hosted on AWS edge server content distribution network.
- **WAF**: Web application firewall enabled.
- **SSL**: Secure socket layer encrypts data in transit.
- **IaC**: AWS backend fully captured as Infrastructure-as-Code within the `/amplify` folder and `amplify_outputs.json` file.
- **Auth**: Amazon Cognito user pool integration for secure user authentication.
- **DB**: Real-time NoSQL database powered by Amazon DynamoDB.
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
