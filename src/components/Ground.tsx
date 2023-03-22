import { usePlane } from "@react-three/cannon";
import { NearestFilter, RepeatWrapping } from "three";
import { grassTexture } from "../textures";

const Ground = () => {
	const [ref] = usePlane(() => {
		// PI = 180 degrees
		// TODO: change to Math.PI / 2 once player get camera
		return {
			rotation: [-Math.PI / 4, 0, 0],
			position: [0, 0, 0],
		};
	});

	grassTexture.magFilter = NearestFilter;
	grassTexture.wrapS = RepeatWrapping;
	grassTexture.wrapT = RepeatWrapping;
	grassTexture.repeat.set(100, 100);

	return (
		<mesh ref={ref}>
			<planeBufferGeometry attach="geometry" args={[300, 300]} />
			<meshStandardMaterial
				attach="material"
				color="white"
				map={grassTexture}
			/>
		</mesh>
	);
};

export default Ground;
