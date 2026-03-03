import {useState} from 'react'
import axios from 'axios'
function App() {
  const [detail, setDetail] = useState({
   username: "",
   Phone: "",
   password: "",
   ConfirmPassword: ""
  })

  function handleInput(e){
  const {name, value} = e.target;

    setDetail({
      ...detail,
      [name]: value,
    });
  }


  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await axios.post(
      "https://form-2-5r5t.onrender.com/users",
      detail,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data); 
  } catch (error) {
    console.log(error.response?.data || error.message);
  }

setDetail({
   username: "",
   Phone: "",
   password: "",
   ConfirmPassword: ""
});
}
  return (
    <>
    
    <div className="Main">
     <form onSubmit={handleSubmit}>

      <label htmlFor="username">Enter Your Usnername:- </label>
      <input type="text" id='username' name='username' value={detail.username} 
      onChange={handleInput}/>
      <br />
      <br />

      <label htmlFor="Phone">Enter Your Mobile Number:- </label>
      <input type="text" id='Phone' name='Phone' value={detail.Phone}
      onChange={handleInput}/>
      <br />
      <br />

      <label htmlFor="password">Enter Your Password:- </label>
      <input type="password" id='password' name='password' value={detail.password}
      onChange={handleInput}/>
      <br />
      <br />
      
        <label htmlFor="Conpassword">Enter Confirm Password:- </label>
      <input type="password" id='Conpassword' name='ConfirmPassword' value={detail.ConfirmPassword}
      onChange={handleInput}/>
      <br />
      <br />

      <button type="submit">Submit</button>
     </form>

    </div>
    
    </>
  )
}

export default App