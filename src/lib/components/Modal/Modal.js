import { useState } from "react";

export default function Modal({ setIsOpen }) {
  return (
    <>
      <div className="modal">Hello modal</div>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </>
  );
}
