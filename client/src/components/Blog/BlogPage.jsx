import React, { useEffect, useState } from 'react';
import Slider1 from './Slider1/Slider1';
import Slider2 from './Slider2/Slider2';
import { Container, Row, Badge, InputGroup, FormControl } from 'react-bootstrap';
import { IoSearchOutline } from 'react-icons/io5';
import BlogItem from './BlogItem';
import Preloader from "../../components/Pre";


const categories = ['Tümü', 'Teknoloji', 'Yazılım', 'Hayat', 'Diğer'];

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  

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

  useEffect(() => {
    const backgroundImage = new Image();
    backgroundImage.src = '/Images/background.jpg';
    backgroundImage.onload = () => {
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        {loading && (<Preloader load={loading} />)}
        <div
          style={{
            backgroundImage: 'url(/Images/background2.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            backgroundAttachment: "fixed",
            filter: 'blur(4px)',
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
              <h1 className='ps-5 text-white m-0'> En Popüler Bloglar </h1>
              <Slider1 Blogs={blogs}/>
            </Row>
            <Row className='pt-5 mt-0'>
              <h1 className='ps-5 text-white m-0'> En Yeni Bloglar </h1>
              <Slider2 Blogs={blogs}/>
            </Row>

            <Row className='justify-content-center mt-5'>
              <h1 className='text-white mt-5 mb-4 text-center'> Blog Ara </h1>
              <InputGroup className='input-group w-md-50 w-75 search'>
                <InputGroup.Text>
                  <IoSearchOutline />
                </InputGroup.Text>
                <FormControl
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className='search'
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="search-icon"
                />
              </InputGroup>
            </Row>

            <Row className='justify-content-center mt-3'>
              <div className='categories d-flex flex-wrap justify-content-center'>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    pill
                    bg={selectedCategory === category ? '#000' : 'secondary'}
                    className={`m-2 badge ${selectedCategory === category ? 'badge-selected' : ''}`}
                    onClick={() => handleCategorySelect(category)}

                    style={{ cursor: 'pointer', zIndex: 99, fontSize: 16, padding: "10px 20px" }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </Row>

            <Row className='justify-content-center mt-5 mt-md-4 gap-3' style={{ minHeight: 450 }}>
              {selectedCategory === "Tümü" ?
                blogs?.filter(item => item.title.toLowerCase().includes(query.toLowerCase())).map(item => (
                  <BlogItem
                    class="my-5 mx-md-4 mx-3"
                    size={"small"}
                    id={item.id}
                    width={180}
                    img={item.imgPath}
                    key={item.id}
                    title={item.title}
                    summary={item.summary}
                    favNum={item.favNum}
                    date={item.createdAt.substring(0, item.createdAt.indexOf('T'))}
                  />
                ))
                : blogs?.filter(item => item.category === selectedCategory).filter(item => item.title.toLowerCase().includes(query.toLowerCase())).map(item => (
                  <BlogItem
                    class="my-5 mx-md-4 mx-3"
                    size={"small"}
                    id={item.id}
                    width={180}
                    key={item.id}
                    img={item.imgPath}
                    title={item.title}
                    summary={item.summary}
                    favNum={item.favNum}
                    date={item.createdAt.substring(0, item.createdAt.indexOf('T'))}
                  />
                ))}
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}

export default BlogPage;
