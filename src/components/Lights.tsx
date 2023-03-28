import { CascadedShadowMap } from "./CmsShadow";

export default function Lights() {
	return (
		<>
			<hemisphereLight intensity={0.2} />
			<CascadedShadowMap />
		</>
	);
}
