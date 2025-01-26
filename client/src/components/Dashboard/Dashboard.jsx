import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Preloader from "../../components/Pre";
import "./cardstyle.css"
import { ImBlog } from "react-icons/im";
import { FaInfo } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io";
import useAuthCheck from '../../hooks/useAuthCheck';

function Dashboard() {
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
                            <h1 className='ps-5 text-white mt-2 mb-5'> Dashboard </h1>
                            <div className="dashboard-grid">
                                <a className="dashboard-card" href='/blog-ops'>
                                    <span className="dashboard-icon">

                                        <ImBlog />
                                    </span>
                                    <h4>Blogs</h4>
                                    <p>
                                        Bloglarla ilgili yazma, düzenleme, silme işlemleri
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
                                <a className="dashboard-card" href='/content'>
                                    <span className="dashboard-icon">

                                        <FaInfo />
                                    </span>
                                    <h4>Content</h4>
                                    <p>
                                        Ana Sayfa, Hakkında, Projelerim bölümlerindeki içeriklerin düzenlenmesi
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
                                <a className="dashboard-card" href='/settings'>
                                    <span className="dashboard-icon">

                                        <IoMdSettings />
                                    </span>
                                    <h4>Settings</h4>
                                    <p>
                                        Sitenin diğer ayarları
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
export default Dashboard;