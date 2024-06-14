export default function ping(req: Request): Response {
  return new Response("pong", { status: 200 });
}