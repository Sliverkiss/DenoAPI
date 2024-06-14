import { Context } from "https://deno.land/x/oak/mod.ts";
import { Client as SSHClient } from "https://deno.land/x/ssh/mod.ts";

// 尝试通过SSH连接的函数
export default async function sshLogin(ctx: Context): Promise<Response> {
  const url = ctx.request.url.toString(); // 获取请求的 URL
  const parsedUrl = new URL(url); // 解析 URL
  // 从 URL 中提取参数
  const hostname = parsedUrl.searchParams.get("hostname");
  const port = parsedUrl.searchParams.get("port");
  const username = parsedUrl.searchParams.get("username");
  const password = parsedUrl.searchParams.get("password");

  const client = new SSHClient();
  try {
    await client.connect({
      hostname: hostname || "",
      port: port ? parseInt(port) : 22,
      username: username || "",
      password: password || "",
    });
    console.log("SSH连接成功。");
    return "SSH连接成功。";
  } catch (e) {
    console.error(`SSH连接失败，错误信息: ${e}`);
  } finally {
    client.close();
  }
}