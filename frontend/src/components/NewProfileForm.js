import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
//import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
//import CardContent from '@material-ui/core/CardContent';
//import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
//import Grid from '@material-ui/core/Grid';
//import { TextField } from '@material-ui/core';

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
            profilePictureLink: ''
        }
    } 

    fileChangedHandler = (event) => {
        this.setState({
            profilePictureImage: event.target.files[0]
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
            skills: ['Python', 'Java', 'C++']
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
                            console.log('Max size: 2MB');
                        } 
                        else {
                            console.log(res.data.error);
                        }
                    } 
                    else {
                        console.log('File Uploaded');
                        console.log(res.data.location);
                        newProfile.profilePictureLink = res.data.location;
                        console.log(newProfile);
                        axios.post('/api/personas', newProfile).then(res => console.log(res.data));
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        } 
        else {
            console.log(newProfile);
            axios.post('/api/personas', newProfile).then(res => console.log(res.data));
        }
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
            profilePictureLink: ''
        });
    };

    change = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        return(
            <div className="form-wrapper">
                <center><h1>Enter in your Information</h1></center>
                <Form>
                    <FormGroup>
                        <h3>Personal Information</h3>
                        <Input type="select" name="race" onChange={e => this.change(e)}>
                            <option value="">---</option>
                            <option value="White">White</option>
                            <option value="Black">Black</option>
                            <option value="Hispanic or Latino">Hispanic or Latino</option>
                            <option value="Native American">Native American</option>
                            <option value="Asian">Asian</option>
                            <option value="Pacific Islander">Pacific Islander</option>
                            <option value="Other">Other</option>
                        </Input>
                        <Input type="select" name="gender" onChange={e => this.change(e)}>
                            <option value="">---</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Input>
                        <br />
                        <Input 
                        name="age"
                        placeholder='Age'
                        value={this.state.age}
                        onChange={e => this.change(e)} 
                        />
                        <Input 
                        name="householdIncome"
                        placeholder='Household Income'
                        value={this.state.householdIncome}
                        onChange={e => this.change(e)} 
                        />
                        <Input 
                        name="employmentStatus"
                        placeholder='Employment Status'
                        value={this.state.employmentStatus}
                        onChange={e => this.change(e)} 
                        />
                        <br />
                        <Input 
                        name="phoneNumber"
                        placeholder='Phone Number'
                        value={this.state.phoneNumber}
                        onChange={e => this.change(e)} 
                        />
                        <Input 
                        name="email"
                        placeholder='Email'
                        value={this.state.email}
                        onChange={e => this.change(e)} 
                        />
                        <br />
                        <Input 
                        type="file"
                        onChange={this.fileChangedHandler} 
                        />
                        <h3>Professional Information</h3>
                        <Input 
                        name="academicStanding"
                        placeholder='Academic Standing'
                        value={this.state.academicStanding}
                        onChange={e => this.change(e)} 
                        />
                        <Input 
                        name="major"
                        placeholder='Major'
                        value={this.state.major}
                        onChange={e => this.change(e)} 
                        />
                        <Input 
                        name="minor"
                        placeholder='Minor'
                        value={this.state.minor}
                        onChange={e => this.change(e)} 
                        />
                        <Input 
                        name="gpa"
                        placeholder='GPA'
                        value={this.state.gpa}
                        onChange={e => this.change(e)} 
                        />
                        <br />
                        <Input 
                        name="company"
                        placeholder='Company'
                        value={this.state.company}
                        onChange={e => this.change(e)} 
                        />
                        <Input 
                        name="interviewPreparationTime"
                        placeholder='Interview Preparation Time'
                        value={this.state.interviewPreparationTime}
                        onChange={e => this.change(e)} 
                        />
                        <br />
                        <Button onClick={e => this.onSubmit(e)}>Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default NewProfileForm;