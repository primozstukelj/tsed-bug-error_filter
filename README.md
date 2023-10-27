# Project to reproduce an issue with tsed/express

The issue is described in <[https://github.com/tsedio/tsed/issues/2416](https://github.com/tsedio/tsed/issues/2492)>.

## Integration tests

Run:

```shell
npm run test
```

## To test manually

### When error is thrown in controller, the ctx.request.params are not defined in ErrorFilter

To reproduce it:

```shell
curl --request POST --url http://localhost:8083/rest/error/testError?queryId=test --data '{"bodyId": "bodyId"}'
```
Response with status code 500 is returned and object that contains params, query and body object. Observe params are empty.
