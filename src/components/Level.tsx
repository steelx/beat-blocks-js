import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { nanoid } from "nanoid";
import { PropsWithChildren, useMemo, useRef } from "react";
import { ColorManagement, MeshStandardMaterial } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { BoxGeometry } from "three/src/geometries/BoxGeometry";
import assets from "../assets/assets";
import {
	useHorizontalSwing,
	useSimpleRotation,
} from "../hooks/useKinematicRotation";
import { Position, Props } from "./types";

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
const BLOCK_SIZE = 4;
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
				scale={[BLOCK_SIZE, 0.2, BLOCK_SIZE]}
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

const BlockSpinner: React.FC<{ position: Position }> = ({ position }) => {
	const obstacleRef = useRef<RapierRigidBody>(null!);
	useSimpleRotation(obstacleRef, 2);
	return (
		<Block position={position} material={floor2Material}>
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

const BlockSpinner2: React.FC<{ position: Position }> = ({ position }) => {
	const obstacleRef = useRef<RapierRigidBody>(null!);
	useSimpleRotation(obstacleRef, 0.5);
	return (
		<Block position={position} material={floor2Material}>
			<RigidBody ref={obstacleRef} type="kinematicPosition" friction={0}>
				<mesh
					geometry={boxGeometry}
					material={obstacle1Material}
					scale={[1.5, 0.1, 0.1]}
					position={[0, 0.2, 0]}
					castShadow
				/>
			</RigidBody>
		</Block>
	);
};

const BlockAxe: React.FC<{ position: Position }> = ({ position }) => {
	const obstacleRef = useRef<RapierRigidBody>(null!);
	useHorizontalSwing(obstacleRef, position, 2);
	return (
		<Block position={position} material={floor2Material}>
			<RigidBody ref={obstacleRef} type="kinematicPosition" friction={0}>
				<mesh
					geometry={boxGeometry}
					material={obstacle1Material}
					scale={[1.5, 0.1, 0.1]}
					position={[0, 0.2, 0]}
					castShadow
				/>
			</RigidBody>
		</Block>
	);
};

const BlockEnd: React.FC<{ position: Position }> = ({ position }) => {
	const obstacleRef = useRef<RapierRigidBody>(null!);
	useSimpleRotation(obstacleRef, 0.5);
	const duck = assets.models.duck() as GLTF;
	duck.scene.children.forEach((mesh) => (mesh.castShadow = true));

	return (
		<Block position={position} material={floor0Material}>
			<RigidBody
				type="fixed"
				position={[0, 0, 0]}
				rotation={[0, 0, 0]}
				restitution={0.3}
			>
				<primitive object={duck.scene} scale={0.5} />
			</RigidBody>
		</Block>
	);
};

export default function Level() {
	const count = 5;
	const blockTypes = [BlockAxe, BlockSpinner, BlockSpinner2, BlockAxe];

	const blocks = useMemo(() => {
		const stack = [];
		for (let i = 0; i < count; i++) {
			const type = blockTypes[Math.floor(Math.random() * blockTypes.length)];
			stack.push(type);
		}

		return stack;
	}, [count, blockTypes]);

	return (
		<>
			<BlockEnd position={[0, 0.1, (blocks.length + 1) * BLOCK_SIZE]} />
			{blocks.map((BlockType, i) => (
				<BlockType key={nanoid()} position={[0, 0, (i + 1) * BLOCK_SIZE]} />
			))}
			<BlockStart />
		</>
	);
}
