import React from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";

export default function AddClientsModal() {
  return (
    <>

<button 
type="button" 
className="btn btn-secondary chip-button" 
data-toggle="modal" 
data-target="#AddClientsModal">
  <div className="d-flex align-items-center">
    <FaUser className="icon" />
    <div>Add Client</div>
  </div>
</button>

    </>
  )
}