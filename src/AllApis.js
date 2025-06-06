import axios from "axios";

const API_URL = "https://student-app-be-7wfo.onrender.com";

export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    console.log("API Response:", response.data); 
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

export const getStudentById = async (id) => {
  try {
   
    const response = await axios.get(`${API_URL}/students/${id}`);
    
    if (!response.data) {
      throw new Error("Student not found");
    }
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Student with ID ${id} does not exist.`);
    } else {
      throw new Error("Failed to fetch student. Please try again.");
    }
  }
};

export const createStudent = async (studentData) => {
  try {
    if (!studentData?.name || !studentData?.email) {
      throw new Error("Name and email are required!");
    }

    const response = await axios.post(`${API_URL}/students`, studentData);

    if (response.status !== 201) { // 201 = Created (common for POST)
      throw new Error("Failed to create student.");
    }

    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Could not create student. Please try again.");
    }
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    if (!id) throw new Error("Student ID is required!");
    if (!studentData?.name || !studentData?.email) {
      throw new Error("Name and email are required for update.");
    }

    const response = await axios.put(`${API_URL}/students/${id}`, studentData);

    if (response.status !== 200 && response.status !== 204) {
      throw new Error("Failed to update student.");
    }

    return response.data; 
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    } else if (error.response?.status === 404) {
      throw new Error(`Student with ID ${id} not found.`);
    } else {
      throw new Error("Could not update student. Please try again.");
    }
  }
};

// export const deleteStudent = async (id) => {
//   try {
//     const response = await axios.delete(`${API_URL}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting student ${id}:`, error);
//     throw error;
//   }
// };
export const deleteStudent = async (id) => {
  try {
    if (!id) {
      throw new Error("Student ID is required for deletion!");
    }

    const response = await axios.delete(`${API_URL}/students/${id}`);

    if (response.status !== 200 && response.status !== 204) {
      throw new Error("Failed to delete student.");
    }

    return { success: true, message: "Student deleted successfully" };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Student with ID ${id} not found.`);
    } else if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Could not delete student. Please try again.");
    }
  }
};
