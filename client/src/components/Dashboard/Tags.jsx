import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { CiCirclePlus } from "react-icons/ci";
import { Col, Row } from 'react-bootstrap';

function Tags({ tags, setTags, title, placeholder }) {

    const [value, setValue] = useState("");

    const fakeTags = ["Placeholder Tag"]

    const handleDelete = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    }

    const handleAddTitle = () => {
        if (value.trim()) {
            setTags([...tags, value]);
            setValue("");
        }
    }

    return tags&&(
        <Row className="mb-3 col-12">
            <Col xs={3} md={3}>
                <span className='ms-1 d-flex justify-content-center text-center align-items-center w-100'>
                    {title} :
                </span>
            </Col>
            <Col xs={9} md={3} className='mt-2 d-flex'>
                <Stack direction="horizontal" gap={2} className='ms-3 me-3' style={{ flexWrap: "wrap" }}>
                    {tags.length>0? tags.map((item, index) =>
                        <Badge key={index} pill bg="primary" className='my-badge' onClick={() => handleDelete(index)}>
                            {item}
                        </Badge>
                    ): fakeTags.map((item, index) =>
                        <Badge key={index} pill bg="primary" className='my-badge' onClick={() => handleDelete(index)}>
                            {item}
                        </Badge>
                    )}
                </Stack>
            </Col>
            <Col xs={12} md={6}>
                <div className='mt-3 ms-5' style={{ width: 200 }}>
                    <InputGroup style={{ width: 200, border: "none" }}>
                        <Form.Control
                            placeholder={placeholder}
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            style={{ boxShadow: 'none', outline: 'none', fontSize: 12 }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddTitle();
                                }
                            }}
                        />
                        <InputGroup.Text id="inputGroup-sizing-default" style={{ boxShadow: 'none', outline: 'none', margin: 0, padding: 0 }}>
                            <Button variant="primary" style={{ margin: 0, padding: "2px 5px" }}
                                onClick={handleAddTitle}>
                                <CiCirclePlus size={30} style={{ padding: 0, margin: 0 }} />
                            </Button>
                        </InputGroup.Text>
                    </InputGroup>
                </div>
            </Col>
        </Row>
    )
}

export default Tags;
