import { React, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
function ModalEntry({ show, closeModal }) {
  console.log("show", show);

  const [note, setNote] = useState("");

  return (
    <>
      <Modal show onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Note
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Notes"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Col>
            </Form.Group>

            {/* <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group> */}

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column sm={2}>
                Contact Type
              </Form.Label>
              <Col sm={10}>
                <Form.Group controlId="exampleForm.SelectCustom">
                  {/* <Form.Label>Custom select</Form.Label> */}
                  <Form.Control as="select" custom>
                    <option>Phone</option>
                    <option>Email</option>
                    <option>Walk-in</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Group>
            <fieldset>
              <Form.Group as={Row} style={{ alignItems: "center" }}>
                <Form.Label as="legend" column sm={4}>
                  Parent Responded
                </Form.Label>
                {/* <Col sm={8}> */}
                <Form.Check
                  type="checkbox"
                  label="Responded"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                {/* </Col> */}
              </Form.Group>
            </fieldset>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => closeModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalEntry;
