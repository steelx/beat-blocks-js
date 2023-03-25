export default function Lights() {
	return (
		<>
			<hemisphereLight intensity={0.2} />
			<directionalLight
				position={[5, 5, 5]}
				shadow-mapSize={128}
				shadow-bias={-0.1}
				castShadow
			>
				<orthographicCamera
					attach="shadow-camera"
					args={[-5, 5, 5, -5, 1, 100]}
				/>
			</directionalLight>
		</>
	);
}
