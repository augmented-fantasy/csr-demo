import React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as Constants from '../utils/Constants';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const UserFormInputs = ({ 
  formValues, 
  handleChange, 
  setFormValues, 
  vehicleInput, 
  setVehicleInput 
}) => {

  const handleVehicleInputChange = (event) => {
    setVehicleInput(event.target.value);
  };

  const handleAddVehicle = () => {
    if (!vehicleInput?.trim()) return;
    setFormValues((prev) => ({
      ...prev,
      vehicles: [...(prev.vehicles || []), vehicleInput.trim()]
    }));
    setVehicleInput('');
  };

  return (
    <Grid container spacing={3}>
      
      <Grid>
        <FormControl fullWidth required error={!formValues.name?.trim()}>
          <InputLabel>{Constants.UI_TEXT.NAME}</InputLabel>
          <OutlinedInput value={formValues.name} onChange={handleChange} label="Name" name="name" />
        </FormControl>
      </Grid>

      <Grid>
        <FormControl fullWidth required error={!formValues.email?.trim()}>
          <InputLabel>{Constants.UI_TEXT.EMAIL}</InputLabel>
          <OutlinedInput value={formValues.email} onChange={handleChange} label="Email address" name="email" />
        </FormControl>
      </Grid>
      
      <Grid>
        <FormControl fullWidth>
            <InputLabel>{Constants.UI_TEXT.ADDRESS}</InputLabel>
            <OutlinedInput value={formValues.street} onChange={handleChange} label="Street Address" name="street" />
        </FormControl>
      </Grid>

      <Grid>
        <FormControl fullWidth>
            <InputLabel>{Constants.UI_TEXT.CITY}</InputLabel>
            <OutlinedInput value={formValues.city} onChange={handleChange} label="City" name="city" />
        </FormControl>
      </Grid>

      <Grid>
        <FormControl fullWidth>
            <InputLabel>{Constants.UI_TEXT.STATE}</InputLabel>
            <OutlinedInput value={formValues.state} onChange={handleChange} label="State" name="state" />
        </FormControl>
        </Grid>

      <Grid>
        <FormControl fullWidth>
            <InputLabel>{Constants.UI_TEXT.COUNTRY}</InputLabel>
            <OutlinedInput value={formValues.country} onChange={handleChange} label="Country" name="country" />
        </FormControl>
        </Grid>

      <Grid>
        <FormControl fullWidth>
            <InputLabel>{Constants.UI_TEXT.PHONE}</InputLabel>
            <OutlinedInput value={formValues.phone} onChange={handleChange} label="Phone number" name="phone" type="tel" />
        </FormControl>
      </Grid>

      <Grid>
        <FormControl fullWidth>
          <InputLabel>{Constants.UI_TEXT.LOYALTY}</InputLabel>
          <OutlinedInput value={formValues.loyalty} onChange={handleChange} label="Loyalty Points" name="loyalty" />
        </FormControl>
      </Grid>

      <Box>
        {formValues?.vehicles?.map((value, key) => (
          <Chip
            key={key}
            label={value}
            color='warning'
            sx={{ mr: '10px' }}
            onDelete={() =>
              setFormValues((prev) => ({
                ...prev,
                vehicles: prev?.vehicles?.filter((vehicle, idx) => idx !== key)
              }))
            }
          />
        ))}
      </Box>

      <Grid sx={{ width: '470px' }}>
      <FormControl fullWidth>
        <InputLabel>{Constants.UI_TEXT.VEHICLES}</InputLabel>
        <OutlinedInput
          value={vehicleInput}
          onChange={handleVehicleInputChange}
          label="Vehicles"
          name="vehicles"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddVehicle();
            }
          }}
        />
      </FormControl>
      <Button variant="contained" sx={{ mt: 1 }} onClick={handleAddVehicle}>
        Add Vehicle
      </Button>
    </Grid>

    </Grid>
  );
};

export default UserFormInputs;
