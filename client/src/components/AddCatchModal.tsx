import { Alert, Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import type { NewFishCatch } from "../types/fishCatch";
import type { SubmitEvent } from "react";

type AddCatchModalProps = {
  show: boolean;
  onClose: () => void;
  onAddCatch: (newCatch: NewFishCatch) => Promise<boolean>;
  addError: string | null;
};

type FormErrors = {
  species?: string;
  location?: string;
  date?: string;
  length?: string;
};

function AddCatchModal({
  show,
  onClose,
  onAddCatch,
  addError,
}: AddCatchModalProps) {
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [lengthInches, setLengthInches] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: FormErrors = {};

    // species isnt null
    const speciesTrimmed = species.trim();
    if (speciesTrimmed === "") {
      newErrors.species = "Species is required.";
    }
    // location isnt null
    const locationTrimmed = location.trim();
    if (locationTrimmed === "") {
      newErrors.location = "Location is required.";
    }
    // date inst null
    const dateTrimmed = date.trim();
    if (dateTrimmed === "") {
      newErrors.date = "Date is required.";
    }
    // length isnt null and above 0
    const lengthNumber = +lengthInches;
    if (
      lengthInches === "" ||
      !Number.isFinite(lengthNumber) ||
      lengthNumber <= 0
    ) {
      newErrors.length = "Length must be greater than 0.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newCatch: NewFishCatch = {
      species: speciesTrimmed,
      location: locationTrimmed,
      date: dateTrimmed,
      length: lengthNumber,
    };

    const success = await onAddCatch(newCatch);

    if (success) {
      handleClose();
    }
  }

  function handleClose() {
    setSpecies("");
    setLocation("");
    setDate("");
    setLengthInches("");
    setErrors({});
    onClose();
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Log catch</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Species:</Form.Label>
              <Form.Control
                type="text"
                value={species}
                isInvalid={!!errors.species}
                onChange={(e) => setSpecies(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.species}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="text"
                value={location}
                isInvalid={!!errors.location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.location}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                value={date}
                isInvalid={!!errors.date}
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.date}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Length:</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.1"
                value={lengthInches}
                isInvalid={!!errors.length}
                onChange={(e) => setLengthInches(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.length}
              </Form.Control.Feedback>
            </Form.Group>

            {addError && <Alert variant="danger">{addError}</Alert>}
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddCatchModal;
