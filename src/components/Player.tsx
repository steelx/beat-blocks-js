import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { useRef } from 'react';

const Player = () => {
	const ref = useRef<RapierRigidBody>(null!)
	const [subscribeKeys, getKeys] = useKeyboardControls()

	subscribeKeys((state) => state.jump, (jump) => {
		if (jump) {
			ref.current?.applyImpulse({ x: 0, y: 0.5, z: 0 }, true)
		}
	})

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
			torque.x += torqueStrength
		}
		if (moveLeft) {
			impulse.x += impulseStrength
			torque.z -= torqueStrength
		}
		if (moveRight) {
			impulse.x -= impulseStrength
			torque.z += torqueStrength
		}
		if (jump) {
			impulse.y += impulseStrength
		}


		ref.current?.applyImpulse(impulse, true)
		ref.current?.applyTorqueImpulse(torque, true)
	})

	return (
		<RigidBody
			ref={ref}
			position={[0, 1, 0]}
			restitution={0.3}
			friction={0.7}
			linearDamping={0.5}
			angularDamping={0.5}
			colliders="hull"
		>
			<mesh castShadow>
				<icosahedronGeometry args={[0.3, 1]} />
				<meshStandardMaterial flatShading color="limegreen" />
			</mesh>
		</RigidBody>
	);
}

export default Player
