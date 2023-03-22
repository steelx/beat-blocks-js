import { TextureLoader } from "three/src/loaders/TextureLoader";

import grass from "./assets/grassp.jpg";

const grassTexture = new TextureLoader().load(grass);

export { grassTexture };
