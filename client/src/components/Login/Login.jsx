import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

function Login() {

    const { handleSubmit, register, formState: { errors } } = useForm();
    
    const onSubmit = async (values) => {
        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + '/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // JWT token'ı al ve localStorage'a kaydet
                localStorage.setItem('token', data.token);
                alert('Login successful');
                // Admin dashboard veya blog listesine yönlendirme
                navigate('/dashboard'); // Örneğin, admin sayfasına yönlendirme
            } else {
                alert(data.msg || 'Login failed');
            }
        } catch (error) {
            console.error('Login error', error);
            alert('An error occurred during login.');
        }
    };

    const navigate = useNavigate();


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
                    <Row className='pt-5 px-5 mt-4'>
                        <div className='login-container p-5'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h3>Log In</h3>

                                <div className="my-3">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter username"
                                        {...register("username", {
                                            required: "Required",
                                            validate: value => value !== "admin" || "Nice try!"
                                        })}
                                    />
                                    <div className='text-danger'>{errors.username && errors.username.message}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        {...register("password", {
                                            validate: value => value !== "admin" || "Nice try!"
                                        })}
                                    />
                                </div>
                                <div className='text-danger'>{errors.password && errors.password.message}
                                </div>
                                <div className="mb-3">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customCheck1"
                                        />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </Row>
                </Container>
            </section>
        </div>

    )
}

export default Login