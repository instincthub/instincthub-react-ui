# Setting up NEXT_AUTH
```yarn add next-auth```

[Setup guide](https://next-auth.js.org/getting-started/example)

the `.env` needs to be set.

```
API_HOST=http://127.0.0.1:8000/
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=
INSTINCTHUB_AUTH_SECRET=
FACEBOOK_ID=
FACEBOOK_SECRET=
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_ID=
GOOGLE_SECRET=
TWITTER_ID=
TWITTER_SECRET=
```

## Generate NEXTAUTH_SECRET
```
openssl rand -base64 32
```