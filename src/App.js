import "./App.css";
import Button from "./lib/components/Button";
import Badge from "./lib/components/Badge";
import EIMZO from "./lib/components/e-imzo/Eimzo";
import Modal from "./lib/components/Modal";
import { useState, useEffect } from "react";

function App() {
  const [certificates, setCertificates] = useState(null);
  const EIMZOClient = new EIMZO();

  useEffect(() => {
    const listAllKeys = async () => {
      const certs = await EIMZOClient.install();
      const data = await EIMZOClient.listAllUserKeys();
      setCertificates(data);
    };

    listAllKeys();

    console.log("certificates", certificates);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="App">
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        {isOpen && <Modal setIsOpen={setIsOpen} />}
      </div>
      {console.log(isOpen)}
    </>
  );
}

export default App;
