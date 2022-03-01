import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step
    if (validator.isEmpty(values.age) || validator.isEmpty(values.email)) {
      setError(true);
    } else {
      nextStep();
    }
  };
  return (
    <>
      <Card style={{ marginTop: 100 }}>
        <h1>details of Boutique</h1>
        <Card.Body>
          <Form onSubmit={submitFormData}>
            <Form.Group className="mb-3">
              <Form.Label>Name Entreprise</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="Name Entreprise"
                onChange={handleFormData("nameEntreprise")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Logo</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="file"
                placeholder="Logo"
                onChange={handleFormData("logo")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Identifiant Fiscale</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="Identifiant Fiscale"
                onChange={handleFormData("identifiantFiscale")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>File Identifiant Fiscale</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="file"
                placeholder="Logo"
                onChange={handleFormData("fileidentifiantFiscale")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>RNE Number</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                placeholder="RNENumber"
                onChange={handleFormData("RNENumber")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Creation</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="date"
                placeholder="datofCreation"
                onChange={handleFormData("datofCreation")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button variant="primary" onClick={prevStep}>
                Previous
              </Button>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepTwo;
