import { useSphere, type Triplet } from "@react-three/cannon";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { type Mesh } from "three/src/objects/Mesh";
import { bouncyMaterial } from "../utils/contact-materials";

const DOWN_VEC3 = { x: 0, y: -1, z: 0 }
const MAX_TIME_OF_IMPACT = 3
const RAY_CAST_ORIGIN = 0.31

const Player = () => {

	const [ref, api] = useSphere(
		() => ({
			args: [0.3],
			mass: 1,
			position: [0, 2, 0],
			type: "Dynamic",
			material: bouncyMaterial
		}),
		useRef<Mesh>(null),
	)

	// const origin = ref.current?.position.clone()!
	// if (origin) {
	// 	origin.y += RAY_CAST_ORIGIN;
	// 	const { x, y, z } = origin
	// 	useRaycastClosest({ from: [x, y, z], to: [x, y - 0.5, z], collisionFilterMask: 1 }, (result) => {
	// 		console.log({ result });
	// 	})
	// }

	const [subscribeKeys, getKeys] = useKeyboardControls()

	subscribeKeys((state) => state.jump, (jump) => {
		if (jump) {
			// origin.x -= RAY_CAST_ORIGIN;
			// const ray = new rapier.Ray(origin, DOWN_VEC3);
			// const hit = rapierWorld.castRay(ray, MAX_TIME_OF_IMPACT, isSolid);
			// if (hit?.toi < RAY_CAST_ORIGIN) {
			// 	ref.current?.applyImpulse({ x: 0, y: 0.5, z: 0 }, true)
			// }

			api.applyImpulse([0, 3, 0], [0, 0, 0])
		}
	})

	// Keyboard
	useFrame((state, dt) => {
		const { moveForward, moveBackward, moveLeft, moveRight, jump } = getKeys()

		const impulse: Triplet = [0, 0, 0]
		const torque: Triplet = [0, 0, 0]
		const impulseStrength = 3 * dt
		const torqueStrength = 2.5 * dt

		if (moveForward) {
			impulse[2] += impulseStrength
			torque[0] += torqueStrength
		}
		if (moveBackward) {
			impulse[2] -= impulseStrength
			torque[0] -= torqueStrength
		}
		if (moveLeft) {
			impulse[0] += impulseStrength
			torque[2] -= torqueStrength
		}
		if (moveRight) {
			impulse[0] -= impulseStrength
			torque[2] += torqueStrength
		}

		api.applyImpulse(impulse, [0, 0, 0])
		api.applyTorque(torque)
	})

	// CAMERA
	/*
	useFrame((state, dt) => {
		const bodyPosition = ref.current?.translation()
		const cameraPosition = new Vector3()
		cameraPosition.copy(bodyPosition as Vector3)
		cameraPosition.y += 0.75
		cameraPosition.z -= 3

		const cameraTarget = new Vector3()
		cameraTarget.copy(bodyPosition as Vector3)
		cameraTarget.y += 0.35

		state.camera.position.lerp(cameraPosition, 0.1)
		state.camera.lookAt(cameraTarget)
	})
	*/

	return (
		<mesh castShadow ref={ref}>
			<icosahedronGeometry args={[0.3, 1]} name="Player" />
			<meshStandardMaterial flatShading color="limegreen" />
		</mesh>
	);
}

export default Player
