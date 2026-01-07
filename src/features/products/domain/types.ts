/**
 * Product type used for defining product details.
 */
export interface Product {
  avail: string;
  id: number;
  img: string;
  name: string;
  spec: string;
  price: number;
  priceText: string;
  rating: number;
  ratingCount: number;
  url: string;
}

/**
 * Notebook category type used for defining notebook categories.
 */
export interface NotebookCategory {
  imageUrl: string;
  id: string;
  label: string;
  url: string;
}

/**
 * Filter parameters used for API requests.
 */
interface FilterParameters {
  branchId: string;
  id: number;
  isInStockOnly: boolean;
  newsOnly: boolean;
  orderBy: number;
  page: number;
  params: [];
  producers: unknown[];
  sendPrices: boolean;
  type: string;
  typeId: string;
  wearType: number;
}

export interface ProductsRequest {
  categoryId: string;
  country: 'CZ';
  filterParameters: FilterParameters;
}

/**
 * Product Data Transfer Object (DTO) representing the raw product data from the API.
 */
export interface ProductDTO {
  self: {
    href: string;
    appLink: string;
    enabled: boolean;
  };
  priceInfo: {
    priceWithoutVat: string;
    priceWithVat: string;
    comparePrice: string | null;
    discountRate: number | null;
    pricePrefix: string | null;
    pricePostfix: string | null;
    discountReason: string | null;
    gaPriceWithoutVat: number;
    priceNoCurrency: number;
    delayedPaymentPriceWithVat: string;
  };
  priceInfoV2: {
    priceWithVat: string;
    instalmentsPriceWithVat: string | null;
    comparePrice: string | null;
    pricePrefix: string | null;
    pricePostfix: string | null;
    priceDescription: string | null;
    priceType: number;
    priceGroupType: number;
    headerText: string | null;
    headerIconUrl: string | null;
    priceSave: string | null;
    explanationPriceAction: string | null;
    unitPriceWithVat: string;
    unitName: string;
    priceWithoutVatNoCurrency: number;
    priceNoCurrency: number;
  };
  priceInfoV3: {
    mainPriceTag: {
      primaryPrice: string;
      primaryPricePrefix: string | null;
      primaryPricePostfix: string | null;
      primaryPriceNoCurrency: number;
      secondaryPrice: string | null;
      secondaryPricePrefix: string | null;
      secondaryPricePostfix: string | null;
      comparePrice: string | null;
      priceDescription: string | null;
      priceType: number;
      priceGroupType: number;
      headerText: string | null;
      headerIconUrl: string | null;
      priceSave: string | null;
      explanationPriceAction: string | null;
      footerPriceAction: string | null;
      calculatePriceActionForm: unknown;
      calculateInstallmentsPriceAction: unknown;
      footerIconUrl: string | null;
    };
    alternativePriceTag: unknown;
  };
  cpriceTotal: number | null;
  is_comparable: boolean;
  priceTotal: number | null;
  promosWorth: string | null;
  ratingCount: number;
  reviewsDetail: {
    href: string;
    appLink: string;
    enabled: boolean;
  } | null;
  specParent: unknown;
  userOwns: boolean;
  userOwnedContentId: unknown;
  navigationUrl: unknown;
  canChangeQuantity: boolean;
  canCashBack: boolean;
  cashBackType: number;
  cashBackPriceLabel: string | null;
  cashBackDialog: {
    title: string;
    titleImgUrl: string;
    conditionsUrl: string | null;
    conditions: string;
    descriptionUrl: string;
    type: number;
    discountCode: string | null;
    iconUrl: string | null;
    absoluteCommodityDiscount: string;
    validUntil: string;
  } | null;
  cashBackAnalytics: {
    actions: {
      onView: {
        data: Record<string, unknown>;
        event: string;
        reportAction: unknown;
      };
      onClick: {
        data: Record<string, unknown>;
        event: string;
        reportAction: unknown;
      };
    };
  } | null;
  cashBackPrice: string | null;
  cashBackPercent: number | null;
  cashBackPriceDescription: unknown;
  cashBackPromoActions: unknown;
  giftAdvisor: unknown;
  catalog_number: unknown;
  disclaimers: unknown[];
  count: number;
  showUpsellDialog: boolean;
  onChangeItemCountClick: unknown;
  icons: {
    text: string;
    image: string;
    clickAction: unknown;
  }[];
  viewerProductInfo: {
    href: string;
    appLink: string;
    enabled: boolean;
  };
  deliveryPromo: {
    title: string;
    imageUrl: string;
    clickAction: {
      href: string;
      appLink: string;
      name: string;
      enabled: boolean;
    };
    type: number;
  } | null;
  deliveryPromos: {
    title: string;
    imageUrl: string;
    clickAction: {
      href: string;
      appLink: string;
      name: string;
      enabled: boolean;
    };
    type: number;
  }[];
  personalizedAvailability: unknown;
  recommendation: number;
  sortUnitPrice: unknown;
  floorCategoryId: unknown;
  floorCategoryName: unknown;
  sponsoredCommodityInfo: unknown;
  hazardStatements: unknown;
  precautionaryStatements: unknown;
  warningSymbols: unknown;
  id: number;
  code: string;
  img: string;
  name: string;
  spec: string;
  price: string;
  cprice: string | null;
  priceWithoutVat: string;
  avail: string;
  avail_postfix: unknown;
  avail_postfix2: unknown;
  availLegend: unknown;
  avail_color: string;
  is_action: boolean;
  action_name: string;
  rating: number;
  promo_cnt: number;
  promos: {
    self: {
      href: string;
      appLink: string;
      enabled: boolean;
    };
    count: number;
    id: number;
    img: string;
    is_enabled: boolean;
    name: string;
    order: number;
    price: string;
  }[];
  order: number;
  is_special_service: boolean;
  type: number;
  year: number;
  can_buy: boolean;
  itemType: string;
  orderItemId: unknown;
  iType: number;
  maxCanBuy: unknown;
  eshopType: number;
  url: string;
  canStream: boolean;
  canUserStream: boolean;
  supplierCode: string;
  parentId: number;
  minimumAmount: number;
  amountInPack: number;
  start_time: unknown;
  end_time: unknown;
  variant_type: number;
  priceNoCurrency: number;
  categoryName: unknown;
  inBasket: number;
}
