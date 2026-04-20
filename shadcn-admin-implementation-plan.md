# Replace Frontend with shadcn-admin

This plan details how we will replace the existing React frontend with the `shadcn-admin` template while preserving all backend configurations and API integrations.

## User Review Required

> [!WARNING]
> This is a major architectural change. It will completely overwrite the existing frontend structure (moving from JavaScript + React Router to TypeScript + TanStack Router). The logic for authentication and notes management will need to be refactored to fit into `shadcn-admin`'s structure.

## Proposed Changes

### 1. File Structure Migration

- **Backup Important Custom Logic**: We will temporarily backup your `api.js`, `constants.js`, and logic from `Home.jsx`, `Login.jsx`, and `Register.jsx`.
- **Replace Frontend Folder**: We will replace the current contents of `frontend/` with the `shadcn-admin` repository.
- **Restore Configs**: We will keep your `frontend/.env` file with the `VITE_API_URL` setting.

### 2. Dependency Installation

- We will run `npm install` in your `frontend` directory so all the new Shadcn Admin dependencies are ready.

### 3. Integrating Django API with shadcn-admin

#### [NEW] `frontend/src/lib/api.ts`
We will port your `api.js` to TypeScript to act as the axios instance with JWT interceptors.

#### [NEW] `frontend/src/lib/constants.ts`
We will recreate your `constants.js`.

#### [MODIFY] `frontend/src/features/auth/sign-in/components/user-auth-form.tsx`
We will replace the mock login logic in `shadcn-admin` with a call to our Django `api.post('/api/token/')`.

#### [NEW/MODIFY] `frontend/src/routes` and Features
- We will adapt the `Home.jsx` functionality (viewing text notes and submitting notes) into the Shadcn framework (possibly as a new page or updating the default dashboard).
- Ensure routing enforces authentication via your `ACCESS_TOKEN`, similarly to how `ProtectedRoute.jsx` was doing it.

## Open Questions

> [!IMPORTANT]
> 1. In `shadcn-admin`, the default page after login is a dashboard. Should we render your Notes (`Home.jsx` logic) on the main dashboard, or create a separate page for Notes?
> 2. `shadcn-admin` uses `pnpm` by default. Are you okay if we switch to using `npm` / `npm install`, or do you strictly want `pnpm`?
> 3. Does the original `frontend` have any specific styling or assets that we MUST keep, or are you perfectly fine abandoning the old styling in favor of Shadcn Admin?

## Verification Plan

### Automated/Local Tests
- Run `npm run dev` in `frontend/`.
- Verify the Vite server starts successfully.

### Manual Verification
- Attempt to Login using existing Django credentials.
- Verify JWT tokens are stored correctly in `localStorage`.
- Attempt to create and view notes using the newly integrated interface.
- Ensure the login redirect properly limits unauthorized users.
