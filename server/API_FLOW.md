# API Request Flow & Error Handling

This document describes the detailed, step-by-step flow for every API request made to the EventPlanner backend, including what happens at each stage, why it happens, and how errors or resolutions are handled.

---

## 1. Incoming Request
- **What happens:**
  - The client (frontend, mobile app, or API tool like Postman) sends an HTTP request to the backend server. This request includes the HTTP method (GET, POST, PUT, DELETE), the endpoint (e.g., `/api/user/profile`), headers (such as `Authorization`), and optionally a request body (for POST/PUT).
- **Why:**
  - This is how the client communicates with the backend to fetch or modify data.
- **Possible errors:**
  - If the request is malformed (e.g., missing required headers or body), the server may immediately reject it or pass it along to the next step for further validation.

## 2. Express Route Matching
- **What happens:**
  - Express.js checks the incoming request against all defined routes in the `src/routes/` directory. It matches both the HTTP method and the path.
- **Why:**
  - To determine which controller and middleware should handle the request.
- **Possible errors:**
  - If no route matches, Express returns a 404 Not Found error, indicating the endpoint does not exist.

## 3. Middleware Execution
- **What happens:**
  - Before reaching the controller, the request passes through one or more middleware functions. Common middlewares include:
    - `Protect`: Checks for a valid JWT token in the `Authorization` header, verifies it, and attaches the user info to the request object.
    - `isAdmin`: Checks if the authenticated user has admin privileges.
    - Other middlewares may include logging, rate limiting, or input sanitization.
- **Why:**
  - To enforce security, authentication, authorization, and other cross-cutting concerns before business logic is executed.
- **Possible errors:**
  - If the JWT is missing or invalid, `Protect` returns a 401 Unauthorized error.
  - If the user is not an admin, `isAdmin` returns a 403 Forbidden error.
  - If any other middleware fails (e.g., rate limit exceeded), an appropriate error is returned.

## 4. Controller Execution
- **What happens:**
  - The matched controller function (e.g., `GetAllContacts`, `UpdateContacts`) is called. This function contains the business logic for the endpoint.
  - Steps inside the controller typically include:
    1. **Input Validation:**
       - Checks if all required fields are present and valid (e.g., email format, required parameters).
       - Uses libraries like `express-validator` or manual checks.
       - **Error:** If validation fails, returns a 400 Bad Request with details.
    2. **Database Operation:**
       - Interacts with MongoDB via Mongoose models to fetch, create, update, or delete data.
       - **Error:** If the database is unreachable, or the resource is not found, returns a 500 Internal Server Error or 404 Not Found.
    3. **Business Logic:**
       - Applies any additional rules (e.g., cannot delete an admin user, cannot update a resolved ticket).
       - **Error:** If business rules are violated, returns a relevant error (e.g., 403 Forbidden, 409 Conflict).
    4. **Success:**
       - If all checks pass and the operation is successful, prepares a response object with the result.

- **Why:**
  - The controller is where the main work for each endpoint is done, ensuring data integrity and business requirements are met.

## 5. Response Handling
- **What happens:**
  - The controller sends a JSON response back to the client. This response typically includes:
    - `success: true` or `false`
    - `message`: A human-readable message describing the result
    - `data`: The requested or updated resource (if applicable)
    - `error`: (optional) Error details for debugging (only in error cases)
- **Why:**
  - To inform the client of the outcome of their request, whether successful or not.
- **Possible errors:**
  - If an error occurred in any previous step, the response will have `success: false` and an appropriate HTTP status code (e.g., 400, 401, 403, 404, 500).

## 6. Error Middleware (Optional)
- **What happens:**
  - If an unhandled error is thrown anywhere in the request lifecycle, Express’s error-handling middleware catches it.
  - Returns a 500 Internal Server Error with a generic message (and optionally logs the error for debugging).
- **Why:**
  - To prevent the server from crashing and to provide a consistent error response for unexpected issues.

---

## Example: Update Contact API Flow (Detailed)

1. **Request:** `PUT /api/admin/contacts/:Qid`
   - Client sends a PUT request with the contact ID (`Qid`) and update data (e.g., status, reply) in the body.
2. **Middlewares:** `Protect` → `isAdmin`
   - `Protect` checks for a valid JWT. If missing/invalid, returns 401.
   - `isAdmin` checks user role. If not admin, returns 403.
3. **Controller:** `UpdateContacts`
   - Validates input (e.g., status must be one of [Pending, Resolved, Rejected]).
     - If invalid, returns 400.
   - Finds the contact by `Qid` in the database.
     - If not found, returns 404.
   - Updates the contact's status and/or reply.
     - If DB error, returns 500.
   - Returns updated contact with `success: true` and a message.
4. **Response:**
   - On success: `{ success: true, message: "Contact updated", data: { ...updatedContact } }`
   - On error: `{ success: false, message: "Error message", error: { ...details } }`

---

## Best Practices
- **Validation:** Always check for required fields and valid data in controllers.
- **Error Handling:** Use try/catch blocks in async controllers to handle errors gracefully.
- **Consistent Responses:** Return clear, consistent error messages for the frontend to handle.
- **Logging:** Log errors on the server for debugging (avoid sending stack traces to the client in production).
- **Security:** Never expose sensitive information in error messages.
- **Documentation:** Keep API docs up to date for all endpoints and flows.

---

For further details, see the main `README.md` or contact the maintainer.
