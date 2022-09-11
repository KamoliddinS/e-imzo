import { useState, useEffect } from "react";
import React from "react";
import Button from './Button'
import EIMZO from "./e-imzo/Eimzo";
import classes from "./Modal.module.css";

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
      <Button kind="primary" handleClick={() => toggleModal()} label='E-imzo bilan kirish' /> 
      {isOpen ? (
        <div className={classes.modal} handleClick={() => toggleModal()}>
          <div
            className={classes.modal_content}
            handleClick={(e) => e.stopPropagation()}
          >
            <h1>Modal</h1>
            <Button handleClick={() => toggleModal()} label='Close' />
          </div>
        </div>
      ) : null}
    </>
  );
}
