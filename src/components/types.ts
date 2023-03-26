import type { BufferGeometry } from "three";
export type Position = [number, number, number];
export interface Props {
	position?: Position;
	geometry?: BufferGeometry;
}
