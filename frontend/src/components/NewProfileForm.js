import React, { Component } from 'react';
import ChipInput from 'material-ui-chip-input';
import axios from 'axios';
import _ from 'underscore';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

class NewProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: '',
            race: '',
            age: '',
            householdIncome: '',
            employmentStatus: '',
            phoneNumber: '',
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
            profilePictureFileName: 'No File Chosen'
        }
        this.profilePictureUpload = React.createRef();
        this.classes = makeStyles((theme) => ({
            button: {
                margin: theme.spacing(1),
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
        var newProfile = {
            gender: this.state.gender,
            race: this.state.race,
            age: parseInt(this.state.age),
            householdIncome: parseInt(this.state.householdIncome),
            employmentStatus: parseInt(this.state.employmentStatus),
            academicStanding: parseInt(this.state.academicStanding),
            major: this.state.major,
            gpa: parseFloat(this.state.gpa),
            interviewPreparationTime: parseInt(this.state.interviewPreparationTime),
            skills: this.state.skills
        }
        if(this.state.company != "") {
            newProfile.company = this.state.company;
        }
        if(this.state.minor != "") {
            newProfile.minor = this.state.minor;
        }
        if(this.state.phoneNumber != "") {
            newProfile.phoneNumber = this.state.phoneNumber;
        }
        if(this.state.email != "") {
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
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        } 
        else {
            axios.post('/api/personas', newProfile).then(res => console.log(res.data));
        }
        console.log(newProfile);
        this.setState({
            gender: '',
            race: '',
            age: '',
            householdIncome: '',
            employmentStatus: '',
            phoneNumber: '',
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
            profilePictureFileName: 'No File Chosen'
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
            <div className="form-wrapper">
                <center><h1>Enter in your Information</h1></center>
                <form>
                    <FormControl>
                        <h3>Personal Information</h3>
                        <FormControl>
                            <InputLabel htmlFor="race-dropdown">Race</InputLabel>
                            <Select name="race" variant="outlined" labelId="race-dropdown" value={this.state.race} onChange={e => this.change(e)}>
                                <MenuItem value="">---</MenuItem>
                                <MenuItem value="White">White</MenuItem>
                                <MenuItem value="Black">Black</MenuItem>
                                <MenuItem value="Hispanic or Latino">Hispanic or Latino</MenuItem>
                                <MenuItem value="Native American">Native American</MenuItem>
                                <MenuItem value="Asian">Asian</MenuItem>
                                <MenuItem value="Pacific Islander">Pacific Islander</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="gender-dropdown">Gender</InputLabel>
                            <Select name="gender" variant="outlined" labelId="gender-dropdown" value={this.state.gender} onChange={e => this.change(e)}>
                                <MenuItem value="">---</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField 
                        name="age"
                        placeholder='Age'
                        variant="outlined"
                        value={this.state.age}
                        onChange={e => this.change(e)} 
                        />
                        <TextField
                        name="householdIncome"
                        placeholder='Household Income'
                        variant="outlined"
                        value={this.state.householdIncome}
                        onChange={e => this.change(e)} 
                        />
                        <TextField 
                        name="employmentStatus"
                        placeholder='Employment Status'
                        variant="outlined"
                        value={this.state.employmentStatus}
                        onChange={e => this.change(e)} 
                        />
                        <br />
                        <TextField
                        name="phoneNumber"
                        placeholder='Phone Number'
                        variant="outlined"
                        value={this.state.phoneNumber}
                        onChange={e => this.change(e)} 
                        />
                        <TextField
                        name="email"
                        placeholder='Email'
                        variant="outlined"
                        value={this.state.email}
                        onChange={e => this.change(e)} 
                        />
                        <br />
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
                        {this.state.profilePictureFileName}
                        <h3>Professional Information</h3>
                        <TextField 
                        name="academicStanding"
                        placeholder='Academic Standing'
                        variant="outlined"
                        value={this.state.academicStanding}
                        onChange={e => this.change(e)} 
                        />
                        <TextField 
                        name="major"
                        placeholder='Major'
                        variant="outlined"
                        value={this.state.major}
                        onChange={e => this.change(e)} 
                        />
                        <TextField
                        name="minor"
                        placeholder='Minor'
                        variant="outlined"
                        value={this.state.minor}
                        onChange={e => this.change(e)} 
                        />
                        <TextField
                        name="gpa"
                        placeholder='GPA'
                        variant="outlined"
                        value={this.state.gpa}
                        onChange={e => this.change(e)} 
                        />
                        <br />
                        <ChipInput
                        label="Skills"
                        value={this.state.skills}
                        onAdd={(skill) => this.handleAddSkill(skill)}
                        onDelete={(skill, index) => this.handleDeleteSkill(skill, index)}
                        />
                        <TextField 
                        name="company"
                        placeholder='Company'
                        variant="outlined"
                        value={this.state.company}
                        onChange={e => this.change(e)} 
                        />
                        <TextField 
                        name="interviewPreparationTime"
                        placeholder='Interview Preparation Time'
                        variant="outlined"
                        value={this.state.interviewPreparationTime}
                        onChange={e => this.change(e)} 
                        />
                        <Button variant="contained" color="primary" onClick={e => this.onSubmit(e)}>Submit</Button>
                    </FormControl>
                </form>
            </div>
        );
    }
}

export default NewProfileForm;