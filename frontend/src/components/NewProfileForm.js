import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';

class NewProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            selectedFiles: null
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
            selectedFile: event.target.files[0]
        });
    };

    fileUploadHandler = () => {
        const data = new FormData();
        if(this.state.selectedFile) {
            data.append('profilePicture', this.state.selectedFile, this.state.selectedFile.name);
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
                            this.ocShowAlert('Max size: 2MB', 'red');
                        } 
                        else {
                            this.ocShowAlert(res.data.error, 'red');
                        }
                    } 
                    else {
                        this.ocShowAlert('File Uploaded', '#3089cf');
                    }
                }
            }).catch((error) => {
                this.ocShowAlert(error, 'red');
            });
        } 
        else {
            this.ocShowAlert('Please upload file', 'red');
        }
    };

    render() {
        return(
            <div>
                <form>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
                        <Grid container xs={12} spacing={1}>
                            <Grid item>
                                <TextField label="Major" variant="outlined" />
                            </Grid>
                            <Grid item>
                                <TextField label="Minor" variant="outlined" />
                            </Grid>
                            <Grid item>
                                <TextField label="GPA" variant="outlined" style={{width: '50%'}} />
                            </Grid>
                        </Grid>
                        <Grid container xs={12} spacing={1}>
                            <Grid item>
                                <TextField label="Academic Standing" variant="outlined" style={{width: '75%'}} />
                            </Grid>
                            <Grid item sm={5}>
                                <TextField label="Skills" variant="outlined" style={{width: '25%'}} />
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField label="Company" variant="outlined" />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField label="Employment Status" variant="outlined" />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField label="Interview Preparation Time" variant="outlined" />
                        </Grid>
                    </Grid>
                </form>
                {/*<Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Upload Profile Picture
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                    <Button variant="contained" component="label">
                        <input type="file" onChange={this.fileChangedHandler}/>
                    </Button>
                    <input type="file" onChange={this.fileChangedHandler}/>
                    <Button size="small" color="primary" onClick={this.fileUploadHandler}>
                        Save
                    </Button>
                    </CardActions>
                </Card>*/}
                {/*<div id="oc-alert-container"></div>*/}
                {/*<div className="card border-light mb-3 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
                    {/*<div className="card-header">
                        <h6 style={{ color: '#555', marginLeft: '12px' }}>Image Upload</h6>
                        <p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 250px x 250px (Maximum Size: 2 MB)</p>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Please upload a profile picture</p>
                        <input type="file" onChange={this.fileChangedHandler}/>
                        <div className="mt-6">
                            <button className="btn btn-info" onClick={this.fileUploadHandler}>Upload Image</button>
                        </div>
                    </div>
                </div>*/}
            </div>
        );
    }
}

export default NewProfileForm;