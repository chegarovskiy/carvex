"use client";

import { useEffect, useState } from "react";

export default function SearchSelectOptions() {
  const [marks, setMarks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);



  return (
    <>
      <div>block marks</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {marks.map((mark, index) => (
            <li key={index}>asdfasdf</li>
          ))}
        </ul>
      )}
    </>
  );
}
