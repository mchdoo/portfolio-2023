import type { Document } from "@contentful/rich-text-types";

export interface PostType {
  titulo: string;
  fechaDeEntrada: Date;
  sys: {
    id: number;
  };
  featureImage: {
    url: string;
  };
  tags: string[];
  desarrollo: {
    json: Document;
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
