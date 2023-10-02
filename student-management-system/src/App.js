import './App.css';
import { Button, Table, Input } from 'antd';
import { useEffect, useState } from 'react';
import Header from './Header';

function App() {
  const [data, setData] = useState([]); // State to hold the student data

  // Sample student data (replace with your own data)
  const jsonData = {
    id: 12415,
    firstName: "sameera",
    lastName: "senarathna",
    birthday: "2000-01-01",
    gender: "Male",
    mobileNumber: "0123456789",
    address: "No 55, Dehiwala, Colombo 4",
    guardianName: "Nimal Silva",
    guardianContactNumber: "078974545",
    otherDetails: "some other important details about the student goes here"
  };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Phone #',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text, record) => (
        <span>
          <Button type="default" style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button type="default" style={{ marginRight: 8 }}>
            Delete
          </Button>
          <Button type="default">View</Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    // Set the data state with the JSON data
    setData([jsonData]);
  }, []);

  return (
    <div className="App">
      <Header />
      <div className='upper-container'>
        <h5>Student ID</h5>
        <Input placeholder="" className='textbox'/>
        <h5>Name</h5>
        <Input placeholder="" className='textbox'/>
        <Button type="primary" id='btn-1'>Search</Button>
      </div>
      
      <Table columns={columns} dataSource={data}  id='table'/>
      <div id='lower-container'><Button  type="primary" id='btn-2'>Add Student</Button></div>
    </div>
  );
}

export default App;


// import './App.css';
// import { Button, Table, Input } from 'antd';
// import { useEffect, useState } from 'react';
// import Header from './Header';
// import axios from 'axios';

// function App() {
//   const [data, setData] = useState([]); // State to hold the student data

//   const columns = [
//     {
//       title: 'Student ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'First Name',
//       dataIndex: 'firstName',
//       key: 'firstName',
//     },
//     {
//       title: 'Phone #',
//       dataIndex: 'mobileNumber',
//       key: 'mobileNumber',
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//     },
//     {
//       title: 'Gender',
//       dataIndex: 'gender',
//       key: 'gender',
//     },
//     {
//       title: 'Action',
//       key: 'Action',
//       render: (text, record) => (
//         <span>
//           <Button type="default" style={{ marginRight: 8 }}>
//             Edit
//           </Button>
//           <Button type="default" style={{ marginRight: 8 }}>
//             Delete
//           </Button>
//           <Button type="default">View</Button>
//         </span>
//       ),
//     },
//   ];

//   useEffect(() => {
//     // Fetch data from the Mocky API
//     axios.get('https://run.mocky.io/v3/0c1f6496-9fae-440e-826b-cb34c87b3259')
//       .then(response => {
//         console.log('API Response:', response.data); // Log the API response
//         // Update the state with the fetched data
//         setData([response.data]);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);
  
//   return (
//     <div className="App">
//       <Header />
//       <div className='upper-container'>
//         <h5>Student ID</h5>
//         <Input placeholder="" className='textbox'/>
//         <h5>Name</h5>
//         <Input placeholder="" className='textbox'/>
//         <Button type="primary" id='btn-1'>Search</Button>
//       </div>
      
//       <div id='table-container'><Table columns={columns} dataSource={data}  id='table' rowKey='id' size='large'/></div>
//       <div id='lower-container'><Button  type="primary" id='btn-2'>Add Student</Button></div>
//     </div>
//   );
// }

// export default App;
