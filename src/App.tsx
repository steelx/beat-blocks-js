import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import "./App.css";
import Environments from "./components/Environments";
import Level from "./components/Level";
import Lights from "./components/Lights";
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
					<Level />
				</Physics>

				<Environments />

				{debugMode && <Perf />}
				{debugMode && <OrbitControls makeDefault />}
			</Canvas>
		</>
	);
}

export default App;
