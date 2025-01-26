import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Preloader from "../../Pre";
import Tags from '../Tags';
import RichTextEditor from '../RichTextEditor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthCheck from '../../../hooks/useAuthCheck';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';

function BlogEdit() {
    useAuthCheck();

    const location = useLocation();
    const { blogId } = location.state || null;

    const [loading, setLoading] = useState(true);
    const [blogList, setBlogList] = useState([]);
    const [selectedBlogId, setSelectedBlogId] = useState("");
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [imgPath, setImgPath] = useState("");
    const [tags, setTags] = useState([]);

    // useCallback ile handleSelectBlog'u sarmalayarak referansın her render'da değişmesini engelliyoruz
    const handleSelectBlog = useCallback(() => {
        const selectedBlog = blogList.find(blog => blog._id === selectedBlogId);

        if (selectedBlog) {
            setTitle(selectedBlog.title || "");
            setSummary(selectedBlog.summary || "");
            setCategory(selectedBlog.category || "");
            setContent(selectedBlog.content[selectedBlog.content.length - 1] || "");
            setImgPath(selectedBlog.imgPath || "");
            setTags(selectedBlog.tags || []);
        }
    }, [selectedBlogId, blogList]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Blog verilerini getir
        fetch('http://localhost:5000/api/blogs/get-all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setBlogList(data);
                console.log(data);
                if (blogId) {
                    setSelectedBlogId(blogId);
                }
            })
            .catch(error => console.error('Error:', error));
    }, [blogId]);

    // Seçilen blogId değiştiğinde handleSelectBlog çağrılacak
    useEffect(() => {
        if (selectedBlogId) {
            handleSelectBlog();
        }
    }, [selectedBlogId, handleSelectBlog]);

    useEffect(() => {
        const backgroundImage = new Image();
        backgroundImage.src = '/Images/background.jpg';
        backgroundImage.onload = () => {
            setLoading(false);
        };
    }, []);

    const handleSave = () => {
        const dataToSave = {
            blogId: selectedBlogId,
            title,
            summary,
            category,
            content,
            imgPath,
            tags
        };

        const token = localStorage.getItem('token');

        fetch('http://localhost:5000/api/blogs/update-blog', {
            method: 'PUT',
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
                toast.success("Blog başarıyla güncellendi.", {
                    position: toast.POSITION.TOP_RIGHT,
                    closeButton: false,
                    autoClose: 3000,
                    hideProgressBar: true,
                    theme: 'dark'
                });
                // Formu sıfırlama
                setTitle("");
                setSummary("");
                setCategory("");
                setContent("");
                setImgPath("");
                setTags([]);
                setSelectedBlogId("")
            })
            .catch(error => {
                console.error('Error:', error.message);

                toast.error("Blog güncellenirken bir sorun oluştu:", error.message, {
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
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item"><a href="/blog-ops">Seçenekler</a></li>
                                    <li className="breadcrumb-item active" aria-current="page"><a href="/blog-edit">Edit</a></li>
                                </ol>
                            </nav>

                            <h1 className='ps-5 text-white mt-2 mb-5'> Blog Edit </h1>
                            <div className="dashboard-grid">
                                <Row className="mb-3 col-12">
                                    <Col xs={12} md={5}>
                                        <span>Choose A Blog Name :</span>
                                    </Col>
                                    <Col xs={12} md={7}>
                                        <div className='d-flex gap-3'>
                                            <Form.Select
                                                className='w-100'
                                                value={selectedBlogId}
                                                onChange={(e) => setSelectedBlogId(e.target.value)}
                                            >
                                                <option value="">Select a Blog</option>
                                                {blogList.map((blog) => (
                                                    <option key={blog._id} value={blog._id}>
                                                        {blog.title}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <button type="button" className="btn btn-success" onClick={handleSelectBlog}>Seç</button>
                                        </div>
                                    </Col>
                                </Row>

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

                                <Row className="mb-3 col-12">
                                    <Col xs={12} md={12}>
                                        <span>Blog Content:</span>
                                    </Col>
                                    <Col xs={12} md={12} className='mt-2'>
                                        <RichTextEditor content={content} setContent={setContent} />
                                    </Col>
                                </Row>

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

                                <Tags tags={tags} setTags={setTags} title={"Tags"} placeholder={"Bir tag girin:"} />

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
        </div >
    );
}

export default BlogEdit;
