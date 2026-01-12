"use client";

export default function RootError({ error, reset }) {
   return (
      <div>
         <h1>حصلت مشكلة 😵</h1>
         <pre>{error.message}</pre>
         <button onClick={reset}>إعادة المحاولة</button>
      </div>
   );
}
