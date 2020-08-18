import React, { FC, useState, useEffect, useMemo } from "react";
import throttle from "lodash.throttle";
import Head from "next/head";

import {
  useStepsState,
  useProjectState,
  useBreakpointsState,
  useFontsState,
  useItemsState,
  defaultConfig
} from "../../state";

import StyledText from "./Text.style";
import InlineSettings from "./subcomponents/InlineSettings/InlineSettings";
import TextType from "../TextType";
import { getFontStyle } from "../../helper";
export interface TextProps {
  className?: string;
}

const InnerWidth = () => {
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

const Text: FC<TextProps> = ({ className }) => {
  const { project, updateProject } = useProjectState();
  const { steps } = useStepsState();
  const { fonts } = useFontsState();
  const { items } = useItemsState();
  const { breakpoints } = useBreakpointsState();

  const renderFonts = useMemo(
    () => (
      <Head>
        {fonts?.map((font) => (
          <style
            key={font.id}
            dangerouslySetInnerHTML={{ __html: getFontStyle(font) }}
          />
        ))}
      </Head>
    ),
    [fonts]
  );

  return (
    <StyledText className={className}>
      {renderFonts}

      <InnerWidth />

      <a
        href="https://github.com/jeslage/adaptive-size"
        target="_blank"
        className="text__github"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.58 31.77">
          <path
            d="M16.29 0a16.29 16.29 0 00-5.15 31.75c.82.15 1.11-.36 1.11-.79v-2.77C7.7 29.18 6.74 26 6.74 26a4.36 4.36 0 00-1.81-2.39c-1.47-1 .12-1 .12-1a3.43 3.43 0 012.49 1.68 3.48 3.48 0 004.74 1.36 3.46 3.46 0 011-2.18c-3.62-.41-7.42-1.81-7.42-8a6.3 6.3 0 011.67-4.37 5.94 5.94 0 01.16-4.31s1.37-.44 4.48 1.67a15.41 15.41 0 018.16 0c3.11-2.11 4.47-1.67 4.47-1.67a5.91 5.91 0 01.2 4.28 6.3 6.3 0 011.67 4.37c0 6.26-3.81 7.63-7.44 8a3.85 3.85 0 011.11 3v4.47c0 .53.29.94 1.12.78A16.29 16.29 0 0016.29 0z"
            fill="#231e1b"
          />
        </svg>
      </a>

      <div className="text__content" id="textContent">
        {items.map((item, index) => (
          <InlineSettings key={index} item={item}>
            <TextType
              steps={steps}
              breakpoints={breakpoints}
              sizes={item.sizes}
              letterSpacing={item.letterSpacing}
              lineHeights={item.lineHeights}
              name={item.name}
              font={item.font}
              text={project.text}
              onChange={(val) => updateProject({ text: val })}
              onBlur={(val) => {
                if (val === "") {
                  updateProject({ text: defaultConfig.project.text });
                }
              }}
            />
          </InlineSettings>
        ))}
      </div>
    </StyledText>
  );
};

export default Text;
