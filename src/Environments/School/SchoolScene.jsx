import React from "react";
import schoolHall from "../../assets/3D_Components/theater_cinema_auditorium_style_1_of_2.glb";
import ceilingTexture from "../../assets/textures/ceiling.png";
import woodTexture from "../../assets/textures/wood5.webp";
import projectorscreen from "../../assets/3D_Components/projector_screen_7mb.glb";
import podium from "../../assets/3D_Components/podium.glb";
import roundDesk from "../../assets/3D_Components/secretary_desk_-_20mb.glb"
import officeChair from "../../assets/3D_Components/office_chair_modern.glb"
import laptop from "../../assets/3D_Components/laptop_free.glb"
import deskLights from "../../assets/3D_Components/desk_lamp_grren.glb"
import tofferLights from "../../assets/3D_Components/troffer_light_3d_model.glb"
import maleAvatarModel from "../../assets/avatars/maleStudent.glb";

function SchoolScene({ video  , pdf , assets}) {
    const lampPositions = [
        // First row
        [{ x: 0, z: 93 }, { x: -40, z: 93 }, { x: 40, z: 93 }, { x: -80, z: 93 }, { x: 80, z: 93 }],
        // Second row
        [{ x: 0, z: 50 }, { x: -40, z: 50 }, { x: 40, z: 50 }, { x: -80, z: 50 }, { x: 80, z: 50 }, { x: 120, z: 50 }, { x: -120, z: 50 }],
        // Third row
        [{ x: 0, z: 0 }, { x: -40, z: 0 }, { x: 40, z: 0 }, { x: -80, z: 0 }, { x: 80, z: 0 }, { x: 120, z: 0 }, { x: -120, z: 0 }, { x: 160, z: 0 }, { x: -160, z: 0 }],
        // Fourth row
        [{ x: 0, z: -50 }, { x: -40, z: -50 }, { x: 40, z: -50 }, { x: -80, z: -50 }, { x: 80, z: -50 }, { x: 120, z: -50 }, { x: -120, z: -50 }, { x: 160, z: -50 }, { x: -160, z: -50 }, { x: 200, z: -50 }, { x: -200, z: -50 }]
    ];

    return (
        <a-scene>
            <a-assets>
                <img id="CeilingTexture" src={ceilingTexture} />
                <img id="WoodTexture" src={woodTexture} />
                <a-asset-item id="my-avatar-model" src={maleAvatarModel}></a-asset-item>
            </a-assets>

            {/* Camera with avatar model as a child */}
            <a-entity id="rig" position="0 0 20" rotation="0 180 0" movement-controls>
                <a-camera wasd-controls="acceleration: 200" look-controls="pointerLockEnabled: true">
                    {/* The avatar model is positioned relative to the camera */}
                    <a-gltf-model 
                        src="#my-avatar-model" 
                        position="0 -5 6" 
                        rotation="0 0 0"
                        scale="15 15 15">
                    </a-gltf-model>
                </a-camera>
            </a-entity>

            {/* Scene setup */}
            <a-entity light="type: ambient; intensity: 0.7"></a-entity>
            <a-entity light="type: directional; intensity: 0.8" position="0 60 60"></a-entity>

            <a-gltf-model src={schoolHall} scale=".37 .37 .37" position="0 -20 0"></a-gltf-model>

            <a-box position="0 30 155" width="310" height="150" depth="1" material="src:#CeilingTexture;"></a-box>

            <a-gltf-model src={projectorscreen} scale="20 20 20" position="0 60 150" rotation="0 90 0"></a-gltf-model>

            <a-box position="0 -20 85" width="250" height="3" depth="60" material="src:#WoodTexture;"></a-box>
            <a-box position="0 -17 133" width="250" height="3" depth="40" material="src:#WoodTexture;"></a-box>

            <a-gltf-model src={podium} scale="1 1 1" position="0 -13 109" rotation="0 180 0"></a-gltf-model>
            <a-gltf-model src={roundDesk} scale="10 10 10" position="0 -18 90" rotation="0 180 0"></a-gltf-model>
            <a-gltf-model src={laptop} scale=".03 .03 .03" position="0 -8 82"></a-gltf-model>
            <a-gltf-model src={deskLights} scale="3 3 3" position="-15 -8 82" rotation="0 43 0"></a-gltf-model>

            <a-light type="spot" position="-15 -4 82" intensity="11" distance="20" angle="60" penumbra="0.5" castShadow="true" rotation="-90 0 0"></a-light>

            <a-gltf-model src={officeChair} scale="14 14 14" position="0 -18 93" rotation="0 224 0"></a-gltf-model>

            {lampPositions.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    {row.map((pos, lampIndex) => (
                        <React.Fragment key={lampIndex}>
                            <a-gltf-model src={tofferLights} scale="3 3 3" position={`${pos.x} 101 ${pos.z}`} rotation="0 90 0"></a-gltf-model>
                            <a-light type="spot" position={`${pos.x} 40 ${pos.z}`} intensity="0.2" distance="80" angle="45" penumbra="0.3" castShadow="true" rotation="-90 0 0" color="#fff4bf"></a-light>
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ))}
        </a-scene>
    );
}

export default SchoolScene;
