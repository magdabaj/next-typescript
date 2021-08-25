import React from "react";

const Layout = ( children : React.ReactNode) => {
  return <>
      <h1>Header</h1>
      <main>
          {children}
      </main>
  </>
}

export default Layout