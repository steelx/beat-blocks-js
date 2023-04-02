import { CollideEvent, useBox, type Triplet } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { nanoid } from "nanoid";
import { PropsWithChildren, useMemo, useRef } from "react";
import { ColorManagement, MeshStandardMaterial, type Mesh } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { BoxGeometry } from "three/src/geometries/BoxGeometry";
import assets from "../assets/assets";
import { boxMaterial, groundMaterial, useContactMaterials } from "../utils/contact-materials";
import { MovingCube } from "./MovingObject";
import { Props } from "./types";

ColorManagement.legacyMode = false; // FIX for children not receiving shadows/brightness

const boxGeometry = new BoxGeometry(1, 1, 1);
const floor0Material = new MeshStandardMaterial({ color: "limegreen" });
const floor1Material = new MeshStandardMaterial({ color: 0x46846f });
const floor2Material = new MeshStandardMaterial({ color: 0xa5a682 });
const obstacle1Material = new MeshStandardMaterial({ color: 0xe73f2e });
const redMaterial = new MeshStandardMaterial({ color: 0xe73f2e });
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
	const scale: Triplet = [BLOCK_SIZE, 0.3, BLOCK_SIZE]
	const [ref] = useBox<Mesh>(() => ({
		position, type: "Static", args: scale,
		material: groundMaterial
	}))
	return (
		<>
			<mesh
				ref={ref}
				geometry={geometry}
				material={material}
				scale={scale}
				receiveShadow
			/>
			{children}
		</>
	);
};

const BlockStart: React.FC = () => (
	<Block position={[0, 0, 0]} material={floor1Material} />
);

const BlockSpinner: React.FC<{ position: Triplet }> = ({ position }) => {
	const [mx, my, mz] = position;
	const meshScale: Triplet = [3.5, 0.3, 0.3];
	const obstaclePosition: Triplet = [mx, my + 0.5, mz]

	const [obstacleRef, api] = useBox<Mesh>(() => ({
		args: meshScale, mass: 1, position: obstaclePosition, type: "Kinematic", material: boxMaterial
	}), useRef<Mesh>(null!))

	useFrame(() => {
		// rotate in place
		api.angularVelocity.set(0, 2, 0)
	})

	return (
		<Block position={position} material={floor2Material}>
			<mesh
				ref={obstacleRef}
				geometry={boxGeometry}
				material={obstacle1Material}
				scale={[3.5, 0.3, 0.3]}
				castShadow
			/>
		</Block>
	);
};

const BlockSpinner2: React.FC<{ position: Triplet }> = ({ position }) => {
	const [mx, my, mz] = position;
	const scale: Triplet = [2.0, 0.1, 0.1];
	const obstaclePosition: Triplet = [mx, my + 0.5, mz]

	const [obstacleRef, api] = useBox<Mesh>(() => ({
		args: scale, mass: 1, position: obstaclePosition, type: "Kinematic", material: boxMaterial
	}), useRef<Mesh>(null!))

	useFrame((state) => {
		// rotate in place
		api.angularVelocity.set(0, 2, 0)

		const [x, y, z] = obstaclePosition;
		const time = state.clock.getElapsedTime();
		const angle = time * 4;
		const mx = Math.cos(angle) + x;
		const mz = Math.sin(angle) + z;
		const my = Math.cos(angle) * 0.4 + y;
		api.position.set(mx, my, mz)
	})

	return (
		<Block position={position} material={floor2Material}>
			<mesh
				ref={obstacleRef}
				geometry={boxGeometry}
				material={obstacle1Material}
				scale={scale}
				castShadow
			/>
		</Block>
	);
};

const BlockAxe: React.FC<{ position: Triplet }> = ({ position }) => {
	const [mx, my, mz] = position;
	const scale: Triplet = [3.5, 1, 1];
	const obstaclePosition: Triplet = [mx, my + 0.5, mz]

	const [obstacleRef, api] = useBox<Mesh>(() => ({
		args: scale, mass: 1, position: obstaclePosition, type: "Kinematic", material: boxMaterial
	}), useRef<Mesh>(null!))

	useFrame((state) => {
		// bounce up like axe

		const [x, y, z] = obstaclePosition;
		const time = state.clock.getElapsedTime();
		const angle = time * 4;
		const my = Math.cos(angle) + y;
		api.position.set(x, my, z)
	})

	return (
		<Block position={position} material={floor2Material}>
			<mesh
				ref={obstacleRef}
				geometry={boxGeometry}
				material={obstacle1Material}
				scale={scale}
				castShadow
			/>
		</Block>
	);
};

const BlockEnd: React.FC<{ position: Triplet }> = ({ position }) => {
	const [mx, my, mz] = position;
	const scale: Triplet = [0.5, 0.5, 0.5];
	const obstaclePosition: Triplet = [mx, my + 0.5, mz]
	const [ref] = useBox<Mesh>(() => ({
		args: scale, mass: 1, position: obstaclePosition, type: "Kinematic", rotation: [0, Math.PI * 0.3, 0], material: boxMaterial, onCollide: (e: CollideEvent) => {
			if (e.body.hasOwnProperty('geometry')) {
				const body = e.body as Mesh;

				if (body.geometry.name === "Player") {
					console.log("you won");
					// @ts-ignore
					body.material = wallMaterial
				}
			}
		}
	}), useRef<Mesh>(null!))

	const duck = assets.models.duck() as GLTF;
	duck.scene.children.forEach((mesh) => (mesh.castShadow = true));

	return (
		<group>
			<MovingCube position={[mx, 1 + my, mz - 1]} size={[1, 1, .5]} />
			<Block position={position} material={floor0Material}>
				<primitive object={duck.scene} scale={0.5} ref={ref} />
			</Block>
		</group>
	);
};

export default function Level() {
	const count = 4;
	const blockTypes = [BlockSpinner, BlockSpinner2, BlockAxe];

	const blocks = useMemo(() => {
		const stack = [];
		for (let i = 0; i < count; i++) {
			const type = blockTypes[Math.floor(Math.random() * blockTypes.length)];
			stack.push(type);
		}

		return stack;
	}, [count, blockTypes]);

	useContactMaterials()

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
