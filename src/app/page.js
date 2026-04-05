
import HomePage from "@/components/HomaPage/HomePage";
export const metadata = {
  title: "Красная цена",
  description: "Где будущее становится реальностью: электроника вашего выбора на расстоянии одного клика!",
  icons: [
    {
      rel: "icon",
      sizes: "any",
      url: "/img/iconka.png",
    },
  ],
};
export default function Home() {
  
  return (<HomePage/>
  );
}
