import Header from "./components/Header"
import Slider from "./components/Slider"
import Categories from "./components/Categories"

export default function HomePage({setFilter, setCurrentPage, user, setUser}){
    return (
      <>
        <Header active="home" setCurrentPage={setCurrentPage} user={user} setUser={setUser}></Header>
        <Slider setFilter={setFilter} setCurrentPage={setCurrentPage}></Slider>
        <Categories setFilter={setFilter} setCurrentPage={setCurrentPage}></Categories>
      </>
    )
  }