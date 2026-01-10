import React from 'react'

export default function NotAllowedPage() {

   return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
         <h1>🚫 Access Denied</h1>
         <p>Sorry, you do not have permission to view this page.</p>
         <a href="/home" style={{ color: "blue" }}>Go back to Home Page</a>
      </div>
   );
}
