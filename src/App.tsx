import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import "./App.css";
import Cube from "./components/Cube";
import Environments from "./components/Environments";
import Ground from "./components/Ground";
import Lights from "./components/Lights";
import Object2 from "./components/Object2";
const debugMode = true;
function App() {
	return (
		<>
			<Canvas
				shadows
				camera={{
					position: [10, 10, -10],
					fov: 30,
					near: 1,
					far: 200,
					zoom: 1,
				}}
			>
				<Sky sunPosition={[100, 100, 20]} />
				{/* <color attach="background" args={["#202025"]} /> */}
				<Lights />

				{/**
				 * Game objects
				 */}
				<Physics>
					{debugMode && <Debug />}
					<Cube />
					<Object2 position={[5, 0, 0]} />
					<Ground />
				</Physics>

				<Environments />

				{debugMode && <Perf />}
				{debugMode && <OrbitControls makeDefault />}
			</Canvas>
		</>
	);
}

export default App;
