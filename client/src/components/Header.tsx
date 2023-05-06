import { Link } from "react-router-dom";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <ul>
        <Link to="/" style={{ textDecoration: "none" }}><li>Home</li></Link>
        <Link to="/pie-chart" style={{ textDecoration: "none" }}><li>Pie Chart</li></Link>
      </ul>
    </Container>
  )
}

export default Header;

const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  ul {
    display: flex;
  }
  li {
    color: white;
    font-size: 25px;
    list-style: none;
    margin-left: 50px;
    transition: 0.5s;

    &:hover {
      color: black;
    }
  }
`