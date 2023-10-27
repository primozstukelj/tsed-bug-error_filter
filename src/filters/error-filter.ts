import { PlatformContext } from '@tsed/common';
import { Catch, ExceptionFilterMethods } from '@tsed/platform-exceptions';

@Catch(Error)
export class ErrorFilter implements ExceptionFilterMethods {
  catch(exception: Error, ctx: PlatformContext): void {
    const [req, res] = [ctx.getRequest(), ctx.getResponse()];
    console.log(ctx.request.params);
    console.log(ctx.request.query);
    console.log(ctx.request.body);
    // ctx.getRequest() => {params: {}, query: {'queryId': 'something'}, body: {'bodyId': 'something'}}
    return res.status(500).send({params: req.params, query: req.query, body: req.body});
  }
}
