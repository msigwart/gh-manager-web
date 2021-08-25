# GitHub Manager - Web
Test project for Datawrapper by Marten Sigwart.

## Run locally
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy to Cloud
Build docker image:

```bash
npm run build:docker
```

Push docker image:
```bash
docker push gcr.io/gh-manager-324012/gh-manager-web:0.1.0
```

Deploy revision
1. Go to Google Cloud Console > Google Cloud Run
2. Select service `gh-manager-web`
3. Click "Edit and deploy new revision"
4. Select new container image URL
5. Click "Deploy"
