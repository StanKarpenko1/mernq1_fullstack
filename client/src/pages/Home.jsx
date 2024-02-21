import React from "react";

import AddClientsModule from "../components/AddClientsModal";
import Clients from "../components/Clients";
import Projects from "../components/Projects";

export default function Home() {
    return (
       <>
       <div className="d-flex gap-3 mb-4">
            <AddClientsModule />
       </div>
          
            <Projects />
            <hr />
            <Clients />
       </>
    );
}