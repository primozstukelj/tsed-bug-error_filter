import {Controller} from "@tsed/di";
import { BodyParams, Context, PathParams, QueryParams } from "@tsed/platform-params";
import { Post, Required} from "@tsed/schema";

@Controller("/")
export class TestController {
  @Post("/noerror/:errorId")
  post(
    @Required()
    @PathParams('errorId', String) errorId: string,
    @Required()
    @QueryParams('queryId', String) query: string,
    @Required()
    @BodyParams('bodyId', String) body: string,
    @Context() ctx: Context,
  ) {
    const req = ctx.getRequest();
    return {params: req.params, query: req.query, body: req.body};
  }

  @Post("/error/:errorId")
  throwError(
    @Required()
    @PathParams('errorId', String) errorId: string,
    @Required()
    @QueryParams('queryId', String) query: string,
    @Required()
    @BodyParams('bodyId', String) body: string,
    @Context() ctx: Context,
  ) {
    // ctx.getRequest() => {params: {'errorId': 'something'}, query: {'queryId': 'something'}, body: {'bodyId': 'something'}}
    throw new Error('This is error');
  }
}
