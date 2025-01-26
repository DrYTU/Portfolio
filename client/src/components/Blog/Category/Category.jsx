import React, { useState } from 'react'
import { Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import { IoSearchOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom';
import BlogItem from '../BlogItem';
import { Blogs } from "../Blogs"

function Category() {

    const [query, setQuery] = useState('');
    const { category } = useParams();

    const categoryName = category[0].toUpperCase() + category.slice(1)

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
                    <Row className='pt-5 mt-4 justify-content-center'>
                        <h1 className='text-white mt-5 mb-4 text-center'> {categoryName} </h1>
                        <Col xs={10} md={6}>
                            <InputGroup className='input-group search'>
                                <InputGroup.Text>
                                    <IoSearchOutline />
                                </InputGroup.Text>
                                <FormControl
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='search'
                                    placeholder="Blog Ara"
                                    aria-label="Blog Ara"
                                    aria-describedby="search-icon"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className='justify-content-center mt-5 mt-md-4 gap-1' style={{ minHeight: 450 }}>
              {categoryName === "Tümü" ?
                Blogs?.blogs?.filter(item => item.title.toLowerCase().includes(query.toLowerCase())).map(item => (
                  <BlogItem
                    class="category-page-blog-item my-3 mx-md-3 mx-2"
                    size={"medium"}
                    id={item.id}
                    img={item.imgPath}
                    key={item.id}
                    title={item.title}
                    summary={item.summary}
                    favNum={item.favNum}
                    date={item.created_at}
                  />
                ))
                : Blogs?.blogs?.filter(item => item.category === categoryName).filter(item => item.title.toLowerCase().includes(query.toLowerCase())).map(item => (
                    <BlogItem
                    class="category-page-blog-item my-3 mx-md-3 mx-2"
                    size={"medium"}
                    id={item.id}
                    img={item.imgPath}
                    key={item.id}
                    title={item.title}
                    summary={item.summary}
                    favNum={item.favNum}
                    date={item.created_at}
                  />
                ))}
            </Row>
                </Container>
            </section>
        </div>
    )
}

export default Category