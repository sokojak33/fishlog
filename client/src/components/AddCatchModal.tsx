import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import type { NewFishCatch } from "../types/fishCatch";
import type { SubmitEvent } from "react";

type AddCatchModalProps = {
  show: boolean;
  onClose: () => void;
  onAddCatch: (newCatch: NewFishCatch) => void;
};

function AddCatchModal({ show, onClose, onAddCatch }: AddCatchModalProps) {
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [lengthInches, setLengthInches] = useState("");

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    // species isnt null
    const speciesTrimmed = species.trim();
    if (speciesTrimmed === "") {
      console.log("error for species");
      return;
    }
    // location isnt null
    const locationTrimmed = location.trim();
    if (locationTrimmed === "") {
      console.log("error for loc");
      return;
    }
    // date inst null
    const dateTrimmed = date.trim();
    if (dateTrimmed === "") {
      console.log("error for date");
      return;
    }
    // length isnt null and above 0
    const lengthNumber = +lengthInches;
    if (lengthNumber < 0 && lengthInches !== "") {
      console.log("error for length");
      return;
    }
    const newCatch: NewFishCatch = {
      species: speciesTrimmed,
      location: locationTrimmed,
      date: dateTrimmed,
      length: lengthNumber,
    };
    onAddCatch(newCatch);
  }

  return (
    <div>
      <Modal show={show} onHide={onClose}>
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
                onChange={(e) => setSpecies(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Length:</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.1"
                value={lengthInches}
                onChange={(e) => setLengthInches(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddCatchModal;
