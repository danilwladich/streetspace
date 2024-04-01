export interface StrapiImage {
  url: string;
  alternativeText: string;
  formats: {
    thumbnail: {
      url: string;
    };
    small: {
      url: string;
    };
    large: {
      url: string;
    };
    medium: {
      url: string;
    };
  };
}
