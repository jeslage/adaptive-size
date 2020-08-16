import React, { useContext, FC, useState, useEffect, useMemo } from "react";
import throttle from "lodash.throttle";

import { SettingsContext } from "../../contexts";
import { defaultConfig } from "../../contexts/SettingsProvider";

import StyledText from "./Text.style";
import InlineSettings from "./subcomponents/InlineSettings/InlineSettings";
import TextType from "../TextType";
import { getFontStyle } from "../../helper";
import Head from "next/head";

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

  return <div className="text__innerWidth">{innerWidth}px</div>;
};

const Text: FC<TextProps> = ({ className }) => {
  const {
    items,
    fonts,
    breakpoints,
    steps,
    project,
    updateProject
  } = useContext(SettingsContext);

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
