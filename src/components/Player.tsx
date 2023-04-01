import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier, type RapierRigidBody } from "@react-three/rapier";
import { useEffect, useRef } from 'react';
import { Vector3 } from "three/src/math/Vector3";

const DOWN_VEC3 = { x: 0, y: -1, z: 0 }
const MAX_TIME_OF_IMPACT = 3
const isSolid = true
const RAY_CAST_ORIGIN = 0.31

const Player = () => {
	const { rapier, world } = useRapier()
	const rapierWorld = world.raw()

	const ref = useRef<RapierRigidBody>(null!)
	const [subscribeKeys, getKeys] = useKeyboardControls()

	useEffect(() => subscribeKeys((state) => state.jump, (jump) => {
		const origin = ref.current?.translation()
		if (jump && origin) {
			origin.y -= RAY_CAST_ORIGIN;
			const ray = new rapier.Ray(origin, DOWN_VEC3);
			const hit = rapierWorld.castRay(ray, MAX_TIME_OF_IMPACT, isSolid);
			if (hit?.toi < RAY_CAST_ORIGIN) {
				ref.current?.applyImpulse({ x: 0, y: 0.5, z: 0 }, true)
			}
		}
	}), [])

	// Keyboard
	useFrame((state, dt) => {
		const { moveForward, moveBackward, moveLeft, moveRight, jump } = getKeys()

		const impulse = { x: 0, y: 0, z: 0 }
		const torque = { x: 0, y: 0, z: 0 }
		const impulseStrength = 0.5 * dt
		const torqueStrength = 0.1 * dt

		if (moveForward) {
			impulse.z += impulseStrength
			torque.x += torqueStrength
		}
		if (moveBackward) {
			impulse.z -= impulseStrength
			torque.x -= torqueStrength
		}
		if (moveLeft) {
			impulse.x += impulseStrength
			torque.z -= torqueStrength
		}
		if (moveRight) {
			impulse.x -= impulseStrength
			torque.z += torqueStrength
		}

		ref.current?.applyImpulse(impulse, true)
		ref.current?.applyTorqueImpulse(torque, true)
	})

	// CAMERA
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

	return (
		<RigidBody
			ref={ref}
			position={[0, 1, 0]}
			restitution={0.3}
			friction={0.7}
			linearDamping={0.5}
			angularDamping={0.5}
			colliders="trimesh"
		>
			<mesh castShadow>
				<icosahedronGeometry args={[0.3, 1]} />
				<meshStandardMaterial flatShading color="limegreen" />
			</mesh>
		</RigidBody>
	);
}

export default Player
