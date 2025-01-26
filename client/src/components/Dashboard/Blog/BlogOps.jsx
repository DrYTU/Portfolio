import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Preloader from "../../../components/Pre";
import "../cardstyle.css"
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { TiDocumentAdd } from "react-icons/ti";
import useAuthCheck from '../../../hooks/useAuthCheck';


function BlogOps() {
    useAuthCheck();

    const [loading, setLoading] = useState(true);

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
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
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
                        <div className='dashboard-container  px-md-4 px-2'>
                            <nav aria-label="breadcrumb" className='ms-5'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" ><a href="/dashboard">Dashboard</a></li>
                                    <li className="breadcrumb-item active"><a href="/blog-ops">Seçenekler</a></li>
                                </ol>
                            </nav>
                            <h1 className='ps-5 text-white mt-4 mb-5'> Options </h1>
                            <div className="dashboard-grid">
                                <a className="dashboard-card" href='/blog-post'>
                                    <span className="dashboard-icon">

                                        <TiDocumentAdd />
                                    </span>
                                    <h4>Oluştur</h4>
                                    <p>
                                        Title, content, category, tags...
                                    </p>

                                    <div className="shine"></div>
                                    <div className="background">
                                        <div className="tiles">
                                            <div className="tile tile-1"></div>
                                            <div className="tile tile-2"></div>
                                            <div className="tile tile-3"></div>
                                            <div className="tile tile-4"></div>

                                            <div className="tile tile-5"></div>
                                            <div className="tile tile-6"></div>
                                            <div className="tile tile-7"></div>
                                            <div className="tile tile-8"></div>

                                            <div className="tile tile-9"></div>
                                            <div className="tile tile-10"></div>
                                        </div>

                                        <div className="line line-1"></div>
                                        <div className="line line-2"></div>
                                        <div className="line line-3"></div>
                                    </div>
                                </a>
                                <a className="dashboard-card" href='/blog-edit'>
                                    <span className="dashboard-icon">

                                        <MdOutlineModeEdit />
                                    </span>
                                    <h4>Düzenle</h4>
                                    <p>
                                        Mevcut bir blog üzerinde değişiklik yap
                                    </p>

                                    <div className="shine"></div>
                                    <div className="background">
                                        <div className="tiles">
                                            <div className="tile tile-1"></div>
                                            <div className="tile tile-2"></div>
                                            <div className="tile tile-3"></div>
                                            <div className="tile tile-4"></div>

                                            <div className="tile tile-5"></div>
                                            <div className="tile tile-6"></div>
                                            <div className="tile tile-7"></div>
                                            <div className="tile tile-8"></div>

                                            <div className="tile tile-9"></div>
                                            <div className="tile tile-10"></div>
                                        </div>

                                        <div className="line line-1"></div>
                                        <div className="line line-2"></div>
                                        <div className="line line-3"></div>
                                    </div>
                                </a>
                                <a className="dashboard-card" href='/blog-delete'>
                                    <span className="dashboard-icon">

                                        <MdDeleteForever />
                                    </span>
                                    <h4>Sil</h4>
                                    <p>
                                        Bloglardan birini kalıcı olarak
                                    </p>

                                    <div className="shine"></div>
                                    <div className="background">
                                        <div className="tiles">
                                            <div className="tile tile-1"></div>
                                            <div className="tile tile-2"></div>
                                            <div className="tile tile-3"></div>
                                            <div className="tile tile-4"></div>

                                            <div className="tile tile-5"></div>
                                            <div className="tile tile-6"></div>
                                            <div className="tile tile-7"></div>
                                            <div className="tile tile-8"></div>

                                            <div className="tile tile-9"></div>
                                            <div className="tile tile-10"></div>
                                        </div>

                                        <div className="line line-1"></div>
                                        <div className="line line-2"></div>
                                        <div className="line line-3"></div>
                                    </div>
                                </a>
                            </div>
                        </div>

                    </Row>
                </Container>
            </section>
        </div>
    )
}
export default BlogOps;