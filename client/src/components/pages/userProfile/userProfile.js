import React from 'react';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import DefaultUserPic from "../../../assets/images/userprof.gif";
const axios = require('axios');

class UserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:this.props.name,
            username:this.props.username,
            email:this.props.email,
            profileImage:this.props.profileImage,
            uploadedFile:null
        }
    }

    fetchUserDetails=()=>{
        //console.log(user_id);
        axios.get("http://localhost:8000/"+this.props.match.params.id)
        .then(res=>{
            this.setState({
                name: res.data.name,
                username: res.data.username,
                email: res.data.email            
            })
        })
        .catch(function (error) {
            console.log(error);
          })
    }

    changeProfileImage=(event)=>{
        this.setState({uploadedFile:event.target.files[0]});
    }

    UpdateProfileHandler=(e)=>{
        e.preventDefault();
        //create object of form data
        const formData=new FormData();
        formData.append("profileImage",this.state.uploadedFile);
        formData.append("id",this.state.id);

        //update-profile
        axios.post("http://localhost:8000/update-profile/",formData,{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
           this.setState({msg:res.data.message});
           this.setState({profileImage:res.data.results.profileImage});
        })
        .catch(err=>console.log(err))
    }


    componentDidMount(){
     this.fetchUserDetails(this.state.id);
    }

render(){

    if(this.state.profileImage){
        var imagestr=this.state.profileImage;
        imagestr = imagestr.replace("assets/images", "");
        var profilePic = "http://localhost:8000/"+imagestr;
    }else{
         profilePic = DefaultUserPic;
    }
    return (
    <Container style=
    {{ 
        fontColor: "black", 
        paddingLeft: "270px", 
        paddingRight: "10px", 
        marginTop:"100px" 
    }}>
     <Row>
       <Col>
           <img src={profilePic} alt="profils pic" />
            <h1 style={{ paddingLeft: "35px"}}>User Profile</h1>

    <Form className="form">

        <Form.Group controlId="formCategory1">
            <Form.Label style={{ color: "black"}}>
                Name
            </Form.Label>
            <Form.Control type="text" defaultValue={this.state.name}/>
        </Form.Group>

        <Form.Group controlId="formCategory1">
            <Form.Label style={{ color: "black"}}>
                Username
            </Form.Label>
            <Form.Control type="text" defaultValue={this.state.username}/>
        </Form.Group>
        <Form.Group controlId="formCategory2">
            <Form.Label style={{ color: "black"}}>
                Email
            </Form.Label>
            <Form.Control type="email" defaultValue={this.state.email} />
        </Form.Group>
        
        <Form.Group style={{ color: "black", paddingLeft: "100px"}} controlId="formCategory4">
            <Form.Label style={{ color: "black", paddingLeft: "100px"}}>
                Profile Image
            </Form.Label>
            <Form.Control style={{ color: "black", paddingLeft: "100px"}} type="file" name="profileImage" onChange={this.changeProfileImage}/>
            </Form.Group>
        
        <Button style={{ justifySelf:"center"}} variant="primary" onClick={this.UpdateProfileHandler}>
            Update Profile
        </Button>
    </Form>
    </Col>

    </Row>
</Container>
    )
}
}

const mapStatetoProps=(state)=>{
    return{ 
        name:state.user.name,
        username:state.user.userDetails.username,
        email:state.user.email,
        profileImage: state.user.profileImage
    }
   }
   
   

export default UserProfile;