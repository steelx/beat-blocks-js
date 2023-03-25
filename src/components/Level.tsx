import Cube from "./Cube";
import Ground from "./Ground";
import Object2 from "./Object2";

export default function Level() {
	return (
		<>
			<Cube />
			<Object2 position={[5, 0, 0]} />
			<Ground />
		</>
	);
}
