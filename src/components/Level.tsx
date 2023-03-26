import assets from "../assets/assets";
import { useSimpleRotation } from "../hooks/useKinematicRotation";
import { Position, Props } from "./types";
// import psyduck from "../assets/psyduck.glb";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { PropsWithChildren, useRef } from "react";
import { ColorManagement, MeshStandardMaterial } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { BoxGeometry } from "three/src/geometries/BoxGeometry";

ColorManagement.legacyMode = false; // FIX for children not receiving shadows/brightness
const boxGeometry = new BoxGeometry(1, 1, 1);
const floor0Material = new MeshStandardMaterial({ color: "limegreen" });
const floor1Material = new MeshStandardMaterial({ color: 0x46846f });
const floor2Material = new MeshStandardMaterial({ color: 0xa5a682 });
const obstacle1Material = new MeshStandardMaterial({ color: 0xe73f2e });
const wallMaterial = new MeshStandardMaterial({ color: 0xa05a66 });

interface BlockProps extends Props, PropsWithChildren {
	material: MeshStandardMaterial;
}
const Block: React.FC<BlockProps> = ({
	position,
	geometry = boxGeometry,
	material,
	children = null,
}) => {
	return (
		<group position={position}>
			<mesh
				geometry={geometry}
				position={[0, -0.1, 0]}
				scale={[4, 0.2, 4]}
				material={material}
				receiveShadow
			/>
			{children}
		</group>
	);
};

const BlockStart: React.FC = () => (
	<Block position={[0, 0, 0]} material={floor1Material} />
);

const BlockSpinner: React.FC = () => {
	const obstacleRef = useRef<RapierRigidBody>(null!);
	useSimpleRotation(obstacleRef, 2);
	return (
		<Block position={[0, 0, 4]} material={floor2Material}>
			<RigidBody ref={obstacleRef} type="kinematicPosition">
				<mesh
					geometry={boxGeometry}
					material={obstacle1Material}
					scale={[3.5, 0.3, 0.3]}
					castShadow
				/>
			</RigidBody>
		</Block>
	);
};

const BlockSpinner2: React.FC = () => {
	const position = [0, 0, 8] as Position;
	const obstacleRef = useRef<RapierRigidBody>(null!);
	useSimpleRotation(obstacleRef, 0.5);
	return (
		<Block position={position} material={floor2Material}>
			<RigidBody ref={obstacleRef} type="kinematicPosition" friction={0}>
				<mesh
					geometry={boxGeometry}
					material={obstacle1Material}
					scale={[1.5, 0.2, 0.1]}
					castShadow
				/>
			</RigidBody>
		</Block>
	);
};

const BlockEnd = () => {
	const position = [0, 0, 12] as Position;
	const obstacleRef = useRef<RapierRigidBody>(null!);
	useSimpleRotation(obstacleRef, 0.5);
	const psyduck = assets.models.psyduck();

	return (
		<Block position={position} material={floor0Material}>
			<RigidBody type="fixed">
				<primitive
					object={(psyduck as GLTF).scene}
					scale={0.025}
					position={[0, 0, 0]}
				/>
			</RigidBody>
		</Block>
	);
};

export default function Level() {
	return (
		<>
			<BlockEnd />
			<BlockSpinner2 />
			<BlockSpinner />
			<BlockStart />
		</>
	);
}
