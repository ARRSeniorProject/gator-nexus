import React, { Component } from 'react';
import ChipInput from 'material-ui-chip-input';
import axios from 'axios';
import _ from 'underscore';
import '@gouch/to-title-case';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid, Container, FormHelperText } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#33618A'
        }
    },
    typography: {
        fontFamily: [
            'Montserrat'
        ].join(','),
    }
});

class NewProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            profilePictureImage: null,
            profilePictureFileName: 'No File Chosen',
            submitted: false
        }
        this.profilePictureUpload = React.createRef();
        this.classes = makeStyles((theme) => ({
            button: {
                margin: theme.spacing(5),
            }
        }));
    }

    fileChangedHandler = (event) => {
        this.setState({
            profilePictureImage: event.target.files[0],
            profilePictureFileName: event.target.value.split("\\").slice(-1)
        });
    };

    handleAddSkill = (skill) => {
        let newSkill = skill.toLowerCase().toTitleCase()
        if(!this.state.skills.includes(newSkill)) {
            this.setState({
                skills: [...this.state.skills, newSkill]
            });
        }
    };

    handleDeleteSkill = (skill) => {
        this.setState({
            skills: _.without(this.state.skills, skill)
        });
    };

    render() {
        return(
            <ThemeProvider theme={theme}>
                <div className="form-wrapper">
                    <Container>
                        <Formik
                        initialValues={{
                            gender: '',
                            ethnicity: '',
                            age: '',
                            householdIncome: '',
                            employmentStatus: '',
                            company: '',
                            academicStanding: '',
                            major: '',
                            minor: '',
                            gpa: '',
                            interviewPreparationTime: '',
                            phoneNumber: '',
                            email: ''
                        }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setSubmitting(true);
                            var newProfile = {
                                gender: values.gender,
                                race: values.ethnicity,
                                age: parseInt(values.age),
                                householdIncome: parseFloat(values.householdIncome.replace(/,/g, '')),
                                employmentStatus: parseInt(values.employmentStatus),
                                academicStanding: parseInt(values.academicStanding),
                                major: values.major.toLowerCase().toTitleCase(),
                                gpa: parseFloat(values.gpa),
                                interviewPreparationTime: parseInt(values.interviewPreparationTime),
                                skills: this.state.skills
                            }
                            if(values.company != "") {
                                newProfile.company = values.company.toLowerCase().toTitleCase();
                            }
                            if(values.minor != "") {
                                newProfile.minor = values.minor.toLowerCase().toTitleCase();
                            }
                            if(values.phoneNumber != "") {
                                newProfile.phoneNumber = values.phoneNumber;
                            }
                            if(values.email != "") {
                                newProfile.email = values.email;
                            }
                            const data = new FormData();
                            if(this.state.profilePictureImage) {
                                data.append('profilePicture', this.state.profilePictureImage, this.state.profilePictureImage.name);
                                axios.post('/api/profile-picture/upload', data, {
                                    headers: {
                                        'accept': 'application/json',
                                        'Accept-Language': 'en-US,en;q=0.8',
                                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                                    }
                                })
                                .then((res) => {
                                    if(res.status === 200) {
                                        if(res.data.error) {
                                            if(res.data.error.code === 'LIMIT_FILE_SIZE') {
                                                console.log('Max size: 3MB');
                                            } 
                                            else {
                                                console.log(res.data.error);
                                            }
                                        } 
                                        else {
                                            newProfile.profilePictureLink = res.data.location;
                                            axios.post('/api/personas', newProfile).then(res => res);
                                            this.setState({submitted: true})
                                        }
                                    }
                                }).catch((error) => {
                                    console.log(error);
                                });
                            } 
                            else {
                                console.log(newProfile);
                                axios.post('/api/personas', newProfile).then(res => res);
                                this.setState({submitted: true})
                            }
                            this.setState({
                                skills: [],
                                profilePictureImage: null,
                                profilePictureFileName: 'No File Chosen'
                            });
                            resetForm();
                            this.profilePictureUpload.current.value = null;
                        }}
                        validationSchema={Yup.object().shape({
                            ethnicity: Yup.string().required('Ethnicity is Required'),
                            gender: Yup.string().required('Gender is Required'),
                            age: Yup.number().required('Age is Required'),
                            householdIncome: Yup.string().required('Household Income is Required'),
                            employmentStatus: Yup.number().required('Employment Status is Required'),
                            phoneNumber: Yup.string().matches(/[1-9]\d{2}-\d{3}-\d{4}/, 'Phone Number is not valid'),
                            email: Yup.string().matches(/^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|N\/A)$/, 'Email is not valid'),
                            academicStanding: Yup.number().required('Academic Standing is Required'),
                            gpa: Yup.number().required('GPA is Required'),
                            major: Yup.string().required('Major is Required'),
                            interviewPreparationTime: Yup.number().required('Interview Prep Time is Required')
                        })}
                        >
                            {(props) => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    dirty,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    handleReset,
                                } = props;
                                return(
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={10} justify="center">
                                            <FormControl>
                                                <Grid container spacing={10}>
                                                    <Grid item xs={6}>
                                                        <h4 style={{textAlign: 'center'}}>Personal Info</h4>
                                                        <Grid item>
                                                            <FormControl fullWidth  error={errors.ethnicity && touched.ethnicity}>
                                                                <InputLabel style={{ paddingLeft: "12px" }} htmlFor="ethnicity-dropdown">Ethnicity</InputLabel>
                                                                <Select
                                                                name="ethnicity" 
                                                                variant="outlined"
                                                                labelId="ethnicity-dropdown"
                                                                value={values.ethnicity}
                                                                onChange={handleChange}
                                                                >
                                                                    <MenuItem value="White">White</MenuItem>
                                                                    <MenuItem value="Black">Black</MenuItem>
                                                                    <MenuItem value="Hispanic or Latino">Hispanic or Latino</MenuItem>
                                                                    <MenuItem value="Native American">Native American</MenuItem>
                                                                    <MenuItem value="Asian">Asian</MenuItem>
                                                                    <MenuItem value="Pacific Islander">Pacific Islander</MenuItem>
                                                                    <MenuItem value="Other">Other</MenuItem>
                                                                </Select>
                                                                <FormHelperText>{(errors.ethnicity && touched.ethnicity) && errors.ethnicity}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <FormControl fullWidth error={errors.gender && touched.gender}>
                                                                <InputLabel style={{ paddingLeft: "12px" }} htmlFor="gender-dropdown">Gender</InputLabel>
                                                                <Select
                                                                fullWidth
                                                                name="gender" 
                                                                variant="outlined" 
                                                                labelId="gender-dropdown" 
                                                                value={values.gender} 
                                                                onChange={handleChange}
                                                                >
                                                                    <MenuItem value="Male">Male</MenuItem>
                                                                    <MenuItem value="Female">Female</MenuItem>
                                                                    <MenuItem value="Other">Other</MenuItem>
                                                                </Select>
                                                                <FormHelperText>{(errors.gender && touched.gender) && errors.gender}</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <TextField 
                                                            fullWidth
                                                            error={errors.age && touched.age}
                                                            name="age"
                                                            label='Age'
                                                            type='number'
                                                            InputProps={{ inputProps: {min: 18} }}
                                                            helperText={((errors.age && touched.age) && errors.age)}
                                                            variant="outlined"
                                                            value={values.age}
                                                            onChange={handleChange} 
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <CurrencyTextField
                                                            fullWidth
                                                            error={errors.householdIncome && touched.householdIncome}
                                                            name="householdIncome"
                                                            label='Household Income'
                                                            helperText={((errors.householdIncome && touched.householdIncome) && errors.householdIncome) || 'Input Combined Family Income'}
                                                            variant="outlined"
                                                            currencySymbol="$"
                                                            minimumValue="0"
                                                            outputFormat="string"
                                                            value={values.householdIncome}
                                                            onChange={handleChange}
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <TextField 
                                                            fullWidth
                                                            error={errors.employmentStatus && touched.employmentStatus}
                                                            name="employmentStatus"
                                                            label='Employment Status'
                                                            type='number'
                                                            InputProps={{ inputProps: {min: 0} }}
                                                            helperText={((errors.employmentStatus && touched.employmentStatus) && errors.employmentStatus) || 'Input as Hours per Week'}
                                                            variant="outlined"
                                                            value={values.employmentStatus}
                                                            onChange={handleChange} 
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <TextField
                                                            fullWidth
                                                            error={errors.phoneNumber && touched.phoneNumber}
                                                            name="phoneNumber"
                                                            label='Phone Number'
                                                            variant="outlined"
                                                            helperText={((errors.phoneNumber && touched.phoneNumber) && errors.phoneNumber)}
                                                            value={values.phoneNumber}
                                                            onChange={handleChange}
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <TextField
                                                            fullWidth
                                                            error={errors.email && touched.email}
                                                            name="email"
                                                            label='Email'
                                                            variant="outlined"
                                                            helperText={((errors.email && touched.email) && errors.email)}
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <input 
                                                            id="profile-picture-upload"
                                                            style={{display: "none"}}
                                                            type="file"
                                                            ref={this.profilePictureUpload}
                                                            onChange={this.fileChangedHandler}
                                                            />
                                                            <label htmlFor="profile-picture-upload">
                                                                <Button
                                                                variant="contained"
                                                                color="primary" 
                                                                component="span" 
                                                                className={this.classes.button}
                                                                startIcon={<PhotoCamera />}
                                                                >
                                                                Upload Profile Photo
                                                                </Button>
                                                            </label>
                                                            <br />
                                                            <h6>{this.state.profilePictureFileName}</h6>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <h4 style={{textAlign: 'center'}}>Professional Info</h4>
                                                        <Grid item>
                                                            <TextField 
                                                            fullWidth
                                                            error={errors.academicStanding && touched.academicStanding}
                                                            name="academicStanding"
                                                            label='Academic Standing'
                                                            type='number'
                                                            InputProps={{ inputProps: {min: 1} }}
                                                            helperText={((errors.academicStanding && touched.academicStanding) && errors.academicStanding) || 'Numeric Year in College'}
                                                            variant="outlined"
                                                            value={values.academicStanding}
                                                            onChange={handleChange} 
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <TextField
                                                            fullWidth
                                                            error={errors.gpa && touched.gpa}
                                                            name="gpa"
                                                            label='GPA'
                                                            type='number'
                                                            InputProps={{ inputProps: {min: 0, max: 4.0, step: 0.01} }}
                                                            helperText={((errors.gpa && touched.gpa) && errors.gpa) || '4.0 Scale'}
                                                            variant="outlined"
                                                            value={values.gpa}
                                                            onChange={handleChange} 
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <TextField 
                                                            fullWidth
                                                            error={errors.major && touched.major}
                                                            name="major"
                                                            label='Major'
                                                            helperText={((errors.major && touched.major) && errors.major) || 'No acronym input, such as CS or CpE'}
                                                            variant="outlined"
                                                            value={values.major}
                                                            onChange={handleChange} 
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <TextField
                                                            fullWidth
                                                            name="minor"
                                                            label='Minor'
                                                            helperText='No acronym input, such as CS or CpE'
                                                            variant="outlined"
                                                            value={values.minor}
                                                            onChange={handleChange} 
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <ChipInput
                                                            fullWidth
                                                            color="primary"
                                                            label="Skills"
                                                            value={this.state.skills}
                                                            onAdd={(skill) => this.handleAddSkill(skill)}
                                                            onDelete={(skill, index) => this.handleDeleteSkill(skill, index)}
                                                            variant="outlined"
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <TextField 
                                                            fullWidth
                                                            name="company"
                                                            variant="outlined"
                                                            helperText='No acronym input'
                                                            value={values.company}
                                                            onChange={handleChange}
                                                            label="Internship Company"
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <Grid item>
                                                            <TextField
                                                            fullWidth
                                                            error={errors.interviewPreparationTime && touched.interviewPreparationTime} 
                                                            name="interviewPreparationTime"
                                                            label='Interview Prep Time'
                                                            helperText={((errors.interviewPreparationTime && touched.interviewPreparationTime) && errors.interviewPreparationTime) || 'Approximate Total in Hours'}
                                                            type='number'
                                                            InputProps={{ inputProps: {min: 0} }}
                                                            variant="outlined"
                                                            value={values.interviewPreparationTime}
                                                            onChange={handleChange}
                                                            />
                                                        </Grid>
                                                        <br />
                                                    </Grid>
                                                </Grid>
                                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                                                {this.state.submitted ? <h4>Successfully Submitted! Thank you for Registering!</h4> : null}
                                            </FormControl>
                                        </Grid>
                                    </form>
                                )
                            }}
                        </Formik>
                    </Container>
                </div>
            </ThemeProvider>
        );
    }
}
export default NewProfileForm;