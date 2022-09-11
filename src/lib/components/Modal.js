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
      <div className="modal">
        {" "}
        <button onClick={() => toggleModal()}>toggleModal</button>
      </div>
    </>
  );
}
