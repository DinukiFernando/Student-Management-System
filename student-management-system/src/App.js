import './App.css';
import { Table, Input, notification, Button, Drawer, Select } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

function App() {
  const [data, setData] = useState([]); // State to hold the student data
  const [idFilter, setIdFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false); // New state for edit Drawer
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // State variables for the edited student data
  const [editedStudentId, setEditedStudentId] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedBirthday, setEditedBirthday] = useState('');
  const [editedGender, setEditedGender] = useState('');
  const [editedMobileNumber, setEditedMobileNumber] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [editedGuardianName, setEditedGuardianName] = useState('');
  const [editedGuardianContactNumber, setEditedGuardianContactNumber] = useState('');
  const [editedOtherDetails, setEditedOtherDetails] = useState('');

  // State variables for adding a new student
  const [newStudentId, setNewStudentId] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newBirthday, setNewBirthday] = useState('');
  const [newGender, setNewGender] = useState('');
  const [newMobileNumber, setNewMobileNumber] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newGuardianName, setNewGuardianName] = useState('');
  const [newGuardianContactNumber, setNewGuardianContactNumber] = useState('');
  const [newOtherDetails, setNewOtherDetails] = useState('');

  const [columns, setColumns] = useState([
    {
      title: 'Student ID',
      dataIndex: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Phone #',
      dataIndex: 'mobileNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text, record) => (
        <span>
          <Button type="default" style={{ marginRight: 8 }} className='btn-grp' onClick={() => openEditDrawer(record)}>
            Edit
          </Button>
          <Button type="default" style={{ marginRight: 8 }} className='btn-grp' onClick={() => handleDelete(record)}>
            Delete
          </Button>
          <Button type="default" className='btn-grp' onClick={() => openDrawer(record)}>
            View
          </Button>
        </span>
      ),
    },
  ]);

  // useEffect(() => {
  //   // Fetch data from the Mocky API
  //   fetch('https://run.mocky.io/v3/8120c0b1-ce00-45ff-b18a-03c710949ef0')
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setData(result.student);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  useEffect(() => {
    // Fetch data from the Mockoon API
    fetch('http://localhost:3002/students')
      .then((response) => response.json())
      .then((result) => {
        setData(result.student);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  const openNotification = (placement, message, description) => {
    notification.info({
      message,
      description,
      placement,
    });
  };

  const handleDelete = (student) => {
    // Create a new copy of the data array with the student removed
    setData((pre)=>{
      return pre.filter((s) => s.id !== student.id);
    });
  };

  const applyFilter = () => {
    const filteredData = data.filter((student) =>
      (idFilter === '' || student.id.toString().includes(idFilter)) &&
      (nameFilter === '' || student.firstName.includes(nameFilter))
    );
    setData([...filteredData]); // Create a new copy of filtered data

    // Show notification if no students match the filter
    if (filteredData.length === 0) {
      openNotification(
        'topRight',
        'No Students Found',
        'There are no students matching the criteria.'
      );
    }
  };

  const openDrawer = (student) => {
    setSelectedStudent(student);
    setIsDrawerVisible(true);
  };

  const openEditDrawer = (student) => {
    setSelectedStudent(student);

    // Set the edited student data based on the selected student
    setEditedStudentId(student.id);
    setEditedName(`${student.firstName} ${student.lastName}`);
    setEditedBirthday(student.birthday);
    setEditedGender(student.gender);
    setEditedMobileNumber(student.mobileNumber);
    setEditedAddress(student.address);
    setEditedGuardianName(student.guardianName);
    setEditedGuardianContactNumber(student.guardianContactNumber);
    setEditedOtherDetails(student.otherDetails);

    setIsEditDrawerVisible(true);
  };

  const closeDrawer = () => {
    setSelectedStudent(null);
    setIsDrawerVisible(false);
    setIsEditDrawerVisible(false); // Close the edit Drawer
  };

  const openAddDrawer = () => {
    setIsAddDrawerVisible(true);
  };

  const addStudent = () => {
    // Create a new student object with the data from the state variables
    const newStudent = {
      id: newStudentId,
      firstName: newFirstName,
      lastName: newLastName,
      birthday: newBirthday,
      gender: newGender,
      mobileNumber: newMobileNumber,
      address: newAddress,
      guardianName: newGuardianName,
      guardianContactNumber: newGuardianContactNumber,
      otherDetails: newOtherDetails,
    };
  
    // Send a POST request to the '/students' endpoint with the new student data
    axios
      .post('http://localhost:3002/students', newStudent)
      .then((response) => {
        setNewStudentId('');
        setNewFirstName('');
        setNewLastName('');
        setNewBirthday('');
        setNewGender('');
        setNewMobileNumber('');
        setNewAddress('');
        setNewGuardianName('');
        setNewGuardianContactNumber('');
        setNewOtherDetails('');

        // Log the data sent successfully and the response from the API
      console.log('Data Sent Successfully:', newStudent);
      console.log('API Response:', response.data);
  
        // Show a success notification
        openNotification(
          'topRight',
          'Student Added',
          'The student has been successfully added.'
        );
      })
      .catch((error) => {
        // Handle errors if the POST request fails
        console.error('Error adding student:', error);
  
        // Show an error notification
        openNotification(
          'topRight',
          'Error Adding Student',
          'There was an error adding the student. Please try again.'
        );
      });
  };



  const editStudent = () => {
    // Create a new student object with the data from the state variables
    const editStudent = {
      id: editedStudentId,
      firstName: editedName,
      lastName: editedName,
      birthday: editedBirthday,
      gender: editedGender,
      mobileNumber: editedMobileNumber,
      address: editedAddress,
      guardianName: editedGuardianName,
      guardianContactNumber: editedGuardianContactNumber,
      otherDetails: editedOtherDetails,
    };
  
    // Send a POST request to the '/students' endpoint with the new student data
    axios
      .post('http://localhost:3002/students', editStudent)
      .then((response) => {
        setEditedStudentId('');
        setEditedName('');
        setEditedName('');
        setEditedBirthday('');
        setEditedGender('');
        setEditedMobileNumber('');
        setEditedAddress('');
        setEditedGuardianName('');
        setEditedGuardianContactNumber('');
        setEditedOtherDetails('');

        // Log the data sent successfully and the response from the API
      console.log('Data Sent Successfully:', editStudent);
      console.log('API Response:', response.data);
  
        // Show a success notification
        openNotification(
          'topRight',
          'Student edited',
          'The student has been successfully edited.'
        );
      })
      .catch((error) => {
        // Handle errors if the POST request fails
        console.error('Error adding student:', error);
  
        // Show an error notification
        openNotification(
          'topRight',
          'Error edditing Student',
          'There was an error edditing the student. Please try again.'
        );
      });
  };
  

  return (
    <div className="App">
      <Header/>
      <div className='upper-container'>
        <h5>Student ID</h5>
        <Input
          placeholder="Enter Student ID"
          className='textbox'
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
        />
        <h5>Name</h5>
        <Input
          placeholder="Enter Name"
          className='textbox'
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <Button type="primary" id='btn-1' onClick={applyFilter}>
          Search
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        id="table"
        rowKey="id"
        onRow={(record) => ({
          onClick: () => {}, // Disable the row click event
        })}
      />
      <div id='lower-container'>
        <Button type="primary" id='btn-2' onClick={openAddDrawer}>Add Student</Button>
      </div>

      <Drawer
        title="Student Information"
        placement="left"
        closable={true}
        onClose={closeDrawer}
        visible={isEditDrawerVisible} // Show the edit Drawer based on state
      >
        {selectedStudent && (
          <div>
            <p><b>Student ID</b></p>
            <Input placeholder="Enter Student ID" value={editedStudentId} onChange={(e) => setEditedStudentId(e.target.value)} /><br/>
            <p><b>Name</b></p>
            <Input placeholder="Enter Name" value={editedName} onChange={(e) => setEditedName(e.target.value)} /><br/>
            <p><b>Birthday</b></p>
            <Input placeholder="Enter Birthday" value={editedBirthday} onChange={(e) => setEditedBirthday(e.target.value)} /><br/>
            <p><b>Gender</b></p>
            <Select
              placeholder="Select Gender"
              value={editedGender}
              onChange={(value) => setEditedGender(value)}
              style={{ width: '100%' }}
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
            <br/>

            <p><b>Mobile Number</b></p>
            <Input placeholder="Enter Mobile Number" value={editedMobileNumber} onChange={(e) => setEditedMobileNumber(e.target.value)} /><br/>
            <p><b>Address</b></p>
            <Input placeholder="Enter Address" value={editedAddress} onChange={(e) => setEditedAddress(e.target.value)} /><br/>
            <p><b>Guardian Name</b></p>
            <Input placeholder="Enter Guardian Name" value={editedGuardianName} onChange={(e) => setEditedGuardianName(e.target.value)} /><br/>
            <p><b>Guardian Contact Number</b></p>
            <Input placeholder="Enter Guardian Contact Number" value={editedGuardianContactNumber} onChange={(e) => setEditedGuardianContactNumber(e.target.value)} /><br/>
            <p><b>Other Details</b></p>
            <Input placeholder="Enter Other Details" value={editedOtherDetails} onChange={(e) => setEditedOtherDetails(e.target.value)} /><br/>
            <Button type="primary" id='btn-save' onClick={editStudent}wo> Save</Button>
          </div>
        )}
      </Drawer>

      <Drawer
        title="Student Details"
        placement="right"
        closable={true}
        onClose={closeDrawer}
        visible={isDrawerVisible}
      >
        {selectedStudent && (
          <div>
            <p><b>Student ID</b> : {selectedStudent.id}</p>
            <p><b>Name</b> : {`${selectedStudent.firstName} ${selectedStudent.lastName}`}</p>
            <p><b>Birthday</b> : {selectedStudent.birthday}</p>
            <p><b>Gender</b> : {selectedStudent.gender}</p>
            <p><b>Mobile Number</b> : {selectedStudent.mobileNumber}</p>
            <p><b>Address</b> : {selectedStudent.address}</p>
            <p><b>Guardian Name</b> : {selectedStudent.guardianName}</p>
            <p><b>Guardian Contact Number</b> : {selectedStudent.guardianContactNumber}</p>
            <p><b>Other Details</b> : {selectedStudent.otherDetails}</p>
          </div>
        )}
      </Drawer>

      {/* "Add Student" Drawer */}
      <Drawer
        title="Add Student"
        placement="left"
        closable={true}
        onClose={() => setIsAddDrawerVisible(false)} // Close the "Add Student" drawer
        visible={isAddDrawerVisible} // Show the "Add Student" drawer based on state
      >
        <div>
          <p><b>Student ID</b></p>
          <Input placeholder="Enter Student ID" value={newStudentId} onChange={(e) => setNewStudentId(e.target.value)} /><br/>
          <p><b>First Name</b></p>
          <Input placeholder="Enter First Name" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} /><br/>
          <p><b>Last Name</b></p>
          <Input placeholder="Enter Last Name" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} /><br/>
          <p><b>Birthday</b></p>
          <Input placeholder="Enter Birthday" value={newBirthday} onChange={(e) => setNewBirthday(e.target.value)} /><br/>
          <p><b>Gender</b></p>
         
          <Select
              placeholder="Select Gender"
              value={newGender}
              onChange={(value) => setNewGender(value)}
              style={{ width: '100%' }}
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
            <br/>
          <p><b>Mobile Number</b></p>
          <Input placeholder="Enter Mobile Number" value={newMobileNumber} onChange={(e) => setNewMobileNumber(e.target.value)} /><br/>
          <p><b>Address</b></p>
          <Input placeholder="Enter Address" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} /><br/>
          <p><b>Guardian Name</b></p>
          <Input placeholder="Enter Guardian Name" value={newGuardianName} onChange={(e) => setNewGuardianName(e.target.value)} /><br/>
          <p><b>Guardian Contact Number</b></p>
          <Input placeholder="Enter Guardian Contact Number" value={newGuardianContactNumber} onChange={(e) => setNewGuardianContactNumber(e.target.value)} /><br/>
          <p><b>Other Details</b></p>
          <Input placeholder="Enter Other Details" value={newOtherDetails} onChange={(e) => setNewOtherDetails(e.target.value)} /><br/>
          <Button type="primary" id='btn-save' onClick={addStudent}> Save</Button>
        </div>
      </Drawer>

    </div>
  );
}

export default App;
