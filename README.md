# hirokoymj.com technical notes

🌐 [hirokoymj.com](https://www.hirokoymj.com) &nbsp;|&nbsp; [GitHub](https://github.com/hirokoymj/hirokoymj-vercel)

- **Frontend:** React.js (v19), TypeScript, React Hooks/Context, React Router v6, Redux Toolkit, React Hook Form
- **Backend:** MongoDB + Apollo server (GraphQL)
- **State Management:** Redux Toolkit, Context API, Custom Hooks
- **Authentication:** Auth0
- **UI:** Material UI v7, Responsive design
- **APIs:** Weather API, Google Gemini API, Google Maps API (GCP)
- **Testing:** React Testing Library (RTL), Vitest, MSW (API mock worker)
- **Build/DevOps:** Vite, Vercel, GitHub Actions (CI/CD, Docker)
- **AI-assistant tool:** Claude Code, GitHub Copilot

## Backend API

A GraphQL API built with Node.js and Apollo Server v3, connected to MongoDB Atlas, and deployed on Vercel.

- **Stack:** Node.js, Apollo Server v3 (GraphQL), MongoDB Atlas, Mongoose
- **Repository:** https://github.com/hirokoymj/hirokoymj-backend-vercel

## GitHub Actions

- **CI Pipeline**: [ci-pipeline.yml](.github/workflows/ci-pipeline.yml)
- **Docker Package**: [Docker Package](.github/workflows/docker-publish.yml)

## References

**React.js**

- [Built-in React Hooks](https://react.dev/reference/react/hooks)
- [React API - CreateContext](https://react.dev/reference/react/createContext)
- [React API - memo](https://react.dev/reference/react/memo)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/examples/)

**React Router**

- [useParams](https://reactrouter.com/6.30.1/hooks/use-params)
- [createRoutesFromElements](https://reactrouter.com/6.30.1/utils/create-routes-from-elements)

**React Hook Form**

- [React Hook Form](https://react-hook-form.com/)
- [React Hook Form - TypeScript](https://react-hook-form.com/ts)

**Redux Toolkit**

- [Quick Start / Install](https://redux-toolkit.js.org/tutorials/quick-start)

**Apollo Client**

- [Queries](https://www.apollographql.com/docs/react/data/queries)
- [Mutations](https://www.apollographql.com/docs/react/data/mutations)
- [TypeScript with Apollo Client](https://www.apollographql.com/docs/react/development-testing/static-typing)

**Auth0**

- [Auth0 React SDK](https://auth0.com/docs/quickstart/spa/react)
- [Auth0 Dashboard](https://auth0.com/)

**Material UI**

- [Material UI v7](https://mui.com/material-ui/getting-started/)

**Vite**

- [Vite Guide](https://vite.dev/guide/)
- [Migrating from Create React App to Vite](https://adhithiravi.medium.com/migrating-from-create-react-app-to-vite-a-modern-approach-76148adb8983)
- [How to use process.env in Vite](https://dev.to/whchi/how-to-use-processenv-in-vite-ho9)

**Google Gemini API**

- [Function Calling](https://ai.google.dev/gemini-api/docs/function-calling?example=weather)
