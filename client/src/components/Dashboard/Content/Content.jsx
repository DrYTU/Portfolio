import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Preloader from "../../Pre";
import Tags from '../Tags';
import RichTextEditor from '../RichTextEditor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthCheck from '../../../hooks/useAuthCheck';


function Content() {
  useAuthCheck();
  
  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [quote, setQuote] = useState("");
  const [quoteOwner, setQuoteOwner] = useState("");
  const [kaggle, setKaggle] = useState("");
  const [github, setGithub] = useState("");
  const [aboutWhoIAm, setAboutWhoIAm] = useState("");
  const [homeWhoIAm, setHomeWhoIAm] = useState("");



  useEffect(() => {

    const token = localStorage.getItem('token');

    fetch(process.env.REACT_APP_SERVER_URL + '/api/contents/get-all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        handleShowData(data[data.length - 1])
      })
      .catch(error => console.error('Error:', error));


  }, []);
  const handleShowData = (data) => {
    setTitles(data.titles || []);
    setHobbies(data.hobbies || []);
    setQuote(data.quote || "");
    setQuoteOwner(data.quoteOwner || "");
    setKaggle(data.kaggle || "");
    setGithub(data.github || "");
    setAboutWhoIAm(data.AboutWhoIAm || "");
    setHomeWhoIAm(data.HomeWhoIAm || "");
  }

  useEffect(() => {
    const backgroundImage = new Image();
    backgroundImage.src = '/Images/background.jpg';
    backgroundImage.onload = () => {
      setLoading(false);
    };
  }, []);

  const handleSave = () => {
    const dataToSave = {
      titles,
      hobbies,
      quote,
      quoteOwner,
      kaggle,
      github,
      AboutWhoIAm: aboutWhoIAm,
      HomeWhoIAm: homeWhoIAm
    };

    const token = localStorage.getItem('token');

    fetch(process.env.REACT_APP_SERVER_URL + '/api/contents/add-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${token}`
      },
      body: JSON.stringify(dataToSave)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid token');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        toast.success("Başarıyla içerik değişikliği gerçekleştirildi.", {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: false,
          autoClose: 3000,
          hideProgressBar: true,
          theme: 'dark'
        });
      })
      .catch(error => {
        console.error('Error:', error.message);

        toast.error("Error:", error.message, {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: false,
          autoClose: 3000,
          hideProgressBar: true,
          theme: 'dark'
        });
      });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <ToastContainer />

      {loading && (<Preloader load={loading} />)}
      <div
        style={{
          backgroundImage: 'url(/Images/background2.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundAttachment: "fixed",
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      />

      <section style={{ position: 'relative', zIndex: 1 }}>
        <Container fluid className="pt-5">
          <Row className='pt-5'>
            <div className='dashboard-container px-md-4 px-2'>
            <nav aria-label="breadcrumb" className='ms-3'>
                <ol class="breadcrumb ">
                  <li class="breadcrumb-item" ><a href="/dashboard">Dashboard</a></li>
                  <li class="breadcrumb-item"><a href="/blog-ops">Seçenekler</a></li>
                  <li class="breadcrumb-item active" aria-current="page"><a href="/content">Content</a></li>
                </ol>
              </nav>
              <h1 className='ps-5 text-white mt-4 mb-5'> Content </h1>
              <div className="dashboard-grid">

                {/* Titles Component */}
                <Tags tags={titles} setTags={setTitles} title={"Titles"} placeholder={"Bir title girin:"} />

                {/* HomeWhoIAm Editor */}
                <Row className="mb-3 col-12">
                  <Col xs={12} md={12}>
                    <span>HomeWhoIAm:</span>
                  </Col>
                  <Col xs={12} md={12} className='mt-2'>
                    <RichTextEditor content={homeWhoIAm} setContent={setHomeWhoIAm} />
                  </Col>
                </Row>

                {/* AboutWhoIAm Editor */}
                <Row className="mb-3 col-12">
                  <Col xs={12} md={12}>
                    <span>AboutWhoIAm:</span>
                  </Col>
                  <Col xs={12} md={12} className='mt-2'>
                    <RichTextEditor content={aboutWhoIAm} setContent={setAboutWhoIAm} />
                  </Col>
                </Row>

                {/* Hobbies Component */}
                <Tags tags={hobbies} setTags={setHobbies} title="Hobbies" placeholder="Bir Hobi Gir"/>

                {/* Special Quote Input */}
                <Row className="mb-3 col-12 col-sm-6">
                  <Col xs={12} md={4}>
                    <span>Special Quote:</span>
                  </Col>
                  <Col xs={12} md={8}>
                    <input
                      className='my-textarea rounded-3 w-100'
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                    />
                  </Col>
                </Row>

                {/* Quote Owner Input */}
                <Row className="mb-3 col-12 col-sm-6">
                  <Col xs={12} md={4}>
                    <span>Quote Owner:</span>
                  </Col>
                  <Col xs={12} md={8}>
                    <input
                      className='my-textarea rounded-3 w-100'
                      value={quoteOwner}
                      onChange={(e) => setQuoteOwner(e.target.value)}
                    />
                  </Col>
                </Row>

                {/* Kaggle Input */}
                <Row className="mb-3 col-12 col-sm-6">
                  <Col xs={12} md={4}>
                    <span>Kaggle Profile:</span>
                  </Col>
                  <Col xs={12} md={8}>
                    <input
                      className='my-textarea rounded-3 w-100'
                      value={kaggle}
                      onChange={(e) => setKaggle(e.target.value)}
                    />
                  </Col>
                </Row>

                {/* GitHub Input */}
                <Row className="mb-3 col-12 col-sm-6">
                  <Col xs={12} md={4}>
                    <span>GitHub Profile:</span>
                  </Col>
                  <Col xs={12} md={8}>
                    <input
                      className='my-textarea rounded-3 w-100'
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                    />
                  </Col>
                </Row>

                {/* Save Button */}
                <Row className="mb-3 col-12">
                  <Col className="text-center">
                    <button type="button" className="btn btn-success" onClick={handleSave}>Kaydet</button>
                  </Col>
                </Row>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Content;
