import { Triplet, useBox, useSphere } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

type SphereProps = {
    position: Triplet
    radius: number
}

export function MovingSphere({ radius, position }: SphereProps) {
    const [ref, api] = useSphere<Mesh>(() => ({ args: [radius], position, type: 'Kinematic' }))
    useFrame(({ clock: { elapsedTime } }) => {
        api.position.set(position[0], position[1], Math.sin(elapsedTime / 3) * 2)
    })
    return (
        <mesh castShadow ref={ref}>
            <sphereBufferGeometry args={[radius, 32, 32]} />
            <meshNormalMaterial />
        </mesh>
    )
}

type CubeProps = {
    position: Triplet
    size: Triplet
}

export function MovingCube({ size, position }: CubeProps) {
    const [ref, api] = useBox<Mesh>(() => ({ args: size, position, type: 'Kinematic' }))
    useFrame(({ clock: { elapsedTime } }) => {
        api.position.set(Math.sin(elapsedTime / 2) * 2, position[1], position[2])
    })
    return (
        <mesh castShadow ref={ref} position={position}>
            <boxBufferGeometry args={size} />
            <meshNormalMaterial />
        </mesh>
    )
}