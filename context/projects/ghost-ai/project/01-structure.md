# Project Structure

## Root Folders

- `apps/` — nx workspace managed folder for applications.
- `context/` - folder used for AI context instructions.
- `context/projects` - includes AI context for projects, where each project may contain multiple apps and libraries.
- `context/tech` - AI context for different tech choices which may or may not be loaded.
- `js-mastery` - AI context templates. DO NOT TOUCH THIS folder
- `libs/` — nx workspace managed folder for shared libraries: Prisma client, auth helpers, utilities, etc.
- `prisma/` - standard folder for prisma db
- `triggers/` — all durable background tasks and AI workflows.

## Project Apps/Libs

The following apps and libraries are associated with the project.

- `apps/ghost-ai` - the nextjs/react frontend application.
- `apps/ghost-ai/src/app/api` - route handlers for auth, triggering, and persistence. Name files after the responsibility they contain, not the technology.
- `apps/ghost-ai-e2e` - e2e application for testing `apps/ghost-ai`.
- `libs/ghost-ai-components` - reusable react components used inside of the `apps/ghost-ai` application. UI composition only; no business logic.
- `libs/ghost-ai-db` - prisma interface for database interactions.

## Shared Apps/Libs

The following are shared libraries that are use in the project.

- `libs/shadcn` - shadcn ui components.
- `libs/shadcn-util` - shadcn components utility library.
