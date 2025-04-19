import Header from "./components/Header"
import Slider from "./components/Slider"
import Categories from "./components/Categories"
import { useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function HomePage(){
  const { user, setUser, setFilter } = useOutletContext();
  return (
    <>
      <Header active="home" user={user} setUser={setUser}></Header>
      <Slider setFilter={setFilter}></Slider>
      <Categories setFilter={setFilter}></Categories>
    </>
  )
}

HomePage.propTypes={
  user: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}