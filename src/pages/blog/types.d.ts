export interface PostType {
  titulo: string;
  fechaDeEntrada: Date;
  sys: {
    id: number;
  };
  featureImage: {
    url: string;
  };
}

export interface AllIdsType {
  porfolioPostCollection: {
    items: [
      {
        sys: {
          id: string;
        };
      }
    ];
  };
}
