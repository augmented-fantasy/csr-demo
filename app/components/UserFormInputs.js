import React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as Constants from '../utils/Constants';

const UserFormInputs = ({ formValues, handleChange }) => {
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
        <FormControl fullWidth required error={!formValues.street?.trim()}>
            <InputLabel>{Constants.UI_TEXT.ADDRESS}</InputLabel>
            <OutlinedInput value={formValues.street} onChange={handleChange} label="Street Address" name="street" />
        </FormControl>
      </Grid>

      <Grid>
        <FormControl fullWidth required error={!formValues.city?.trim()}>
            <InputLabel>{Constants.UI_TEXT.CITY}</InputLabel>
            <OutlinedInput value={formValues.city} onChange={handleChange} label="City" name="city" />
        </FormControl>
      </Grid>

      <Grid>
        <FormControl fullWidth required error={!formValues.state?.trim()}>
            <InputLabel>{Constants.UI_TEXT.STATE}</InputLabel>
            <OutlinedInput value={formValues.state} onChange={handleChange} label="State" name="state" />
        </FormControl>
        </Grid>

      <Grid>
        <FormControl fullWidth required error={!formValues.country?.trim()}>
            <InputLabel>{Constants.UI_TEXT.COUNTRY}</InputLabel>
            <OutlinedInput value={formValues.country} onChange={handleChange} label="Country" name="country" />
        </FormControl>
        </Grid>

      <Grid>
        <FormControl fullWidth required error={!formValues.phone?.trim() || !/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(formValues.phone)}>
            <InputLabel>{Constants.UI_TEXT.PHONE}</InputLabel>
            <OutlinedInput value={formValues.phone} onChange={handleChange} label="Phone number" name="phone" type="tel" />
        </FormControl>
        </Grid>
    </Grid>
  );
};

export default UserFormInputs;
