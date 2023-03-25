import {
	CuboidCollider,
	RapierRigidBody,
	RigidBody,
} from "@react-three/rapier";
import { useRef } from "react";

export default function Cube() {
	const ref = useRef<RapierRigidBody>(null!);

	const handleClick = () => {
		const p = () => Math.random() - 0.5;
		ref.current?.applyImpulse({ x: 0, y: 5, z: 0 }, true);
		ref.current?.applyTorqueImpulse({ x: p(), y: p(), z: p() }, true);
	};

	return (
		<RigidBody ref={ref} colliders={false} position={[-2, 10, 0]}>
			<mesh
				rotation={[-Math.PI / 4, 0, 0]}
				onPointerDown={handleClick}
				castShadow
			>
				<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
				<meshPhongMaterial color={0x11ff0a} />
				<CuboidCollider args={[0.5, 0.5, 0.5]} />
			</mesh>
		</RigidBody>
	);
}
