
export interface IReview {
  user:{
    name:string;
    image:string;
    createdAt:Date
  },
  date:string;
  comment:string,
  createdAt:Date
}

export interface IAdmin {
  name: string;
  email: string;
  phone: string;
  image?: string;
  phoneVerfy:boolean
}

export interface ILocation {
  city: string;
  cityEn: string;
  cityAr: string;
  address: string;
  addressEn: string;
  addressAr: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface IProperty {
  _id:string;
  title: string;
  titleEn?: string;
  titleAr?: string;
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  category: string;
  rate:number;
  guestNumber: number;
  location: {
    city: string;
    cityEn: string;
    cityAr: string;
    address: string;
    addressEn: string;
    addressAr: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  reviews: IReview
  reviewsEn: IReview[];
  reviewsAr: IReview[];
  services: string[];
  servicesEn: string[];
  servicesAr: string[];
  admin: IAdmin;
  nightPrice: number;
}