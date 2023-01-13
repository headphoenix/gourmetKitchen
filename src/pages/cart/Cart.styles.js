import styled from "styled-components";
import { mobile } from "../../utils/responsive";

export const Container = styled.div`
  background-color: #f5f5f5;
`;

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

export const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-bottom: 40px;
  font-size: 36px;
  color: #333333;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 40px;
`;

export const TopButton = styled.button`
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#FF7400" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  font-size: 16px;
  ${mobile({ fontSize: '14px', padding: "5px 10px" })}
`;

export const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
export const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  font-size: 14px;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

export const Info = styled.div`
  flex: 3;
`;

export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "row", alignItems: "center" })}
  margin-bottom: 40px;
`;

export const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ width: "50%", padding: "10px" })}
`;

export const Image = styled.img`
  width: 200px;
  ${mobile({ width: "100px" })}
`;

export const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: "10px" })}
`;

export const ProductName = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #333333;
`;

export const ProductId = styled.span`
  font-size: 14px;
  color: #666666;
`;

export const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const ProductSize = styled.span`
  font-size: 14px;
  color: #666666;
`;

export const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ padding: "10px" })}
`;

export const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

export const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  color: #FF7043;
  ${mobile({ marginBottom: "20px" })}
`;

export const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  ${mobile({ padding: "10px" })}
`;

export const SummaryTitle = styled.h1`
  font-weight: 200;
  color: #333333;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
  color: #333333;
`;

export const SummaryItemText = styled.span`
  font-size: 14px;
`;

export const SummaryItemPrice = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

export const Button = styled.button`
  background-color: #FF7400;
  color: #ffffff;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  ${mobile({ fontSize: "14px", padding: "5px 10px" })}
`;
