import env from "#start/env";
import type { HttpContext } from "@adonisjs/core/http";
import app from "@adonisjs/core/services/app";
import { schema } from "@adonisjs/validator";
import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const fileValidation = schema.create({
    file: schema.file({ size: "200mb" }),
});

export const storeCaddyLogs = async ({ request, response }: HttpContext) => {
    const { file } = await request.validate({ schema: fileValidation });
    const generatedFileName = randomBytes(32).toString("base64url");
    const directory = app.tmpPath("uploads/caddy");

    await file.move(directory, {
        name: generatedFileName,
        overwrite: true,
    });

    const filePath = `${directory}/${generatedFileName}`;
    const data = readFileSync(filePath);
    const json = `[ ${data.toString().split("\n").join(",\n").slice(0, -2)} ]`;

    writeFileSync(filePath, json);

    const frontendUrl = env.get("FRONTEND_URL");
    const finalUrl = new URL(`/caddyLogs/${generatedFileName}`, frontendUrl).toString();

    return response.created(`\n${finalUrl}\n`);
};
