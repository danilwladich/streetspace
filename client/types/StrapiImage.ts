export interface NonFormattedStrapiImage {
  id: number;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    small: {
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    large: {
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    medium: {
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
  };
  size: number;
  url: string;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
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
