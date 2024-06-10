import {
  CameraControls,
  ContactShadows,
  Environment,
  Text,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Avatar } from "./Avatar";

//After asking leo the  dots of loading
const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) => {
          if (loadingText.length > 2) {
            return ".";
          }
          return loadingText + ".";
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);

  if (!loading) return null;
  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

//export to the central of app
export const Central = () => {
  //camera controls of the by using reference of the camera
  const cameraControls = useRef();

  //by using context manipulating the variables of another file
  const { cameraZoomed } = useChat();
  const { slideChat } = useChat();

  //current look of the camera
  useEffect(() => {
    cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
  }, []);

  //If the camerazoom and !camerazoom the changing of the camera
  useEffect(() => {
    if (cameraZoomed) {
      cameraControls.current.setLookAt(0, 1.7, 2, 0, 1.5, 0, true);
    } else {
      cameraControls.current.setLookAt(0, 2.2, 6, 0, 1.0, 0, true);
    }
  }, [cameraZoomed]);

  //To changing the position of the avatar leo
  const [slidePosition, setSlidePosition] = useState([0, 0, -0.5]);
  useEffect(() => {
    if (slideChat) {
      setSlidePosition([-0.5, 0, -0.5]);
      console.log("clicked");
    } else {
      setSlidePosition([0, 0, -0.5]);
    }
  }, [slideChat]);

  //return the central
  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment files="/src/assets/studio.hdr" background={true} />
      {/* Wrapping Dots into Suspense to prevent Blink when Troika/Font is loaded */}
      <Suspense>
        <Dots position-y={1.85} position-x={-0.06} />
      </Suspense>
      <Avatar position={slidePosition} />
      <ContactShadows opacity={0.7} />
    </>
  );
};
