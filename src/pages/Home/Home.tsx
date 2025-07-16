import HorizontalCardSlider, { CardItem } from "../../component/Shared/HorizontalCardSlider";

const hurghadaHomes: CardItem[] = [
   {
    id: 1,
    title: "Hotel in Hurghada 2",
    image: "/images/home1.avif",
    price: "1,534",
    rating: "5.0",
  },
  {
    id: 2,
    title: "Apartment in Hurghada",
    image: "/images/home2.avif",
    price: "8,182",
    rating: "5.0",
  },
  {
    id: 3,
    title: "Apartment in Hurghada",
    image: "/images/home3.avif",
    price: "4,983",
    rating: "4.94",
  },
  {
    id: 4,
    title: "Apartment in Hurghada",
    image: "/images/home4.avif",
    price: "3,011",
    rating: "4.88",
  },
  {
    id: 5,
    title: "Apartment in Hurghada 2",
    image: "/images/home5.avif",
    price: "3,666",
    rating: "4.82",
  },
  {
    id: 6,
    title: "Apartment in Hurghada",
    image: "/images/home6.avif",
    price: "2,594",
    rating: "4.84",
  },
  {
    id: 7,
    title: "Hotel in Hurghada 2",
    image: "/images/home1.avif",
    price: "1,534",
    rating: "5.0",
  },
  {
    id: 8,
    title: "Apartment in Hurghada",
    image: "/images/home2.avif",
    price: "8,182",
    rating: "5.0",
  },
  {
    id: 9,
    title: "Apartment in Hurghada",
    image: "/images/home3.avif",
    price: "4,983",
    rating: "4.94",
  },
  {
    id: 10,
    title: "Apartment in Hurghada",
    image: "/images/home4.avif",
    price: "3,011",
    rating: "4.88",
  },
  {
    id: 11,
    title: "Apartment in Hurghada 2",
    image: "/images/home5.avif",
    price: "3,666",
    rating: "4.82",
  },
  {
    id: 12,
    title: "Apartment in Hurghada",
    image: "/images/home6.avif",
    price: "2,594",
    rating: "4.84",
  },
];



const Home = () => {
  return (
    <div>
      <HorizontalCardSlider title="Popular homes in Hurghada" items={hurghadaHomes} />
      <HorizontalCardSlider title="Available in New Cairo" items={hurghadaHomes} />
    </div>
  );
};

export default Home
