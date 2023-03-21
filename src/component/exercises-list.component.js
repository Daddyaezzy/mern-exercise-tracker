import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = ({ exercise, deleteExercise }) => (
  <tr>
    <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>{exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${exercise._id}`}>edit</Link> |{" "}
      <button
        onClick={() => {
          deleteExercise(exercise._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercise")
      .then((response) => {
        setExercises(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteExercise = (id) => {
    axios.delete("http://localhost:5000/exercise/" + id).then((response) => {
      setExercises(exercises.filter((exercise) => exercise._id !== id));
    });
  };

  const exerciseList = () => {
    return exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  };
  return (
    <>
      {isLoading && <div> Loading Exercises...</div>}
      {!isLoading && (
        <div>
          <h3>Logged Exercises</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{exerciseList()}</tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ExerciseList;
