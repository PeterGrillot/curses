import React, { useCallback, useState } from 'react';
import { PressKitType } from '../PressKit.model';

export const TextPost = (props: PressKitType) => {
  const [show, setShow] = useState<boolean>(false)
  const htmlObject = () => {
    return { __html: props.content };
  };

  const handleMouseEnter = useCallback(() => {
    setShow(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <section className="__section">
      {props.content ? <h3>{props.type}</h3> : null}
      {props.type ? <p dangerouslySetInnerHTML={htmlObject()} /> : null}
      {props.url ? (
        <a
          href={props.url}
          rel="noopener noreferrer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          target="_blank"
          download="curse_words_asset_image"
          className="__download-link"
        >
          <img alt="Click to Download" src={props.url} />
          {show ? (
          <div className="--hover">
            <i className="far fa-save" />
            <p>Click for Image Link!</p>
          </div>
          ) : null}
        </a>
      ): null}
    </section>
  );
};
