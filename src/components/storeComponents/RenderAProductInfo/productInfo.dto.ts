interface productInfo {
  PRODUCT_ID: number;
  PRODUCT_NAME: string;
  PRODUCT_LOGO_IMAGE: string;
  PRODUCT_DESCRIPTION: string;
  PRODUCT_IMAGE: string;
  product_variation: [
    {
      VARIATION_ID: number;
      PRICE: number;
      UNIT: number;
      AMOUNT: number;
    }
  ];
  categories: {
    CATEGORY_ID: number;
    CATEGORY_NAME: string;
  }[];
}
