import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #4a4a4a;
  padding: 3rem  0 0 0;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 2rem;
`;

const Col = styled.div`
  flex: 1;
  padding: 0 15px;
  text-align: left;

  @media (min-width: 992px) {
    flex: ${props => props.lg};
  }

  @media (min-width: 768px) {
    flex: ${props => props.md};
  }

  @media (min-width: 576px) {
    flex: ${props => props.sm};
  }
  @media (max-width: 550px) {
    flex: 1;
    text-align: center;
    margin-left: 0;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

export const Social = styled.div`
  margin-bottom: 20px;
  display: flex; /* add flexbox properties */
  align-items: center; /* align items vertically */
  justify-content: center; /* align items horizontally */

  @media (max-width: 768px) { /* target phone screen sizes */
    flex-wrap: nowrap; /* prevent wrapping of elements */
  }
`;

const SocialLink = styled.a`
  color: #fff;
  font-size: 24px;
  margin-right: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #fff;
    transform: scale(1.2);
  }
`;

const FooterBottom = styled.div`
  background-color: #333;
  color: #fff;
  padding: 1rem 0;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Row>
        <Col lg={3} md={6} sm={12}>
          <List>
            <ListItem>
              <Link to="/about">About Us</Link>
            </ListItem>
            <ListItem>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </ListItem>
            <ListItem>
              <Link to="/terms-of-use">Terms of Use</Link>
            </ListItem>
            <ListItem>
              <Link to="/contact-us">Contact Us</Link>
            </ListItem>
          </List>
        </Col>
        <Col lg={3} md={6} sm={12}>
          <List>
            <ListItem>
              <Link to="/menu">Menu</Link>
            </ListItem>
            <ListItem>
              <Link to="/reservations">Reservations</Link>
            </ListItem>
            <ListItem>
              <Link to="/gift-cards">Gift Cards</Link>
            </ListItem>
            <ListItem>
              <Link to="/careers">Careers</Link>
            </ListItem>
          </List>
        </Col>
        <Col lg={3} md={6} sm={12}>
          <List>
            <ListItem>
              <Link to="/faq">FAQ</Link>
            </ListItem>
            <ListItem>
              <Link to="/delivery">Delivery</Link>
            </ListItem>
            <ListItem>
              <Link to="/catering">Catering</Link>
            </ListItem>
            <ListItem>
              <Link to="/events">Events</Link>
            </ListItem>
          </List>
        </Col>
        <Col lg={3} md={6} sm={12}>
          <Social>
            <SocialLink href="#">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="#">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="#">
              <FaInstagram />
            </SocialLink>
          </Social>
        </Col>
      </Row>
      <FooterBottom>
        Copyright &copy; {new Date().getFullYear()} Your Company. All rights reserved.
</FooterBottom>
</FooterContainer>
);
};

export default Footer;

 
