// src/Pages/Students.jsx
import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import StudentFormModal from "../Components/StudentFormModal";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../AllApis";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleShow = () => {
    setEditMode(false);
    setFormData({ id: null, name: "", email: "", phone: "" });
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setEditMode(true);
    setFormData(student);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  const handleSave = async () => {
    if (editMode) {
      try {
        const data = await updateStudent(formData?.id, formData);
        if (data?.id) {
          fetchStudents();
        }
      } catch (error) {
        console.error("Failed to Create student:", error);
      }
    } else {
      try {
        const data = await createStudent(formData);
        if (data?.id) {
          fetchStudents();
        }
      } catch (error) {
        console.error("Failed to Create student:", error);
      }
    }
    setShowModal(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to load students:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     
      <div className="container">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h4>Student Management</h4>
          <Button onClick={handleShow}>Add Student</Button>
        </div>

        {loading ? (
          <>Loading...</>
        ) : students?.length < 1 ? (
          <>No data</>
        ) : (
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={student.id}>
                  <td>{idx + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => navigate(`/student-details/${student.id}`)}
                      className="me-2"
                    >
                      View
                    </Button>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleEdit(student)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <StudentFormModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          formData={formData}
          setFormData={setFormData}
          handleSave={handleSave}
          editMode={editMode}
        />
      </div>
    </>
  );
};

export default Students;
