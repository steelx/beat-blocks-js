import { Environment, Lightformer } from "@react-three/drei";

export default function Environments() {
	return (
		<>
			<Environment resolution={1024}>
				<group rotation={[-Math.PI / 4, 0, 0]}>
					<Lightformer
						form="ring"
						intensity={1}
						rotation-x={Math.PI / 2}
						position={[0, 5, -9]}
						scale={[2, 100, 1]}
					/>
					<Lightformer
						form="ring"
						intensity={1}
						rotation-y={Math.PI / 2}
						position={[-5, 1, -1]}
						scale={[100, 2, 1]}
					/>
					<Lightformer
						form="ring"
						intensity={0.5}
						rotation-y={Math.PI / 2}
						position={[-5, -1, -1]}
						scale={[10, 2, 1]}
					/>
					<Lightformer
						form="rect"
						intensity={0.5}
						rotation-y={-Math.PI / 2}
						position={[10, 1, 0]}
						scale={[100, 10, 1]}
					/>
				</group>
			</Environment>
		</>
	);
}
