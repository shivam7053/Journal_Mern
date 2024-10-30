import React, { useEffect, useState } from 'react';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import './Custom.css'; // Import the custom CSS file

const Home = () => {
  const [news, setNews] = useState([]);
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('https://journal-mern-oefu.onrender.com/api/news/');
        setNews(res.data);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    const fetchJournals = async () => {
      try {
        const res = await axios.get('https://journal-mern-oefu.onrender.com/api/journal/journal');
        setJournals(res.data);
      } catch (err) {
        console.error('Error fetching journals:', err);
      }
    };

    fetchNews();
    fetchJournals();
  }, []);

  const handleDownload = async (fileUrl) => {
    try {
      const res = await axios.get(fileUrl, { responseType: 'blob' });
      const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileUrl.split('/').pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error downloading file:', err);
    }
  };

  return (
    <div className="BG-photo d-flex flex-column justify-content-center">
      <Container>
        <Carousel className="mb-4">
          <Carousel.Item>
            <img className="d-block w-100" src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/800*400" alt="First slide" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Second slide" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Third slide" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <section className="mb-4">
          <h2>Latest News</h2>
          <Row>
            {news.map((item) => (
              <Col md={4} key={item._id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.content}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="mb-4">
          <h2>Journals</h2>
          <Row>
            {journals.map((journal) => (
              <Col md={4} key={journal._id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{journal.title}</Card.Title>
                    <Card.Text>
                      <strong>Authors:</strong> {journal.authors.map(a => `${a.name} (${a.type}, ${a.email})`).join(', ')}<br/>
                      <strong>Abstract:</strong> {journal.abstract}<br/>
                      <strong>Subject:</strong> {journal.subject}<br/>
                      <strong>File:</strong> <button onClick={() => handleDownload(journal.file)}>Download</button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Home;
