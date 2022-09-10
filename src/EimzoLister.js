import EIMZO from "./lib/components/e-imzo/Eimzo";
import Button from "./lib/components/Button";
import Badge from "./lib/components/Badge";
import { useState, useEffect } from "react";
import React from "react";

export const EimzoLister = () => {
  const [certificates, setCertificates] = useState(null);
  const EIMZOClient = new EIMZO();

  useEffect(() => {
    console.log("EimzoLister useEffect");
    let data = null;
    EIMZOClient.install()
      .then((value) => {
        data = value;
        EIMZOClient.listAllUserKeys()
          .then((data) => {
            console.log("data arrived");
            setCertificates(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("EimzoLister useEffect error", error);
      });

    console.log(data);
  }, []);
  console.log(certificates);
  return <div>eimzoLister</div>;
};
