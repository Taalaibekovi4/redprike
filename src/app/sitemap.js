// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export default async function () {
  const response = await fetch(`${backendURL}/products/product_list`);
  const data = await response.json();

  const responsea = data?.results.map(({ id }) => ({
    // url: `https://cheberel.kg/${id}`,
    url: `http://localhost:8000/${id}`,
  }));
  return [
    {
      // url: "https://cheberel.kg/",
      url: "http://localhost:8000/",
    },
    ...responsea,
    // { url: "https://cheberel.kg/pages/AboutUs" },
    { url: "http://localhost:8000/pages/AboutUs" },
    // { url: "https://cheberel.kg/pages/Contact" },
    { url: "http://localhost:8000/pages/Contact" },
    // { url: "https://cheberel.kg/pages/terms-of-purchase" },
    { url: "http://localhost:8000/pages/terms-of-purchase" }, 
    // { url: "https://cheberel.kg/pages/shipping" },
    { url: "http://localhost:8000/pages/shipping" },
    // { url: "https://cheberel.kg/pages/catalog" },
    { url: "http://localhost:8000/pages/catalog" },
  ];
}
