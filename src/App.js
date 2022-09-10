import "./App.css";
import Button from "./lib/components/Button";
import Badge from "./lib/components/Badge";

import { EimzoLister } from "./EimzoLister.js";

import Modal from "./lib/components/Modal/Modal";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="App">
        <div className="App">
          <EimzoLister></EimzoLister>
        </div>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        {isOpen && <Modal setIsOpen={setIsOpen} />}
      </div>
      {console.log(isOpen)}
    </>
  );
}

export default App;
