import { Triplet, useRaycastAll } from "@react-three/cannon"
import { Html } from "@react-three/drei"
import { extend, type Object3DNode } from "@react-three/fiber"
import { useMemo, useState } from "react"
import { BufferGeometry, Line as ThreeLine, Vector3 } from "three"
import prettyPrint from "../utils/prettyPrint"

extend({ ThreeLine })

declare global {
    namespace JSX {
        interface IntrinsicElements {
            threeLine: Object3DNode<ThreeLine, typeof ThreeLine>
        }
    }
}



type RayProps = {
    from: Triplet
    setHit: (e: {}) => void
    to: Triplet
}

function Ray({ from, to, setHit }: RayProps) {
    useRaycastAll({ from, to }, setHit)
    const geometry = useMemo(() => {
        const points = [from, to].map((v) => new Vector3(...v))
        return new BufferGeometry().setFromPoints(points)
    }, [from, to])

    return (
        <threeLine geometry={geometry}>
            <lineBasicMaterial color="black" />
        </threeLine>
    )
}

function Text({ hit }: { hit: unknown }) {
    return (
        <Html center style={{ pointerEvents: 'none', fontSize: 14, top: '100%', left: '-200px', position: 'absolute' }}>
            <pre>{prettyPrint(hit)}</pre>
        </Html>
    )
}

export default function RaycastLine() {
    const [hit, setHit] = useState({})

    return (
        <>
            <Ray from={[0, 0, 0]} to={[0, 1.5, 0]} setHit={setHit} />
            <Text hit={hit} />
        </>
    )
}