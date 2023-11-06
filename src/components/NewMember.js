// import React from 'react';

// const NewMember = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     image: '',
//     description: '',
//     price: '',
//     model: '',
//     user_id: currentUser ? currentUser.id : 1,

//   });

//   const handleFormInputs = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createCars(formData));
//     setFormData({
//       name: '',
//       image: '',
//       description: '',
//       price: '',
//       model: '',
//       user_id: currentUser ? currentUser.id : 1,
//       // user_id: 1,
//     })
//     navigate('/')
//   }


//   return (
//   <div>
//     <h2>NewMember</h2>
//     <form onSubmit={handleSubmit}>
//       <input name='name' value={name}
// type='text' placeholder='Full Name' handleInput={handleFormInputs}/>
//       <input name='photo' value={photo}
//  type='text' placeholder='Photo' handleInput={handleFormInputs}/>
//       <input name='address' value={address}
//  type='text' placeholder='Address' handleInput={handleFormInputs}/>
//       <input name='phone_number' value={phone_number}
//  type='text' placeholder='Phone Number' handleInput={handleFormInputs}/>
//       <input name='joined_at' value={joined_at}
//  type='text' placeholder='Member Since' handleInput={handleFormInputs}/>
//       <div className="submit-btn">
//         <button type="submit" disabled={isdisabled}>
//           Add Car
//         </button>
//       </div>
//     </form>
//   </div>
//   )
// };

// export default NewMember;
