interface IBuyLink {
  store: string;
  link: string;
}

interface IBook {
  image: string;
  title: string;
  authors: string[];
  description: string;
  rating: number;
  year: number;
  links: IBuyLink[];
}

export default IBook;
