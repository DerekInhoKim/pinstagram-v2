import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {editUser} from '../../services/auth'
import {setUser} from '../../redux/actions/users'
import {useHistory} from 'react-router-dom'
import {Button, TextField} from '@material-ui/core';
import NavBar from '../NavBar'

const EditProfile = ({setAuthenticated}) => {
  const currentUser = useSelector(state => state.users.user)
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [about, setAbout] = useState('');
  const dispatch = useDispatch();
  const history = useHistory()

  const updateFullname = (e) => {
      setFullName(e.target.value);
  }

    const updateUsername = (e) => {
        setUserName(e.target.value);
    };

  const updateAbout = (e) => {
      setAbout(e.target.value);
  }

  const handleEdit = async (e) => {
      e.preventDefault();
      const user = await editUser(fullName, userName, about)
      if (user){
          dispatch(setUser(user))
          history.push(`/user/${currentUser.id}`)
          window.location.reload()
      }
  }


  return (
    <div className="top_userpage_container">
      <NavBar setAuthenticated={setAuthenticated}/>
      <div className="edit_form_container">
        <div className="edit_form_center">
          <div className="edit_form_header">
            Edit User Info
          </div>
          <form className="edit_form_form" onSubmit={handleEdit}>
            <div className="edit_form_input">
              <TextField
                type="text"
                label="Full Name"
                InputProps={{ disableUnderline: true }}
                variant="outlined"
                name="fullname"
                onChange={updateFullname}
                value={fullName}
                fullWidth
              />
            </div>
            <div className="edit_form_input">
              <TextField
                type="text"
                label="Username"
                InputProps={{ disableUnderline: true }}
                variant="outlined"
                name="username"
                onChange={updateUsername}
                value={userName}
                fullWidth
              />
            </div>
            <div className="edit_form_input">
              <TextField
                multiline
                rows={2}
                rowsMax={4}
                type="textarea"
                label="About"
                InputProps={{ disableUnderline: true }}
                variant="outlined"
                name="about"
                onChange={updateAbout}
                defaultValue="About me..."
                value={about}
                className="edit_about"
                fullWidth
              />
            </div>
            <div>
              <Button className="edit_button" variant="contained" color="primary" type="submit">Update</Button>

            </div>
          </form>

        </div>

      </div>

    </div>
    )
}

export default EditProfile
