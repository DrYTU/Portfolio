import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Badge, Container, Row } from 'react-bootstrap';
import "../style.css";
import Tilt from "react-parallax-tilt";
import BlogItem from '../BlogItem';

function TheBlog() {

  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  
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
        setBlogs(data);
        console.log(data);
        
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const navigate = useNavigate();
  const categories = ['Tümü', 'Teknoloji', 'Yazılım', 'Hayat', 'Diğer'];

  const blog = blogs.find(blog => blog._id === id);
  blog && console.log(blog);


  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      <div
        style={{
          backgroundImage: 'url(/Images/background.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundAttachment: "fixed",
          filter: 'blur(5px)',
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
          <Row className='pt-5 mt-4'>
            <div className='blog-container col-12 col-md-9 text-center'>
              <h1 className='text-white m-1 theblog-title'> {blog.title} </h1>
              <div className='p-3'>
                <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3}>
                  <div className='position-relative w-100 h-100 rounded-4'>
                    <img src={blog.imgPath} className='theblog-image img-fluid w-100 h-100 rounded-4' alt="resim" style={{ objectFit: 'cover' }} />
                  </div>
                </Tilt>
              </div>
              <p className='blog-content mt-2 text-white lh-lg ti-lg word-wrap ps-4 pe-2' dangerouslySetInnerHTML={{__html: blog.content}}>
              </p>
            </div>
            <div className='col-12 col-md-3 text-center'>
              <div>
                <h1 className='text-white m-0 fs-3 mb-4 fs-md-6'> Önerilen Bloglar </h1>
                <div className='popular-blogs row gap-4 justify-content-center'>
                  {blogs.map(item => (
                    <BlogItem
                      width={200}
                      class="my-5 mx-md-4 mx-3"
                      size={"small"}
                      id={item.id}
                      key={item.id}
                      img={item.imgPath}
                      title={item.title}
                      summary={item.summary}
                      favNum={item.favNum}
                      date={item.created_at}
                    />
                  ))}
                </div>

                <div className='justify-content-center mb-5'>
                  <h1 className='text-white m-0 mt-4 fs-3 mb-4 fs-md-6'>Kategoriler</h1>
                  <div className='d-flex flex-wrap justify-content-center'>
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        pill
                        bg={'secondary'}
                        className="m-2 badge"
                        style={{ cursor: 'pointer', zIndex: 99, fontSize: 16, padding: "10px 20px" }}
                        onClick={()=> navigate("/category/"+category.toLowerCase())}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </Row>
        </Container>
      </section>
    </div>
  )
}

export default TheBlog;