import { gameService, GameService } from "./game-service";
import { RequestInfo } from "rwsdk/worker";
import { parseParams } from "@/utils/parse-params";

export interface GameController {
  add: (requestInfo: RequestInfo) => Promise<Response>;
  list: (requestInfo: RequestInfo) => Promise<Response>;
  findById: (requestInfo: RequestInfo) => Promise<Response>;
  delete: (requestInfo: RequestInfo) => Promise<Response>;
}

export function createGameController(_service: GameService): GameController {
  return {
    async add({ request }: RequestInfo): Promise<Response> {
      let body: unknown;
      try {
        body = await request.json();
      } catch (error) {
        return Response.json({
          ok: false,
          error: {
            code: 400,
            message: "Body must be in JSON format.",
          },
        });
      }
      const result = await _service.add(body);
      if (!result.ok) {
        return Response.json({
          ok: false,
          error: result.error,
        });
      }
      return Response.json({
        ok: true,
        data: result.data,
        code: 201,
      });
    },
    async list({ request }: RequestInfo): Promise<Response> {
      const params = parseParams(request);
      const result = await _service.list(params);
      if (result === null) {
        return Response.json({
          ok: false,
          error: {
            code: 404,
            message: `No games for this user could be found.`,
          },
        });
      }
      if (!result.ok) {
        return Response.json({
          ok: false,
          error: result.error,
        });
      }
      return Response.json({
        ok: true,
        data: result.data,
        code: 200,
      });
    },
    async findById({ params }: RequestInfo): Promise<Response> {
      const { id } = params;
      const result = await _service.findById(id);
      if (result === null) {
        return Response.json({
          ok: false,
          error: {
            code: 404,
            message: `Game with the id: ${id} was not found.`,
          },
        });
      }
      if (!result.ok) {
        return Response.json({
          ok: false,
          error: result.error,
        });
      }
      return Response.json({
        ok: true,
        data: result.data,
        code: 200,
      });
    },
    async delete({ request }: RequestInfo): Promise<Response> {
      let body: unknown;
      try {
        body = await request.json();
      } catch (error) {
        return Response.json({
          ok: false,
          error: {
            code: 400,
            message: "Body must be in JSON format.",
          },
        });
      }
      const result = await _service.delete(body);
      if (result === null) {
        return Response.json({
          ok: false,
          error: {
            code: 404,
            message: `Game with the id: ${body} was not found.`,
          },
        });
      }
      if (!result.ok) {
        return Response.json({
          ok: false,
          error: result.error,
        });
      }
      return new Response(null, {
        status: 204,
      });
    },
  };
}

export const gameController = createGameController(gameService);
