export type ServicePackagesHeaderBlockData = {
  title: string;
  subtitle: string;
  mediaId?: number;
  fileName: string;
  preview?: string;
};

export type ServicePackageCardData = {
  title: string;
  description: string;

  budget: string;
  pricePerM2: string;
  timeline: string;
  roi: string;

  included: string;
  extraServices: string;

  imageLeftMediaId?: number;
  imageLeftFileName: string;
  imageLeftPreview?: string;

  imageRightMediaId?: number;
  imageRightFileName: string;
  imageRightPreview?: string;

  popupDocumentMediaId?: number;
  popupDocumentFileName: string;
  popupDocumentPreview?: string;
};

export type OtherServicesItemData = {
  id: number;
  title: string;
  subtitle: string;
  buttonLabel: string;
  href: string;
};

export type OtherServicesBlockData = {
  title: string;
  mediaId?: number;
  fileName: string;
  preview?: string;
  items: OtherServicesItemData[];
};

export type QnaItemData = {
  id: number;
  question: string;
  answer: string;
};

export type QnaBlockData = {
  items: QnaItemData[];
};

