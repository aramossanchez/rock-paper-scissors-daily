import { useEffect, useState, useRef } from "react";
import "./counterLoader.css";

export default function CountLoaderComponent() {
  const [counter, setCounter] = useState<number>(3);
  const [counterClass, setCounterClass] = useState<"counter-loader" | "hidden">(
    "counter-loader",
  );
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, []);

  useEffect(() => {
    if (counter <= 0) {
      clearInterval(intervalRef.current!);
      setTimeout(() => {
        setCounterClass("hidden");
      }, 1000);
    }
  }, [counter]);

  return <div className={counterClass}>{counter <= 0 ? "Go!" : counter}</div>;
}
