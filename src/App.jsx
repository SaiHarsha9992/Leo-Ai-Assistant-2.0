import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Central } from "./components/Central";
import { UI } from "./components/UI";

function App() {
  return (
    <>
      <Loader />
      <Leva hidden />
      <Canvas shadows camera={{ position: [0, -2, 1], fov: 30 }}>
        <Central />
      </Canvas>
      <UI />
    </>
  );
}

export default App;
