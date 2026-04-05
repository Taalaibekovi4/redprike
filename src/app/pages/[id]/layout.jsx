import axios from "axios";
const backendURL = "https://api.cheberel.kg";
export async function generateMetadata({ params, searchParams }) {
  const response = await axios.get(
    `${backendURL}/products/product_detail/${params.id}/`
  );
  
  const firstImage = response?.data?.product_variation?.[0]?.images?.[0]?.image;

  return {
    title: response.data?.title,
    description: response.data?.description,
    icons: [
      {
        rel: "icon",
        sizes: "any",
        url: "/img/iconka.png",
      },
    ],
    openGraph: {
      // images: [`${response?.data.product_variation[0].images[0]?.image}`],
      images: firstImage ? [firstImage] : [],
    },
  };
}
export default function storyLayout({ children }) {
  return <main>{children}</main>;
}
