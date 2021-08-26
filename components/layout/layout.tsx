import React from "react";

const Layout: React.FC = ({children} ) => {
  return <>
      <h1>Header</h1>
      <main>
          {children}
      </main>
  </>
}

export default Layout