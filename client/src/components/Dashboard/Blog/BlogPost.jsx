import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Preloader from "../../Pre";
import Tags from '../Tags';
import RichTextEditor from '../RichTextEditor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthCheck from '../../../hooks/useAuthCheck';


function BlogPost() {
  useAuthCheck();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState([]);
  const [summary, setSummary] = useState([]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [tags, setTags] = useState([]);



  useEffect(() => {
    const backgroundImage = new Image();
    backgroundImage.src = '/Images/background.jpg';
    backgroundImage.onload = () => {
      setLoading(false);
    };
  }, []);

  const handleSave = () => {
    const dataToSave = {
      title,
      summary,
      category,
      content,
      imgPath,
      tags
    };

    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/blogs/add-blog', {
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
        toast.success("Blog başarıyla yüklendi.", {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: false,
          autoClose: 3000,
          hideProgressBar: true,
          theme: 'dark'
        });
        setTitle([]);
        setSummary([]);
        setCategory("");
        setContent("");
        setImgPath("");
        setTags([]);
      })
      .catch(error => {
        console.error('Error:', error.message);

        toast.error("Blog yüklenirken bir sorun oluştu:", error.message, {
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
            <div className='dashboard-container px-md-5 px-3'>
              <nav aria-label="breadcrumb" className='ms-3'>
                <ol class="breadcrumb ">
                  <li class="breadcrumb-item" ><a href="/dashboard">Dashboard</a></li>
                  <li class="breadcrumb-item"><a href="/blog-ops">Seçenekler</a></li>
                  <li class="breadcrumb-item active" aria-current="page"><a href="/blog-post">Post</a></li>
                </ol>
              </nav>
              <h1 className='ps-5 text-white mt-4 mb-5'> Blog Post </h1>
              <div className="dashboard-grid">

                {/* Title Input */}
                <Row className="mb-3 col-12">
                  <Col xs={12} md={2}>
                    <span>Title :</span>
                  </Col>
                  <Col xs={12} md={10}>
                    <input
                      className='my-textarea rounded-3 w-100'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Col>
                </Row>


                {/* Blog Editor */}
                <Row className="mb-3 col-12">
                  <Col xs={12} md={12}>
                    <span>Blog Content:</span>
                  </Col>
                  <Col xs={12} md={12} className='mt-2'>
                    <RichTextEditor content={content} setContent={setContent} />
                  </Col>
                </Row>

                {/* Summary Input */}
                <Row className="mb-3 col-12">
                  <Col xs={12} md={2}>
                    <span>Summary:</span>
                  </Col>
                  <Col xs={12} md={10}>
                    <textarea
                      className='my-textarea rounded-3 w-100'
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                    />
                  </Col>
                </Row>

                {/* Category Input */}
                <Row className="mb-3 col-12 col-sm-6">
                  <Col xs={12} md={4}>
                    <span>Category :</span>
                  </Col>
                  <Col xs={12} md={8}>
                    <input
                      className='my-textarea rounded-3 w-100'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </Col>
                </Row>

                {/* imgPath Input */}
                <Row className="mb-3 col-12 col-sm-6">
                  <Col xs={12} md={4}>
                    <span>Image Path :</span>
                  </Col>
                  <Col xs={12} md={8}>
                    <input
                      className='my-textarea rounded-3 w-100'
                      value={imgPath}
                      onChange={(e) => setImgPath(e.target.value)}
                    />
                  </Col>
                </Row>

                {/* Tags Component */}
                <Tags tags={tags} setTags={setTags} title={"Tags"} placeholder={"Bir tag girin:"} />

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

export default BlogPost;
