import { Physics } from "@react-three/cannon";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import "./App.css";
import Level from "./components/Level";
import Lights from "./components/Lights";
import Player from "./components/Player";
const debugMode = false;
function App() {
	return (
		<KeyboardControls map={[
			{ keys: ["w", "ArrowUp"], name: "moveForward" },
			{ keys: ["s", "ArrowDown"], name: "moveBackward" },
			{ keys: ["a", "ArrowLeft"], name: "moveLeft" },
			{ keys: ["d", "ArrowRight"], name: "moveRight" },
			{ keys: ["Space"], name: "jump" }
		]}>
			<Canvas
				legacy={false}
				shadows
				camera={{
					position: [10, 10, -10],
					fov: 30,
					near: 1,
					far: 200,
					zoom: 1,
				}}
			>
				<color attach="background" args={["#202025"]} />
				<Lights />

				{/**
				 * Game objects
				 */}
				<Suspense fallback={null}>
					<Physics>
						{/* <Debug color="hotpink" scale={1.01}> */}
						<Player />
						<Level />
					</Physics>
				</Suspense>

				{debugMode && <Perf />}
				{debugMode && <axesHelper args={[1]} />}
				{debugMode && <OrbitControls makeDefault />}
			</Canvas>
		</KeyboardControls>
	);
}

export default App;
