import React, { useEffect, useState } from 'react'
import "./App.css";
import axios from 'axios';

const App = () => {
  const [item, setItem] = useState(null);
  const [formValue, setFormValue] = useState({
    first_name: '',
    last_name: '',
    email: ''
  })
  useEffect(() => {
    axios.get('https://reqres.in/api/users').then((item) => { setItem(item.data.data) })
  }, [])

  const onSubmit = () => {
    let isValid = true;
    Object.keys(formValue).forEach(item => {
      if (isValid) {
        isValid = formValue[item].length > 0 ? true : false
      }
    });
    if (isValid) {
      axios.post('https://reqres.in/api/users', formValue);
    } else {
      alert('Please fill all the fields');
    }
  }

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.id]: e.target.value })
  }
  const changeColor = () => {
    const existingColor = document.querySelector('body');
    let exStyle = existingColor.style?.backgroundColor;
    if (!exStyle || (exStyle === 'white')) {
      document.querySelector('body').style.backgroundColor = 'black'
    } else {
      document.querySelector('body').style.backgroundColor = 'white'
    }
  }
  return (
    <div className="main-div">
      <button onClick={() => changeColor()}>Switch Color</button>
      <div style={{ width: '40%', float: 'left', paddingLeft: '10%' }}><h1>Add User</h1>
        <div>
          <form onSubmit={(e) => onSubmit(e)}>
            <label for="first_name">First name*</label>
            <br />
            <input onChange={onChange} type="text" id="first_name" name="first_name" value={formValue?.first_name} />
            <br /><br />
            <label for="last_name">Last name*</label>
            <br />
            <input onChange={onChange} type="text" id="last_name" name="last_name" value={formValue?.last_name} />
            <br /><br />
            <label for="email">Email*</label>
            <br />
            <input onChange={onChange} type="text" id="email" name="email" value={formValue?.email} />
            <br /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
      <div style={{ width: '50%', float: 'right' }}>
        <h1>User List</h1>
        <table>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
          {item?.map((item) => <tr>
            <td><img src={item?.avatar} /></td>
            <td>{item?.id}</td>
            <td>{item?.first_name + item?.last_name}</td>
            <td>{item?.email}</td>
          </tr>
          )}
        </table>
      </div>
    </div>
  )
}

export default App
