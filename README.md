# Google Cloud Run App Boilerplate

## Description

Google Cloud Run App Boilerplate is a simple and easy-to-use template for deploying apps on Google Cloud Run. It consists of a Server and a Client. The Server hosts the Client's static files, and the Server's API Routes are accessible at `/api/v1`.

## [How to Setup](./docs/SETUP.md)

## Stack

- Server
  - Node.js
  - Postgres
  - Express
  - Socket.io
  - TypeScript
- Client
  - React
  - TailwindCSS
  - HeadlessUI
  - React Icons
  - React Router
  - TypeScript

## Server Request/Response Simulator

A request/response simulator script is provided for testing the server without relying on the client. This script sends a request to the server and processes the server's response. For more information, check out the [simulator script.](./src/server/simulator.js)

## Google Cloud Deployment

The deployment process involves building the Docker image, pushing it to Google Cloud Registry, and deploying it to Google Cloud Run. Find the deployment script in the project root: [deploy.js](./deploy.js). Before deploying, ensure you configure the .env file according to your requirements. Please be aware that Google Cloud Run incurs costs; you can review the pricing details [here](https://cloud.google.com/run/pricing).

## Using Vercel to Deploy the Client

While not tested, deploying the client using Vercel should be feasible. You can utilize the following commands:

- `yarn client:build` to build the client
- Set the build path to `src/client/build`
- Optionally, use `yarn client:watch` for development

If you test this deployment method, kindly share your experience.

## Testing

Testing is handled through GitHub Workflow. The workflow installs dependencies and uses checkout@v3. To review the workflow configuration, see [testing.yml](./.github/workflows/testing.yml)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
