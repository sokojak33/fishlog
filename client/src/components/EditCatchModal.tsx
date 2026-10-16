import { Alert, Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import type { NewFishCatch, FishCatch } from "../types/fishCatch";
import type { SubmitEvent } from "react";

type EditCatchModalProps = {
  fishCatch: FishCatch;
  onClose: () => void;
  onEditCatch: (id: number, newCatch: NewFishCatch) => Promise<boolean>;
  editError: string | null;
};

type FormErrors = {
  species?: string;
  location?: string;
  date?: string;
  length?: string;
};

function EditCatchModal({
  fishCatch,
  onClose,
  onEditCatch,
  editError,
}: EditCatchModalProps) {
  const [species, setSpecies] = useState(fishCatch.species);
  const [location, setLocation] = useState(fishCatch.location);
  const [date, setDate] = useState(fishCatch.date);
  const [lengthInches, setLengthInches] = useState(fishCatch.length.toString());
  const [errors, setErrors] = useState<FormErrors>({});

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: FormErrors = {};

    const speciesTrimmed = species.trim();
    if (speciesTrimmed === "") {
      newErrors.species = "Species is required.";
    }

    const locationTrimmed = location.trim();
    if (locationTrimmed === "") {
      newErrors.location = "Location is required.";
    }

    const dateTrimmed = date.trim();
    if (dateTrimmed === "") {
      newErrors.date = "Date is required.";
    }

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

    const updatedCatch: NewFishCatch = {
      species: speciesTrimmed,
      location: locationTrimmed,
      date: dateTrimmed,
      length: lengthNumber,
    };

    const success = await onEditCatch(fishCatch.id, updatedCatch);

    if (success) {
      setErrors({});
      onClose();
    }
  }

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Catch</Modal.Title>
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
              min="0.1"
              step="0.1"
              value={lengthInches}
              isInvalid={!!errors.length}
              onChange={(e) => setLengthInches(e.target.value)}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.length}
            </Form.Control.Feedback>
          </Form.Group>

          {editError && <Alert variant="danger">{editError}</Alert>}
          <Button type="submit">Save Changes</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditCatchModal;
