import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../AllApis";

function StudentDetails() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(studentId);
        setStudent(data);
      } catch (error) {
        console.error("Failed to fetch student details:", error)
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [studentId]);

  if (loading) return <div>Loading...</div>;
  if (!student) return <div>Student not found.</div>;

  return (
    <div className="container mt-4">
      <h3>Student Details</h3>
      <ul className="list-group">
        <li className="list-group-item"><strong>Name:</strong> {student.name}</li>
        <li className="list-group-item"><strong>Email:</strong> {student.email}</li>
        <li className="list-group-item"><strong>Phone:</strong> {student.phone}</li>
      </ul>
    </div>
  );
}

export default StudentDetails;