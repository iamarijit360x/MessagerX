import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axiosInstance from '../Middleware/axiosConfig';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function AddtoContacts({ username , onAddContact,contacts }) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState(username|| "");
  const [error, setError] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null); // Reset the error when closing the dialog
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error before submitting

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { email, name } = formJson;
    const contactExists=contacts.findIndex(contact=>contact.username===email)
    if(contactExists!==-1)
      {
        setError('Contact Already Exists')
        return;
      }    
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/addtocontacts`,
        { username: email, name: name }
      );

      if (response.status === 204) {
        setError('User Not Found');
      } else if(response.status === 200){
        console.log(response)
        onAddContact(response.data.contacts);
        handleClose(); // Close the dialog if successful
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while adding the contact');
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} color="secondary">
        <PersonAddIcon sx={{ marginInlineEnd: '0.3rem' }} /> Add to Contacts
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit, // Moved the submit logic to a separate function
        }}
      >
        <DialogTitle>Add to Contacts</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            error={Boolean(error)} // Show error conditionally
            helperText={error} // Display the error message only if error is set
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="string"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
