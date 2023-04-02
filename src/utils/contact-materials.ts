import { useContactMaterial } from "@react-three/cannon";


export const bouncyMaterial = {
    name: "bouncy",
    /*
    Restitution for this material.
    If non-negative, it will be used instead of the restitution given by ContactMaterials.
    If there's no matching ContactMaterial, the value from .defaultContactMaterial in the World will be used.
    */
    restitution: 1.0,
};

export const slipperyMaterial = {
    /*
    Friction for this material.
    If non-negative, it will be used instead of the friction given by ContactMaterials.
    If there's no matching ContactMaterial, the value from .defaultContactMaterial in the World will be used.
    */
    friction: 0,
    name: "slippery",
};

export const boxMaterial = 'box'

export const groundMaterial = 'ground'

export const useContactMaterials = () => {
    useContactMaterial(groundMaterial, groundMaterial, {
        contactEquationRelaxation: 3,
        contactEquationStiffness: 1e8,
        friction: 0.4,
        frictionEquationStiffness: 1e8,
        restitution: 0.3,
    })

    useContactMaterial(boxMaterial, groundMaterial, {
        contactEquationRelaxation: 3,
        contactEquationStiffness: 1e8,
        friction: 0.4,
        frictionEquationStiffness: 1e8,
        restitution: 0.3,
    })
    useContactMaterial(boxMaterial, slipperyMaterial, {
        friction: 0,
        restitution: 0.3,
    })

    useContactMaterial(groundMaterial, slipperyMaterial, {
        friction: 0,
        restitution: 0.3,
    })

    useContactMaterial(bouncyMaterial, slipperyMaterial, {
        friction: 0,
        restitution: 0.5,
    })
    useContactMaterial(bouncyMaterial, groundMaterial, {
        restitution: 0.9,
    })
    useContactMaterial(bouncyMaterial, bouncyMaterial, {
        restitution: 10.0, // This does nothing because bouncyMaterial already has a restitution
    })
}
