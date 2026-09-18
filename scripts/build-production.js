import { execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const projectRoot = path.resolve(__dirname, "..");
const distPath = path.join(projectRoot, "dist");
const serverEntryPoint = path.join(distPath, "SaludULV.js");

try {
    console.log("Limpiando el build anterior...");
    rmSync(distPath, { recursive: true, force: true });

    console.log("Compilando TypeScript para producción...");
    const typescriptCompiler = require.resolve("typescript/bin/tsc");
    execFileSync(process.execPath, [
        typescriptCompiler,
        "--emitDeclarationOnly",
        "false",
        "--rewriteRelativeImportExtensions",
        "true"
    ], {
        cwd: projectRoot,
        stdio: "inherit"
    });

    if (!existsSync(serverEntryPoint)) {
        throw new Error("La compilación terminó sin generar dist/SaludULV.js");
    }

    console.log("Build de producción generado correctamente en dist/.");
    console.log("El proyecto ya está listo para subir a CapRover.");
} catch (error) {
    console.error("No se pudo generar el build de producción:", error.message);
    process.exit(1);
}
