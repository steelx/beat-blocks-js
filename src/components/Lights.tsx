export default function Lights() {
	return (
		<>
			<directionalLight
				intensity={0.925}
				position={[4, 4, 1]}
				shadow-mapSize={[1024, 1024]}
				shadow-camera-near={1}
				shadow-camera-far={10}
				shadow-camera-top={10}
				shadow-camera-right={10}
				shadow-camera-bottom={-10}
				shadow-camera-left={-10}
				castShadow
			>
				<orthographicCamera
					attach="shadow-camera"
					args={[-5, 5, 5, -5, 1, 100]}
				/>
			</directionalLight>
			{/* <hemisphereLight intensity={0.225} /> */}
			<ambientLight intensity={0.25} />
		</>
	);
}
