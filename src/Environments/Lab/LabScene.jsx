import wallTexture from "../../assets/textures/blueWall2.jpg";
//import wallTexture from "../../assets/textures/greyWall.jpg";
//import floorTexture from "../../assets/textures/floor.png";
import floorTexture from "../../assets/textures/floor6.jpg";
import ceilingTexture from "../../assets/textures/ceilingLamps.jpg";

import lights from "../../assets/3D_Components/ceiling_lamp_-_11mb.glb";

import whiteBoard from "../../assets/3D_Components/white_board.glb";

import teacherDesk from "../../assets/3D_Components/teacher_desk.glb";

import ProjectorScreen from "../../assets/3D_Components/projector_screen.glb"; 
import Projector from "../../assets/3D_Components/projector.glb"; 

import DeskEntity from '../../EnvironmentComponents/DeskEntity.jsx';

import SharedDesk from '../../EnvironmentComponents/SharedDesk.jsx';

import DoubleDoor from "../../assets/3D_components/double_door_692.glb";
import WindowBlind from "../../assets/3D_components/not_see_through_window.glb";

import arduino_uno from "../../assets/3D_components/arduino_uno.glb"
import maleAvatarModel from "../../assets/avatars/maleStudent.glb";
import womanExplainingSomething from "../../assets/3D_components/explaining_something.glb";

import PdfViewer from "../../PdfViewer.jsx";
import VideoViewer from "../../VideoViewer.jsx";
import AssetViewer from "../../AssetViewer.jsx";


import { useState , useRef , useEffect} from "react";

import AC from "../../assets/3D_components/conditioner_slide_dc.glb";
import pcCharger from "../../assets/3D_components/low_poly_pc_cable.glb";
//import cableWiring from "../../assets/3D_components/power_cable_wiring.glb";
import cableWiring from "../../assets/3D_components/factory_parts.glb";
import securityCamera from "../../assets/3D_components/security_camera.glb";




import pdfUrl from "../../assets/PDFs/rapport.pdf";
import videoPath from "../../assets/videos/courseName_courseId.mp4";

function LabScene({ video , pdf , assets=[] }) {


  const tofferLightsPositions= [
    ["-30 15 -31","-30 15 -18","-30 15 -4","-30 15 8.5","-30 15 23","-30 15 37"],
    ["-10 15 -37","-10 15 -24","-10 15 -10","-10 15 2.5","-10 15 15.4", "-10 15 28.5"],
    ["10 15 -31","10 15 -18","10 15 -4","10 15 8.5","10 15 23", "10 15 37"],
    ["30 15 -37","30 15 -24","30 15 -10","30 15 2.5","30 15 15.4", "30 15 28.5"],
  ];
{/* Script to play and pause the video */}
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const controlRef = useRef(null);

  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    const controlElement = controlRef.current;

    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
      controlElement.setAttribute('src', '#pause');
    } else {
      videoElement.pause();
      setIsPlaying(false);
      controlElement.setAttribute('src', '#play');
    }
  };
    return (
        <>
            <a-scene physics>

                <a-assets>
                    <a-asset-item id="ceilingLamp" src={lights} />
                    <img id="floorTexture" src={floorTexture} />
                    <img id="wallTexture" src={wallTexture} />
                    <img id="ceilingTexture" src={ceilingTexture} />
                    <img id="play" src="" alt="../../assets/icons/play.webp" />
                    <img id="pause" src="" alt="../../assets/icons/pause.webp" />

                </a-assets>

                {/* Ambient Lighting */}
                <a-entity light="type: ambient; intensity: 0.5" />

                {/* Directional Lighting */}
                <a-entity light="type: directional; intensity: 0.8" position="0 30 30" />

                {/* Camera */}
                <a-camera position="25 10 25"  rotation="0 -90 0" >
                </a-camera>

                {/* Camera with avatar model as a child */}
                <a-entity id="rig" position="12 8 12"  rotation="0 -90 0" movement-controls >
                    <a-camera wasd-controls="acceleration: 90" look-controls="pointerLockEnabled: true">
                        {/* The avatar model is positioned relative to the camera */}
                        <a-gltf-model 
                            src={maleAvatarModel}
                            position="0 -5 6" 
                            rotation="0 180 0"
                            scale="15 15 15">
                        </a-gltf-model>
                        <a-cursor color="#FF0000"></a-cursor>
                    </a-camera>
                </a-entity>
                {/* Floor */}
                <a-plane 
                    rotation="-90 0 0" 
                    width="80" 
                    height="80" 
                    material="src: #floorTexture; repeat: 10 10" 
                />

                {/* Walls */}
                <a-box 
                    position="0 10 -40" 
                    rotation="0 0 0" 
                    width="80" 
                    height="20" 
                    depth="0.1" 
                    material="src: #wallTexture; " 
                />

                <a-box 
                    position="40 10 0" 
                    rotation="0 -90 0" 
                    width="80" 
                    height="20" 
                    depth="0.1" 
                    material="src: #wallTexture; " 
                />

                <a-box 
                    position="-40 10 0" 
                    rotation="0 90 0" 
                    width="80" 
                    height="20" 
                    depth="0.1" 
                    material="src: #wallTexture;" 
                />

                <a-box 
                    position="0 10 40" 
                    rotation="0 180 0" 
                    width="80" 
                    height="20" 
                    depth="0.1" 
                    material="src: #wallTexture;" 
                />

                {/* Ceiling */}
                <a-plane 
                    position="0 20 0" 
                    rotation="90 0 0" 
                    width="80" 
                    height="80" 
                    material="src: #ceilingTexture; repeat: 2 3" 
                />

                {/* Ceiling Lamps with Lights */}
                <a-entity>
                {
                    tofferLightsPositions.map((row, rowIndex) => (
                        row.map((position, colIndex) => (
                        <a-entity 
                            key={`${rowIndex}-${colIndex}`} 
                            light="type: point; intensity: .6; distance: 20" 
                            position={position}
                        ></a-entity>
                        ))
                    ))
                    }

                </a-entity>

                
                {/* Teacher Desk */}
                <a-gltf-model 
                    src={teacherDesk} 
                    position="-30 1.9 0" 
                    scale=".09 .09 .09"
                    rotation="0 180 0"
                ></a-gltf-model>


                <a-gltf-model  
                src={womanExplainingSomething}
                position="-30 0 -16"
                scale="3.8 3.8 3.8"
                rotation="0 90 0"
                animation-mixer="clip: mixamo ; autoplay: true"
                ></a-gltf-model>




                {/* Desks with chairs with lights and pcs */}
                <DeskEntity position="-24 0 -36" rotation="0 0 0"/>
                <DeskEntity position="-12 0 -36" rotation="0 0 0"/>
                <DeskEntity position="0 0 -36"rotation="0 0 0" />
                <DeskEntity position="12 0 -36" rotation="0 0 0"/>
                <DeskEntity position="24 0 -36" rotation="0 0 0"/>


                <DeskEntity position="-24 0 36" rotation="0 180 0"/>
                <DeskEntity position="-12 0 36" rotation="0 180 0"/>
                <DeskEntity position="0 0 36" rotation="0 180 0"/>
                <DeskEntity position="12 0 36" rotation="0 180 0"/>
                <DeskEntity position="24 0 36" rotation="0 180 0"/>


                {/*Door  */}
                <a-gltf-model 
                    src={DoubleDoor} 
                    position="-40 0 25" 
                    scale=".07 .07 .07"
                    rotation="0 -90 0"
                ></a-gltf-model>

                {/*Window blinds  */}
                <a-gltf-model 
                    src={WindowBlind} 
                    position="-18 8 39.7" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>
                <a-gltf-model 
                    src={WindowBlind} 
                    position="0 8 39.7" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>
                <a-gltf-model 
                    src={WindowBlind} 
                    position="18 8 39.7" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>

                <a-gltf-model 
                    src={WindowBlind} 
                    position="-18 8 -39.7" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>
                <a-gltf-model 
                    src={WindowBlind} 
                    position="0 8 -39.7" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>
                <a-gltf-model 
                    src={WindowBlind} 
                    position="18 8 -39.7" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>



                {/* White Board 
                <a-gltf-model 
                    src={whiteBoard} 
                    position="37 0 2" 
                    scale=".04 .04 .04"
                    rotation="0 90 0"
                ></a-gltf-model>
                */}

                {/* Projector screen */}
                <a-gltf-model 
                    src={ProjectorScreen} 
                    position="39.4 15 -17" 
                    scale="2 4 4"
                    rotation="0 0 0"
                ></a-gltf-model>
                {/*The video is projected in the projetor screen */}


                {/* Projector  */}
                <a-gltf-model 
                    src={Projector} 
                    position="30 18 -17" 
                    scale="5 5 5"
                    rotation="0 90 0"
                ></a-gltf-model>

                {/*AC */}
                <a-gltf-model  
                    src={AC}
                    position="39 18 5"
                    scale="13 9 9"
                    rotation="0 -90 0"
                ></a-gltf-model>
                <a-gltf-model  
                    src={AC}
                    position="-39 18 0"
                    scale="13 9 9"
                    rotation="0 90 0"
                ></a-gltf-model>

                <a-gltf-model  
                    src={pcCharger}
                    position="37.1 0 3"
                    scale="2 2 2"
                    rotation="0 180 0"
                ></a-gltf-model>
                <a-gltf-model  
                    src={cableWiring}
                    position="-30 7 -12"
                    scale=".4 .65 .4"
                    rotation="0 135 0"
                ></a-gltf-model>


                <a-gltf-model  
                    src={securityCamera}
                    position="-39 20 -39"
                    scale=".5 .5 .5"
                    rotation="180 -120 0"
                ></a-gltf-model>
                <a-gltf-model  
                    src={securityCamera}
                    position="39 20 39"
                    scale=".5 .5 .5"
                    rotation="180 50 0"
                ></a-gltf-model>




                <a-entity threejs-box position="0 1.6 -3"></a-entity>


                
                {/* PDF Viewer */}
                <PdfViewer pdf={pdfUrl} scale={2.5} rotation="0 -90 0" position="34 5 19" />

                
                <VideoViewer 
                    videoPath={videoPath}
                    position="39 11 -17" 
                    rotation="0 -90 0" 
                    scale="5 5 5" 
                />
                
                
                <AssetViewer
                    asset={arduino_uno}
                    position="20 5 -5"
                    rotation="0 -45 0"
                    scale="1 1 1"
                />
                
            
                <SharedDesk position='0 0 0' rotation='0 0 0'/>
                <SharedDesk position='0 0 -20' rotation='0 0 0'/>
                
                
                <script src="https://cdn.jsdelivr.net/gh/schteppe/cannon.js/build/cannon.min.js"></script>
                <script src="https://cdn.rawgit.com/donmccurdy/aframe-physics-system/v3.3.0/dist/aframe-physics-system.min.js"></script>
            </a-scene>
        </>
        
    );
}

export default LabScene;
