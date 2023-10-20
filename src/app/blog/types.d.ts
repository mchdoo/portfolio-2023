import type { Document } from "@contentful/rich-text-types";
import { Asset, Entry } from "contentful";

interface ImageType extends Asset {
  fields: {
    file: {
      url: string;
    };
  };
}

export interface PostType extends Entry {
  fields: {
    titulo: string;
    fechaDeEntrada: Date;
    featureImage: ImageTypes;
    tags: string[];
    desarrollo: {
      json: Document;
    };
  };
}

type Node = {
  content: [
    {
      nodeType: string;
      value: string;
      marks: [];
      data: {};
    }
  ];
};
