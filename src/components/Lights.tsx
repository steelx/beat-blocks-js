export default function Lights() {
	return (
		<>
			<directionalLight
				intensity={1}
				position={[10, 10, 1]}
				shadow-mapSize={[512, 512]}
				shadow-camera-near={0.5}
				shadow-camera-far={300}
				shadow-camera-top={10}
				shadow-camera-right={10}
				shadow-camera-bottom={-10}
				shadow-camera-left={-10}
				castShadow
			>
				<orthographicCamera
					attach="shadow-camera"
					args={[-5, 5, 5, -5, 0.5, 300]}
				/>
			</directionalLight>
			<hemisphereLight intensity={0.225} />
			{/* <ambientLight intensity={0.25} /> */}
		</>
	);
}
