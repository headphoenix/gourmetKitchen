import styled from "styled-components";
import { mobile } from "../../../utils/responsive";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

export const ImgContainer = styled.div`
  flex: 1;
`;

export const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #00000010;
  ${mobile({ height: "40vh" })}
`;

export const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

export const Title = styled.h1`
  font-weight: 200;
  font-size: 2rem;
  color: #5e5e5e;
  text-align: center;
  margin-bottom: 20px;
`;

export const Desc = styled.p`
  margin: 20px 0px;
  color: #9b9b9b;
  text-align: justify;
`;

export const Price = styled.span`
  font-weight: 500;
  font-size: 2rem;
  color: #5e5e5e;
  margin-top: 20px;
  text-align: center;
`;

export const FilterContainer = styled.div`
  width: 100%;
  margin: 30px 0px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ width: "100%" })}
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 200;
  color: #5e5e5e;
  margin-right: 10px;
`;

export const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  font-size: 1.2rem;
  font-weight: 200;
  color: #5e5e5e;
  border: 2px solid #5e5e5e;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in -out;
  &:hover {
    background-color: #f8f4f4;
  }
`;

export const FilterSizeOption = styled.option`
  font-size: 1.2rem;
  font-weight: 200;
  color: #5e5e5e;
`;

export const AddContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ width: "100%" })}
`;

export const AmountContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  ${mobile({ width: "100%" })}
`;

export const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 20px 0px 20px;
  color: #5e5e5e;
  font-weight: 500;
`;

export const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  color: #5e5e5e;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #f8f4f4;
  }
`;
