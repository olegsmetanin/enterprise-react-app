# enterprise-react-app
Enterprise React Application example


Run postgresql

```sh
docker run --name entapp_db -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -e POSTGRES_DB=entapp_db -d postgres
```

Run application

```sh
npm install
npm run pkg:install
npm run webcomponents:build
npm run webclient:vendors:build
npm run webclient:webcomponents:build
npm run webclient:watch
npm run server:watch
```

open http://localhost:8181/

When package.json changes:

```sh
npm run pkg:gen
```
