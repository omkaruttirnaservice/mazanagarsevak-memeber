import { useState, useLayoutEffect } from "react";

export default function useSubdomain() {
  const [subdomain, setSubdomain] = useState(null);

  useLayoutEffect(() => {
    const host = window.location.hostname; // e.g. abc.mazanagarsevak.com
    const parts = host.split(".");
    if (parts.length > 2) {
      setSubdomain(parts[0]); // abc
    }
  }, []);

  return subdomain;
}


// import { useEffect, useState } from "react";

// function useSubdomain() {
//   const [subdomain, setSubdomain] = useState(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const host = window.location.hostname; // e.g. abc.mazanagarsevak.com
//       const parts = host.split(".");
//       if (parts.length > 2) {
//         setSubdomain(parts[0]); // abc
//       }
//     }
//   }, []);

//   return subdomain;
// }
