import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import duckModel from "./Duck.glb";
import grass from "./grass.png";
import psyduckModel from "./psyduck.glb";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function preloadAssetsAndGet(input: any) {
	useLoader.preload(GLTFLoader, input);
	return useLoader(GLTFLoader, input);
}

function preloadTexturesAndGet(input: string) {
	useLoader.preload(TextureLoader, input);
	return useLoader(TextureLoader, input);
}

const assets = {
	textures: {
		grass: () => preloadTexturesAndGet(grass),
	},
	models: {
		psyduck: () => preloadAssetsAndGet(psyduckModel),
		duck: () => preloadAssetsAndGet(duckModel),
	},
};

export default assets;
