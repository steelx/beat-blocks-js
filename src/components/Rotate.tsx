import { useFrame } from "@react-three/fiber";
import { cloneElement, useRef } from "react";
import { Mesh } from "three";

type Props = {
	children: React.ReactElement;
};

const Rotate: React.FC<Props> = ({ children }) => {
	const ref = useRef<Mesh>(null!);

	useFrame((state, dt) => {
		ref.current?.rotateY?.(0.5 * dt);
	});

	return cloneElement(children, { ref });
};

export default Rotate;
