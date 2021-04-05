import React, { Component, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
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
            age: 0,
            householdIncome: 0,
            employmentStatus: 0,
            phoneNumber: '',
            email: '',
            company: '',
            academicStanding: 0,
            major: '',
            minor: '',
            gpa: 0,
            interviewPreparationTime: 0,
            skills: [],
            profilePicture: null
        }
    }

    ocShowAlert = (message, background = '#3089cf') => {
        let alertContainer = document.querySelector('#oc-alert-container');
        let alertEl = document.createElement('div');
        let textNode = document.createTextNode(message);
        alertEl.setAttribute('class', 'oc-alert-pop-up');
        $(alertEl).css('background', background);
        alertEl.appendChild(textNode);
        alertContainer.appendChild(alertEl);
        setTimeout(() => {
            $(alertEl).fadeOut('slow');
            $(alertEl).remove();
        }, 3000);
    };    

    fileChangedHandler = (event) => {
        this.setState({
            profilePicture: event.target.files[0]
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        const data = new FormData();
        if(this.state.profilePicture) {
            data.append('profilePicture', this.state.profilePicture, this.state.profilePicture.name);
            var newProfile = {
                gender: this.state.gender,
                race: this.state.race,
                age: this.state.age,
                householdIncome: this.state.householdIncome,
                employmentStatus: this.state.employmentStatus,
                academicStanding: this.state.academicStanding,
                major: this.state.major,
                gpa: this.state.gpa,
                interviewPreparationTime: this.state.interviewPreparationTime,
                skills: ['Python', 'Java', 'C++']
            }
            var company = this.state.company;
            var minor = this.state.minor;
            var phoneNumber = this.state.phoneNumber;
            var email = this.state.email;
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
                        console.log(res);
                        if(company != "") {
                            newProfile.company = company;
                        }
                        if(minor != "") {
                            newProfile.minor = minor;
                        }
                        if(phoneNumber != "") {
                            newProfile.phoneNumber = phoneNumber;
                        }
                        if(email != "") {
                            newProfile.email = email;
                        }
                        axios.post('/api/personas', newProfile).then(res => console.log(res.data));
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        } 
        else {
            console.log('Please upload file');
        }
        this.setState({
            gender: '',
            race: '',
            age: 0,
            householdIncome: 0,
            employmentStatus: 0,
            phoneNumber: '',
            email: '',
            company: '',
            academicStanding: 0,
            major: '',
            minor: '',
            gpa: 0,
            interviewPreparationTime: 0,
            skills: [],
            profilePicture: null
        });
    };

    change = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        return(
            <div>
                <h1>Enter in your Information</h1>
                <form>
                    <h3>Personal Information</h3>
                    <select name="race" onChange={e => this.change(e)}>
                        <option value="">---</option>
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                        <option value="Hispanic or Latino">Hispanic or Latino</option>
                        <option value="Native American">Native American</option>
                        <option value="Asian">Asian</option>
                        <option value="Pacific Islander">Pacific Islander</option>
                        <option value="Other">Other</option>
                    </select>
                    <select name="gender" onChange={e => this.change(e)}>
                        <option value="">---</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <br />
                    <input 
                    name="age"
                    placeholder='Age'
                    value={this.state.age}
                    onChange={e => this.change(e)} 
                    />
                    <input 
                    name="householdIncome"
                    placeholder='Household Income'
                    value={this.state.householdIncome}
                    onChange={e => this.change(e)} 
                    />
                    <input 
                    name="employmentStatus"
                    placeholder='Employment Status'
                    value={this.state.employmentStatus}
                    onChange={e => this.change(e)} 
                    />
                    <br />
                    <input 
                    name="phoneNumber"
                    placeholder='Phone Number'
                    value={this.state.phoneNumber}
                    onChange={e => this.change(e)} 
                    />
                    <input 
                    name="email"
                    placeholder='Email'
                    value={this.state.email}
                    onChange={e => this.change(e)} 
                    />
                    <br />
                    <input 
                    type="file"
                    onChange={this.fileChangedHandler} 
                    />
                    <h3>Professional Information</h3>
                    <input 
                    name="company"
                    placeholder='Company'
                    value={this.state.company}
                    onChange={e => this.change(e)} 
                    />
                    <br />
                    <input 
                    name="academicStanding"
                    placeholder='Academic Standing'
                    value={this.state.academicStanding}
                    onChange={e => this.change(e)} 
                    />
                    <input 
                    name="major"
                    placeholder='Major'
                    value={this.state.major}
                    onChange={e => this.change(e)} 
                    />
                    <input 
                    name="minor"
                    placeholder='Minor'
                    value={this.state.minor}
                    onChange={e => this.change(e)} 
                    />
                    <input 
                    name="gpa"
                    placeholder='GPA'
                    value={this.state.gpa}
                    onChange={e => this.change(e)} 
                    />
                    <input 
                    name="interviewPreparationTime"
                    placeholder='Interview Preparation Time'
                    value={this.state.interviewPreparationTime}
                    onChange={e => this.change(e)} 
                    />
                    <br />
                    <button onClick={e => this.onSubmit(e)}>Submit</button>
                </form>
            </div>
        );
    }
}

export default NewProfileForm;