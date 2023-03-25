import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { useKinematicRotation } from "../hooks/useKinematicRotation";
import { Props } from "./types";

const Object2: React.FC<Props> = ({ position = [0, 0, 0] }) => {
	const ref = useRef<RapierRigidBody>(null!);

	useKinematicRotation(ref);

	return (
		<RigidBody
			position={position}
			ref={ref}
			friction={0}
			type="kinematicPosition"
		>
			<mesh>
				<boxBufferGeometry attach="geometry" args={[0.5, 0.5, 3]} />
				<meshPhongMaterial color={0xffaaff} />
			</mesh>
		</RigidBody>
	);
};

export default Object2;
