import { useState, useEffect } from "react";
import React from "react";
import EIMZO from "./e-imzo/Eimzo";

export default function Modal() {
  const [certificates, setCertificates] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={() => toggleModal()}>E-imzo bilan kirish </button>
      {isOpen ? (
        <div className="modal" onClick={() => toggleModal()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>Modal</h1>
            <button onClick={() => toggleModal()}>close</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
