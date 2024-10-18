import "./styles.css";
import { useState, useEffect, useRef } from "react";
export default function App() {
  const [flag, setFlag] = useState("");
  const [flagArr, setFlagArr] = useState([]);
  const displayStringRef = useRef("");
  const positionRef = useRef(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/656c61"
        );

        const data = await response.text();
        if (data) setFlag(data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!flag) return;

    const timer = setInterval(() => {
      if (positionRef.current < flag.length) {
        const nextChar = flag[positionRef.current];
        displayStringRef.current += nextChar;

        setFlagArr([...displayStringRef.current]);

        positionRef.current += 1;
      } else {
        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [flag]);
  return (
    <div className="App">
      <ul>
        {flagArr.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

//code to get the url
// let elements = document.querySelectorAll('[data-class^="23"]');
// let urlArr = []
// elements.forEach(code=>{
//     let div = code.querySelector('[data-tag$="93"]')
//     if(div){
//     let span = div.querySelector('[data-id*="21"]')
//     let value = span.querySelector('i.char').getAttribute('value')
//     urlArr.push(value)
// 	}
// }
//    )

// console.log(urlArr.join(''))
