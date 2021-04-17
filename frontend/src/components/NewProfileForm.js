import React, { Component } from 'react';
import ChipInput from 'material-ui-chip-input';
import axios from 'axios';
import _ from 'underscore';
import '@gouch/to-title-case';
import emailMask from 'text-mask-addons/dist/emailMask';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid, Container, Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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

const PhoneNumberMask = (props) => {
    const {inputRef, ...other} = props;
    return (
        <MaskedInput
        {...other}
        ref = {(ref) => {
            inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        />
    );
};

PhoneNumberMask.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

const EmailMask = (props) => {
    const {inputRef, ...other} = props;
    return (
        <MaskedInput
        {...other}
        ref = {(ref) => {
            inputRef(ref ? ref.inputElement : null);
        }}
        mask={emailMask}
        placeholderChar={'\u2000'}
        />
    );
};

EmailMask.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

class NewProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: '',
            race: '',
            age: '',
            householdIncome: '',
            employmentStatus: '',
            company: '',
            academicStanding: '',
            major: '',
            minor: '',
            gpa: '',
            interviewPreparationTime: '',
            skills: [],
            profilePictureImage: null,
            profilePictureLink: '',
            profilePictureFileName: 'No File Chosen',
            phoneNumber: '  -   -    ',
            email: '@.',
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

    onSubmit = (event) => {
        event.preventDefault();
        var skills = [];
        for(var i = 0; i < this.state.skills.length; i++) {
            skills.push(this.state.skills[i].toLowerCase().toTitleCase());
        }
        var newProfile = {
            gender: this.state.gender,
            race: this.state.race,
            age: parseInt(this.state.age),
            householdIncome: parseInt(this.state.householdIncome),
            employmentStatus: parseInt(this.state.employmentStatus),
            academicStanding: parseInt(this.state.academicStanding),
            major: this.state.major.toLowerCase().toTitleCase(),
            gpa: parseFloat(this.state.gpa),
            interviewPreparationTime: parseInt(this.state.interviewPreparationTime),
            skills: skills
        }
        if(this.state.company != "") {
            newProfile.company = this.state.company.toLowerCase().toTitleCase();
        }
        if(this.state.minor != "") {
            newProfile.minor = this.state.minor.toLowerCase().toTitleCase();
        }
        if(this.state.phoneNumber != "  -   -    ") {
            newProfile.phoneNumber = this.state.phoneNumber;
        }
        if(this.state.email != "@.") {
            newProfile.email = this.state.email;
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
                        console.log('File Uploaded');
                        newProfile.profilePictureLink = res.data.location;
                        axios.post('/api/personas', newProfile).then(res => console.log(res.data));
                        this.setState({submitted: true})
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        } 
        else {
            axios.post('/api/personas', newProfile).then(res => console.log(res.data));
            this.setState({submitted: true})
        }
        console.log(newProfile);
        this.setState({
            gender: '',
            race: '',
            age: '',
            householdIncome: '',
            employmentStatus: '',
            email: '',
            company: '',
            academicStanding: '',
            major: '',
            minor: '',
            gpa: '',
            interviewPreparationTime: '',
            skills: [],
            profilePictureImage: null,
            profilePictureLink: '',
            profilePictureFileName: 'No File Chosen',
            phoneNumber: '  -   -    ',
            email: '@.'
        });
        this.profilePictureUpload.current.value = null;
    };

    change = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleAddSkill = (skill) => {
        this.setState({
            skills: [...this.state.skills, skill]
        });
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
                    <h1 style={{textAlign: 'center'}}>Enter in your Information</h1>
                    <br />
                    <form>
                        <Grid container spacing={3} justify="center">
                            <FormControl>
                                <h3 style={{textAlign: 'center'}}>Personal Information</h3>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs>
                                        <FormControl>
                                            <InputLabel htmlFor="race-dropdown">Race</InputLabel>
                                            <Select name="race" variant="outlined" labelId="race-dropdown" value={this.state.race} onChange={e => this.change(e)}>
                                                <MenuItem value="White">White</MenuItem>
                                                <MenuItem value="Black">Black</MenuItem>
                                                <MenuItem value="Hispanic or Latino">Hispanic or Latino</MenuItem>
                                                <MenuItem value="Native American">Native American</MenuItem>
                                                <MenuItem value="Asian">Asian</MenuItem>
                                                <MenuItem value="Pacific Islander">Pacific Islander</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl>
                                            <InputLabel id="gender-dropdown">Gender</InputLabel>
                                            <Select name="gender" variant="outlined" labelId="gender-dropdown" value={this.state.gender} onChange={e => this.change(e)}>
                                                <MenuItem value="Male">Male</MenuItem>
                                                <MenuItem value="Female">Female</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField 
                                        name="age"
                                        label='Age'
                                        type='number'
                                        InputProps={{ inputProps: {min: 18} }}
                                        variant="outlined"
                                        value={this.state.age}
                                        onChange={e => this.change(e)}
                                        style={{width: '100%'}}
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <CurrencyTextField
                                        name="householdIncome"
                                        label='Household Income'
                                        helperText='Input Combined Family Income'
                                        variant="outlined"
                                        currencySymbol="$"
                                        minimumValue="0"
                                        outputFormat="number"
                                        onChange={e => this.change(e)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                        name="employmentStatus"
                                        label='Employment Status'
                                        type='number'
                                        InputProps={{ inputProps: {min: 0} }}
                                        helperText='Input as Hours per Week'
                                        variant="outlined"
                                        value={this.state.employmentStatus}
                                        onChange={e => this.change(e)} 
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                        name="phoneNumber"
                                        label='Phone Number'
                                        variant="outlined"
                                        InputProps={{
                                            inputComponent: PhoneNumberMask,
                                            value: this.state.phoneNumber,
                                            onChange: this.change
                                        }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                        name="email"
                                        label='Email'
                                        variant="outlined"
                                        InputProps={{
                                            inputComponent: EmailMask,
                                            value: this.state.email,
                                            onChange: this.change
                                        }}
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={7}>
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
                                            Upload Profile Picture
                                            </Button>
                                        </label>
                                    </Grid>
                                    <Grid item xs={5}>
                                        {this.state.profilePictureFileName}
                                    </Grid>
                                </Grid>
                                <br />
                                <h3 style={{textAlign: 'center'}}>Professional Information</h3>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField 
                                        name="academicStanding"
                                        label='Academic Standing'
                                        type='number'
                                        InputProps={{ inputProps: {min: 1} }}
                                        helperText='Numeric Year in College'
                                        variant="outlined"
                                        value={this.state.academicStanding}
                                        onChange={e => this.change(e)} 
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                        name="gpa"
                                        label='GPA'
                                        type='number'
                                        InputProps={{ inputProps: {min: 0, max: 4.0, step: 0.1} }}
                                        helperText='4.0 Scale'
                                        variant="outlined"
                                        value={this.state.gpa}
                                        onChange={e => this.change(e)} 
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField 
                                        name="major"
                                        label='Major'
                                        variant="outlined"
                                        value={this.state.major}
                                        onChange={e => this.change(e)} 
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                        name="minor"
                                        label='Minor'
                                        variant="outlined"
                                        value={this.state.minor}
                                        onChange={e => this.change(e)} 
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <ChipInput
                                color="primary"
                                label="Skills"
                                value={this.state.skills}
                                onAdd={(skill) => this.handleAddSkill(skill)}
                                onDelete={(skill, index) => this.handleDeleteSkill(skill, index)}
                                fullWidth="true"
                                variant="outlined"
                                />
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField 
                                        name="company"
                                        variant="outlined"
                                        value={this.state.company}
                                        onChange={e => this.change(e)}
                                        label="Internship Company"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField 
                                        name="interviewPreparationTime"
                                        label='Interview Prep Time'
                                        type='number'
                                        InputProps={{ inputProps: {min: 0} }}
                                        helperText='Approximate Total in Hours'
                                        variant="outlined"
                                        value={this.state.interviewPreparationTime}
                                        onChange={e => this.change(e)}
                                        width="100%"
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Button variant="contained" color="primary" onClick={e => this.onSubmit(e)}>Submit</Button>
                            </FormControl>
                        </Grid>
                        <br />
                        {this.state.submitted ? <h4>Successfully Submitted! Thank you for Registering!</h4> : null}
                    </form>
                    </Container>
                </div>
            </ThemeProvider>
        );
    }
}

export default NewProfileForm;