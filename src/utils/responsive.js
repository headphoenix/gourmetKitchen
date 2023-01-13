import { css } from "styled-components";

// export const mobile = (props) => {
//   return css`
//     @media only screen and (max-width: 400px) {
//       ${props}
//     }
//   `;
// };

const size = {
  mobile: '576px',
  tablet: '768px',
  laptop: '1024px'
}

export const mobile = (...args) => css`
  @media (max-width: ${size.mobile}) {
    ${css(...args)}
  }
`;

export const tablet = (...args) => css`
  @media (min-width: ${size.mobile}) and (max-width: ${size.tablet}) {
    ${css(...args)}
  }
`;

export const laptop = (...args) => css`
  @media (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    ${css(...args)}
  }
`;