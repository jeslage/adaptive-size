import { useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";

const useComputedStyle = () => {
  const ref = useRef<any>(null);
  const [current, setCurrent] = useState({ size: "0", lineHeight: "0" });

  const update = throttle(() => {
    if (ref.current) {
      const px = window
        .getComputedStyle(ref.current, null)
        .getPropertyValue("font-size");
      const lh = window
        .getComputedStyle(ref.current, null)
        .getPropertyValue("line-height");

      const pxInt = Math.round(parseFloat(px.split("px")[0]) * 10) / 10;
      const lhInt = Math.round(parseFloat(lh.split("px")[0]) * 10) / 10;

      setCurrent({
        size: pxInt.toString(),
        lineHeight: (lhInt / pxInt).toFixed(2)
      });
    }
  }, [400]);

  useEffect(() => {
    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { ref, current, update };
};

export default useComputedStyle;
