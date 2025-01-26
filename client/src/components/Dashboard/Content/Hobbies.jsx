import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { CiCirclePlus } from "react-icons/ci";
import { Col, Row } from 'react-bootstrap';

function Hobbies({ hobbies, setHobbies }) {  // Parent state props

    const [hobbyValue, setHobbyValue] = useState("");

    const handleDeleteHobby = (indexToRemove) => {
        setHobbies(hobbies.filter((_, index) => index !== indexToRemove));
    }

    const handleAddHobby = () => {
        if (hobbyValue.trim()) {
            setHobbies([...hobbies, hobbyValue]);
            setHobbyValue("");
        }
    }

    return (
        <Row className="mb-3 col-12">
            <Col xs={3} md={3}>
                <span className='ms-1 d-flex justify-content-center text-center align-items-center w-100'>
                    Hobbies :
                </span>
            </Col>
            <Col xs={9} md={3} className='mt-2 d-flex'>
                <Stack direction="horizontal" gap={2} className='ms-3 me-3' style={{ flexWrap: "wrap" }}>
                    {hobbies.map((item, index) =>
                        <Badge key={index} pill bg="primary" className='my-badge' onClick={() => handleDeleteHobby(index)}>
                            {item}
                        </Badge>
                    )}
                </Stack>
            </Col>
            <Col xs={12} md={6}>
                <div className='mt-3 ms-5' style={{ width: 200 }}>
                    <InputGroup style={{ width: 200, border: "none" }}>
                        <Form.Control
                            placeholder='Bir Hobi Gir'
                            onChange={(e) => setHobbyValue(e.target.value)}
                            value={hobbyValue}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            style={{ boxShadow: 'none', outline: 'none', fontSize: 12 }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddHobby();
                                }
                            }}
                        />
                        <InputGroup.Text id="inputGroup-sizing-default" style={{ boxShadow: 'none', outline: 'none', margin: 0, padding: 0 }}>
                            <Button variant="primary" style={{ margin: 0, padding: "2px 5px" }}
                                onClick={handleAddHobby}>
                                <CiCirclePlus size={30} style={{ padding: 0, margin: 0 }} />
                            </Button>
                        </InputGroup.Text>
                    </InputGroup>
                </div>
            </Col>
        </Row>
    );
}

export default Hobbies;
