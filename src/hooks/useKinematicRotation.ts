import { useFrame } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier/dist/declarations/src/types";
import type { RefObject } from "react";
import { Euler } from "three/src/math/Euler";
import { Quaternion } from "three/src/math/Quaternion";

/**
 * useKinematicRotation: rotates in slicing moves
 * @param ref must be from Rapier RigidBody with type="kinematicPosition"
 */
export const useKinematicRotation = (ref: RefObject<RapierRigidBody>) => {
	useFrame((state, dt) => {
		const time = state.clock.getElapsedTime();
		const eulerRotation = new Euler(0, time, 0);
		const quaternion = new Quaternion();
		quaternion.setFromEuler(eulerRotation);
		ref.current?.setNextKinematicRotation(quaternion);

		// change position
		const angle = time * 0.5;
		const x = Math.cos(angle) * 2;
		const z = Math.sin(angle) * 2;
		ref.current?.setNextKinematicTranslation({ x, z, y: 0 });
	});
};
