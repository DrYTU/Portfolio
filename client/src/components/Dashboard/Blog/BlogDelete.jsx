import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import Preloader from "../../Pre";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthCheck from '../../../hooks/useAuthCheck';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function BlogDelete() {
  useAuthCheck();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [blogList, setBlogList] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Blog verilerini getir
    fetch(process.env.REACT_APP_SERVER_URL + '/api/blogs/get-all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setBlogList(data);
        setFilteredBlogs(data);
        console.log(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const backgroundImage = new Image();
    backgroundImage.src = '/Images/background.jpg';
    backgroundImage.onload = () => {
      setLoading(false);
    };
  }, []);

  const handleDelete = (blogId) => {
    const token = localStorage.getItem('token');

    fetch(process.env.REACT_APP_SERVER_URL + '/api/blogs/delete-blog', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${token}`
      },
      body: JSON.stringify({ blogId })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid token');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        toast.success("Blog başarıyla silindi.", {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: false,
          autoClose: 3000,
          hideProgressBar: true,
          theme: 'dark'
        });
        setBlogList(blogList.filter(blog => blog._id !== blogId));
        setFilteredBlogs(filteredBlogs.filter(blog => blog._id !== blogId));
      })
      .catch(error => {
        console.error('Error:', error.message);

        toast.error("Blog silinirken bir sorun oluştu:", error.message, {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: false,
          autoClose: 3000,
          hideProgressBar: true,
          theme: 'dark'
        });
      });
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (searchValue) {
      const filtered = blogList.filter(blog =>
        blog.title.toLowerCase().includes(searchValue)
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogList); // Arama kutusu boşsa tüm blogları göster
    }
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
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                  <li className="breadcrumb-item"><a href="/blog-ops">Seçenekler</a></li>
                  <li className="breadcrumb-item active" aria-current="page"><a href="/blog-delete">Delete</a></li>
                </ol>
              </nav>

              <h1 className='ps-5 text-white mt-4 mb-5'> Blog Delete </h1>

              {/* Arama Kutusu */}
              <Form.Control
                type="text"
                placeholder="Blog ismine göre ara..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4"
              />

              <Row>
                {filteredBlogs.map(blog => (
                  <Col xs={6} sm={6} lg={4} xl={3} key={blog._id} className="mb-4">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={blog.imgPath}
                        alt={blog.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <Card.Body className='pt-0'>
                        <Card.Title
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            height: 'calc(2.5em + 1.5vw)',
                            textOverflow: 'ellipsis',
                            fontSize: "calc(16px + 0.2vw)",
                          }}
                        >{blog.title}</Card.Title>
                        <div className="d-flex">
                          <div
                            style={{
                              backgroundColor: '#bbb',
                              padding: '10px',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              flex: 1,
                              textAlign: 'center',
                              transition: 'background-color 0.3s',
                            }}
                            onClick={() => navigate("/blog-edit", { state: { blogId: blog._id } })}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#bbbbff'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#bbb'}
                          >
                            <FaEdit className="text-primary" size={20} />
                            <span className="ms-2">Düzenle</span>
                          </div>

                          {/* Silme butonu */}
                          <div
                            style={{
                              backgroundColor: '#bbb',
                              padding: '10px',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              textAlign: 'center',
                              transition: 'background-color 0.3s',
                              width: '50px',
                              marginLeft: '10px',
                            }}
                            onClick={() => handleDelete(blog._id)}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#ffbbbb'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#bbb'}
                          >
                            <FaTrashAlt className="text-danger" size={20} />
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default BlogDelete;
