import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
// import { Container, Row, Col, List, ListItem, Link, Social, SocialLink, FooterBottom } from './footer.styles';

import styled from 'styled-components';

export const Container = styled.footer`
  background-color: #f5f5f5;
  padding: 3rem 0;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 15rem;
`;

export const Col = styled.div`
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
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
`;

export const Link = styled.a`
  color: #333;
  text-decoration: none;

  &:hover {
    color: #000;
  }
`;

export const Social = styled.div`
  margin-bottom: 20px;
`;

export const SocialLink = styled.a`
{
  color: #333;
  font-size: 24px;
  margin-right: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #000;
    transform: scale(1.2);
  }
}`

export const FooterBottom = styled.div`
  background-color: #333;
  color: #fff;
  padding: 1rem 0;
  text-align: center;
`;

const Footer = () => {
  return (
    <Container>
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
          <p>
            Sign up for our newsletter:
            <Link to="/newsletter" className="newsletter-link">
              Subscribe
            </Link>
          </p>
        </Col>
      </Row>
      <FooterBottom>
        <p>Copyright © 2020 My Restaurant. All rights reserved.</p>
      </FooterBottom>
    </Container>
  );
};

export default Footer;

