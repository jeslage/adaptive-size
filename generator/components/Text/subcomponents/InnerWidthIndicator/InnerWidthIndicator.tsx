import { useEffect, useState } from "react";
import throttle from "lodash.throttle";

const InnerWidthIndicator = () => {
  const [innerWidth, setInnerWidth] = useState(0);

  const handleResize = throttle(() => {
    setInnerWidth(window.innerWidth);
  }, [400]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <span className="text__innerWidth">{innerWidth}px</span>;
};

export default InnerWidthIndicator;
