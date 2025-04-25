import Header from "../components/Header";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import { useOutletContext } from "react-router-dom";

export default function HomePage() {
  const { user, setUser, setFilter } = useOutletContext();
  return (
    <>
      <Header active="home" user={user} setUser={setUser}></Header>
      <Slider setFilter={setFilter}></Slider>
      <Categories setFilter={setFilter}></Categories>
    </>
  );
}
