import { useFrame } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier/dist/declarations/src/types";
import type { RefObject } from "react";
import { Euler } from "three/src/math/Euler";
import { Quaternion } from "three/src/math/Quaternion";
import { Position } from "../components/types";

/**
 * useKinematicRotation: rotates in slicing moves
 * @param ref must be from Rapier RigidBody with type="kinematicPosition"
 * @param relativePosition position relative to the center of the object/parent
 */
export const useKinematicRotation = (
	ref: RefObject<RapierRigidBody>,
	relativePosition: Position,
) => {
	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		const eulerRotation = new Euler(0, time, 0);
		const quaternion = new Quaternion();
		quaternion.setFromEuler(eulerRotation);
		ref.current?.setNextKinematicRotation(quaternion);

		// change position
		const angle = time * 1.2;
		const x = Math.cos(angle) + relativePosition[0];
		const z = Math.sin(angle) + relativePosition[2];
		ref.current?.setNextKinematicTranslation({ x, z, y: relativePosition[1] });
	});
};

/**
 * useSimpleRotation: rotates in position
 * @param ref must be from Rapier RigidBody with type="kinematicPosition"
 * @param speed rotation speed multiplier
 */
export const useSimpleRotation = (
	ref: RefObject<RapierRigidBody>,
	speed = 1,
) => {
	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		const eulerRotation = new Euler(0, time * speed, 0);
		const quaternion = new Quaternion();
		quaternion.setFromEuler(eulerRotation);
		ref.current?.setNextKinematicRotation(quaternion);
	});
};
