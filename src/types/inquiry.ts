export type InquiryInfo = {
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export type ProductInquiryContext = {
  title: string;
  price: string;
  link: string;
};

export const emptyInquiry: InquiryInfo = {
  name: "",
  phone: "",
  email: "",
  notes: "",
};
