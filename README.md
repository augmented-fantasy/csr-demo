## AMP Demo CSR Portal

## Features

- **NEXT**: Next.js React SPA framework.
- **CDN**: Hosted on AWS edge server content distribution network.
- **WAF**: Web application firewall enabled.
- **SSL**: Secure socket layer encrypts data in transit.
- **IaC**: AWS backend fully captured as Infrastructure-as-Code within the `/amplify` folder and `amplify_outputs.json` file.
- **Auth**: Amazon Cognito user pool integration for secure user authentication.
- **DB**: Real-time NoSQL database powered by Amazon DynamoDB.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **HOC**: AWS Amplify Higher-Order Components for React.
- **MUI**: Material Design UI with Emotion as its default CSS-in-JS styling library.
- **CICD**: Continuous integration / continuous deployment pipeline connected to GitHub `main` branch.
- **TS**: Full TypeScript support.

## Getting Started

Install dependencies: `npm i`

Copy the `amplify_outputs.json` and `.env` files to the root folder of your project.

Start the development server: `npm run dev` Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Additional scripts

`build`: Builds the application for production.

`start` Starts the production server.

`lint`: Runs ESLint.
