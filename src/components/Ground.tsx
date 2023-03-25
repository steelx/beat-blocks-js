import { RigidBody } from "@react-three/rapier";
import { NearestFilter, RepeatWrapping } from "three";
import { grassTexture } from "../textures";

const Ground = () => {
	grassTexture.magFilter = NearestFilter;
	grassTexture.wrapS = RepeatWrapping;
	grassTexture.wrapT = RepeatWrapping;
	grassTexture.repeat.set(10, 10);

	return (
		<RigidBody type="fixed" restitution={0.3}>
			<mesh receiveShadow position={[0, -0.3, 0]}>
				<boxBufferGeometry attach="geometry" args={[15, 0.1, 15]} />
				<meshPhongMaterial attach="material" map={grassTexture} />
			</mesh>
		</RigidBody>
	);
};

export default Ground;
