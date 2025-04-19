import Header from "./components/Header"
import Slider from "./components/Slider"
import Categories from "./components/Categories"
import PropTypes from 'prop-types';

export default function HomePage({setFilter, setCurrentPage, user, setUser}){
  return (
    <>
      <Header active="home" setCurrentPage={setCurrentPage} user={user} setUser={setUser}></Header>
      <Slider setFilter={setFilter} setCurrentPage={setCurrentPage}></Slider>
      <Categories setFilter={setFilter} setCurrentPage={setCurrentPage}></Categories>
    </>
  )
}

HomePage.propTypes={
  user: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}