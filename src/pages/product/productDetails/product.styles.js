import styled, { css } from "styled-components";
import { toast } from "react-toastify";
import { mobile,} from "../../../utils/responsive";

const size = {
  mobile: '576px',
  tablet: '768px',
  laptop: '1024px'
}

export const laptop = (...args) => css`
  @media (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    ${css(...args)}
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
  ${({ theme }) => css`
      @media (max-width: 1024px) {
          flex-wrap: nowrap;
          justify-content: space-between;
        }
    `}
`;




export const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: 20px auto;

  ${({ theme }) => css`
    @media (max-width: 1024px) {
      width: 100%;
    }
  `}
`;

export const InfoContainer = styled.div`
  width: 60%;
  margin: 20px;

  ${({ theme }) => css`
      @media (max-width: 1024px) {
          width: 100%;
          margin: 0;
        }
    `}
`;

export const ImgContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;

  ${({ theme }) => css`
    @media (max-width: 1024px) {
      width: 100%;
    }
  `}
`;

export const Image = styled.img`
  width: 100%;
  height: auto;

  ${({ theme }) => css`
      @media (max-width: 1024px) {
          max-width: 50%;
        }
    `}
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 20px 0;

  ${({ theme }) => css`
    @media (max-width: 1024px) {
      font-size: 1.8rem;
    }
  `}
`;

export const Desc = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  margin: 20px 0;

  ${({ theme }) => css`
    @media (max-width: 1024px) {
      font-size: 1.2rem;
    }
  `}
`;

export const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 20px 0;

  ${({ theme }) => css`
    @media (max-width: 1024px) {
      font-size: 1.4rem;
    }
  `}
`;

export const FilterContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${({ theme }) => css`
    @media (max-width: 1024px) {
      flex-wrap: nowrap;
    }
  `}
`;

export const Filter = styled.div`
  width: 48%;

  ${({ theme }) => css`
    @media (max-width: 1024px) {
      width: 100%;
    }
  `}
`;

export const FilterTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 20px 0;

  ${({ theme }) =>
    css`
      @media (max-width: 1024px) {
        font-size: 1.2rem;
      }
    `}
`;

export const FilterColor = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${({ theme }) =>
    css`
      @media (max-width: 1024px) {
        flex-wrap: nowrap;
      }
    `}
`;

export const FilterSize = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${({ theme }) =>
    css`
      @media (max-width: 1024px) {
        flex-wrap: nowrap;
      }
    `}
`;

export const FilterSizeOption = styled.div`
  width: 30%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  &.active {
    background-color: #333;
    color: #fff;
  }

  ${({ theme }) =>
    css`
      @media (max-width: 1024px) {
        width: 100%;
        margin: 5px 0;
      }
    `}
`;

export const AddContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) =>
    css`
      @media (max-width: 1024px) {
        flex-wrap: nowrap;
      }
    `}
`;

export const AmountContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) =>
    css`
      @media (max-width: 1024px) {
        width: 100%;
      }
    `}
`;

export const Amount = styled.div`
  width: 30%;
  text-align: center;

  ${({ theme }) =>
    css`
      @media (max-width: 1024px) {
        width: 100%;
      }
    `}
`;

export const Button = styled.button`
  width: 40%;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }

  ${({ theme }) =>
    css`
      @media (max-width: 1024px) {
        width: 100%;
        margin: 5px 0;
      }
    `}
`;

export const ExtraContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  ${({ theme }) => css`
    @media (max-width: 1024px) {
      flex-wrap: nowrap;
    }
  `}
`;

export const ExtraTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 20px 0;
  ${({ theme }) => css`
    @media (max-width: 1024px) {
      font-size: 1.2rem;
    }
  `}
`;

export const ExtraOption = styled.div`width: 30%; margin: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; text-align: center; cursor: pointer; &.active { background-color: #333; color: #fff; } ${({
  theme,
}) => css`@media (max-width: 1024px) {
  width: 100%;
  margin: 5px 0;
  `}
  }`;

export const ExtraAmountContainer = styled.div`width: 30%; display: flex; justify-content: space-between; align-items: center; ${({
  theme,
}) => css`@media (max-width: 1024px) {
  width: 100%;
  `}
  }`;

export const ExtraAmount = styled.div`width: 30%; text-align: center; ${({
  theme,
}) => css`@media (max-width: 1024px) {
  width: 100%;
  `}
  } `;

export const ExtraButton = styled(Button)`width: 40%; ${({
  theme,
}) => css`@media (max-width: 1024px) {
    width: 100%;
    margin: 5px 0;
    `}
    } `;

export const Toast = styled(
  toast
)`position: fixed; top: 50px; right: 50px; width: 300px; padding: 20px; border-radius: 5px; background-color: #333; color: #fff; text-align: center; z-index: 999; ${({
  theme,
}) => css`@media (max-width: 1024px) {
    width: 250px;
    `}
    } `;

  export const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  ${({ theme }) => css`
    @media (max-width: 1024px) {
      flex-wrap: nowrap;
    }
  `}
`;



    

    
