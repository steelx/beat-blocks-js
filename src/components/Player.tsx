import { useSphere, type Triplet } from "@react-three/cannon";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Ray, RaycastResult, Vec3 } from "cannon-es";
import { useEffect, useRef } from "react";
import { Vector3 } from "three/src/math/Vector3";
import { type Mesh } from "three/src/objects/Mesh";
import { bouncyMaterial } from "../utils/contact-materials";

const DOWN_VEC3: Vector3 = new Vector3(0, -1, 0);
const MAX_TIME_OF_IMPACT = 3;
const RAY_CAST_ORIGIN = 0.31;

const Player = () => {
	const [ref, api] = useSphere(
		() => ({
			args: [0.3],
			mass: 1,
			position: [0, 2, 0],
			type: "Dynamic",
			material: bouncyMaterial,
		}),
		useRef<Mesh>(null!),
	);

	const playerPosition = useRef(new Vector3(0, 0, 0));
	useEffect(
		() =>
			api.position.subscribe((v) => {
				return (playerPosition.current = new Vector3(...v));
			}),
		[],
	);

	const [subscribeKeys, getKeys] = useKeyboardControls();

	// Cast a Ray
	// origin.x -= RAY_CAST_ORIGIN;
	// const ray = new rapier.Ray(origin, DOWN_VEC3);
	// const hit = rapierWorld.castRay(ray, MAX_TIME_OF_IMPACT, isSolid);
	// if (hit?.toi < RAY_CAST_ORIGIN) {
	// 	ref.current?.applyImpulse({ x: 0, y: 0.5, z: 0 }, true)
	// }

	subscribeKeys(
		(state) => state.jump,
		(jump) => {
			if (jump) {
				const { x, y, z } = playerPosition.current.clone();
				const vFrom = new Vec3(x, y, z);
				vFrom.x -= RAY_CAST_ORIGIN;
				const vTo = new Vec3(0, -1, 0);
				const ray = new Ray(vFrom, vTo);
				const result = new RaycastResult();

				api.applyImpulse([0, 4, 0], [0, 0, 0]);
			}
		},
	);

	// Keyboard
	useFrame((state, dt) => {
		const { moveForward, moveBackward, moveLeft, moveRight, jump } = getKeys();

		const impulse: Triplet = [0, 0, 0];
		const torque: Triplet = [0, 0, 0];
		const impulseStrength = 3 * dt;
		const torqueStrength = 2.5 * dt;

		if (moveForward) {
			impulse[2] += impulseStrength;
			torque[0] += torqueStrength;
		}
		if (moveBackward) {
			impulse[2] -= impulseStrength;
			torque[0] -= torqueStrength;
		}
		if (moveLeft) {
			impulse[0] += impulseStrength;
			torque[2] -= torqueStrength;
		}
		if (moveRight) {
			impulse[0] -= impulseStrength;
			torque[2] += torqueStrength;
		}

		api.applyImpulse(impulse, [0, 0, 0]);
		api.applyTorque(torque);
	});

	// CAMERA
	useFrame((state, dt) => {
		if (playerPosition.current === null) return;
		const cameraPosition = new Vector3();
		cameraPosition.copy(playerPosition.current);
		cameraPosition.y += 1.5;
		cameraPosition.z -= 5;

		const cameraTarget = new Vector3();
		cameraTarget.copy(playerPosition.current);
		cameraTarget.y += 0.35;

		state.camera.position.lerp(cameraPosition, 0.05);
		state.camera.lookAt(cameraTarget);
		state.camera.updateProjectionMatrix();
	});

	return (
		<mesh castShadow ref={ref}>
			<icosahedronGeometry args={[0.3, 1]} name="Player" />
			<meshStandardMaterial flatShading color="limegreen" />
		</mesh>
	);
};

export default Player;
