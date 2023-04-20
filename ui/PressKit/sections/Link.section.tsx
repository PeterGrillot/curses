import React from "react";
import { PressKitType } from "../PressKit.model";

export const LinkPost = (props: PressKitType) => {
  return (
    <section className="__section --link">
      <p>
        <a href={props.url}>
          {props.content} <i className="fa fa-share-square" />
        </a>
      </p>
    </section>
  );
};
