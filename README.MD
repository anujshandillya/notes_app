# Notes App - SSD Lab Assignment 4

### Repository: [https://github.com/anujshandillya/notes_app](https://github.com/anujshandillya/notes_app)

## Run locally

1. Install dependencies with `yarn install` or `npm install` in both `server` and `client`.
2. In one terminal: `cd server && yarn dev` or `cd server && npm run dev`.
3. In another terminal: `cd client && yarn dev` or `cd client && npm run dev`.
4. Open the URL printed by Vite (usually http://localhost:5173).

## API

- `GET /api/notes`: list notes, newest created first.
- `POST /api/notes`: create with `{ "title": "An idea", "content": "Write it down" }`.
- `DELETE /api/notes/:id`: delete a note.
