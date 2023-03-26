import react from "@vitejs/plugin-react";
import { createLogger, defineConfig } from "vite";

const logger = createLogger();
const loggerWarn = logger.warn;

logger.warn = (msg, options) => {
	// Ignore empty CSS files warning
	if (msg.includes("vite:css") && msg.includes(" is empty")) return;
	loggerWarn(msg, options);
};

// https://vitejs.dev/config/
export default defineConfig({
	customLogger: logger,
	assetsInclude: ["**/*.gltf", "src/assets/*.glb"],
	plugins: [react()],
	server: {
		port: 8080,
	},
});
