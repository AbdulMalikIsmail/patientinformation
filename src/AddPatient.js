import React, { Component } from 'react';
import { Button, Form, Container, TextArea, Input, Header, Message, Table, Menu, Segment,Modal } from 'semantic-ui-react'

//A View to to submit Patient Data and store in Database
class AddPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            age: '',
            dob: '',
            gender: 'Male',
            phone: '',
            additionalInfo: '',
            errFname: false,
            errAge: false,
            errLname: false,
            errPhone: false,
            open:false
        };
        
        this.handle = this.handle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    




    //Handle highlighting/Un-HIglighting of the fields in case of changing in input
    handleChange(event) {
        const fieldName = event.target.name
        const fieldValue = event.target.value
        switch (fieldName) {
            case "phone":
                this.setState({ errPhone: false })
                break
            case "firstname":
                this.setState({ errFname: false })
                break
            case "lastname":
                this.setState({ errLname: false })
                break
            case "age":
                this.setState({ errAge: false}) 
                break 
            case "AlertOK":
                this.setState({open:false})      
        }
        this.setState({ [fieldName]: fieldValue });
    }
    //Handle the submit of the form to the databse by calling API
    handleSubmit(event) {
        event.preventDefault();
        var json = {
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            age:this.state.age,
            gender:this.state.gender,
            phone:this.state.phone,
            additionalInfo:this.state.additionalInfo,
            dob:this.state.dob
        }
            fetch('https://patientinfoapi.herokuapp.com', {
                method: 'POST',
                body : JSON.stringify(json)
            }).then(response=>{
                this.setState({open:true})
                   // alert('A name was submitted: ' + this.state.firstname + ' with age ' + this.state.age);
                })
        }

        //Handle Validation of fields
    handle(event) {
        const fieldName = event.target.name
        const fieldValue = event.target.value

        switch (fieldName) {
            case "phone":
                let regexForPhone = /^[1-9]\d{9}$/
                if (!(regexForPhone.test(this.state.phone))) {
                    this.setState({ errPhone: true })
                }
                break
            case "firstname":
                let regexForFname = /^([a-zA-Z]{1,30}\s*)+$/
                if (!(regexForFname.test(this.state.firstname))) {
                    this.setState({ errFname: true })
                }
                break

            case "lastname":
                let regexForLname = /^([a-zA-Z]{1,30}\s*)+$/
                if (!(regexForLname.test(this.state.lastname))) {
                    this.setState({ errLname: true })
                }
                break

            case "age":
                if (this.state.age < 0 || this.state.age > 200 ){
                    this.setState({ errAge: true})
                } 
                break
        }
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Input label='First Name' placeholder='First Name' type='text' name="firstname" value={this.state.firstname} onChange={this.handleChange} maxLength="16" onBlur={this.handle} required error={this.state.errFname} />

                    <Form.Input label='Last Name' placeholder='Last Name' type='text' name="lastname" value={this.state.lastname} onChange={this.handleChange} onBlur={this.handle} maxLength="16" required error={this.state.errLname} />

                    <Form.Input label='Age' type="number" placeholder='Age' name="age" value={this.state.age} onChange={this.handleChange} min={0} max={200} error={this.state.errAge} onBlur={this.handle} required />

                    <Form.Input label='Date of Birth' type="date" name="dob" value={this.state.dob} onChange={this.handleChange} required />

                    <Form.Field label='Gender' control='select' value={this.state.gender} onChange={this.handleChange} name="gender" required>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </Form.Field>

                    <Form.Field required error={this.state.errPhone}>
                        <label>Contact No.</label>
                        <Input label='+91' type="text" name="phone" value={this.state.phone} onChange={this.handleChange} maxLength="10" onBlur={this.handle} required />
                    </Form.Field>

                    <Form.Field name="additionalInfo" control={TextArea} label='Additional Information' onChange={this.handleChange} value={this.state.additionalInfo} placeholder='Additional Information' />
                    
                    <Button type="submit" floated='right' positive >Submit</Button>
                    <br/><br/>
                    </Form>

                    <Modal size='mini' open={this.state.open} onClose={this.close}>
          <Modal.Header>
          Successfully Stored
          </Modal.Header>
          <Modal.Content>
            <p>Details of {this.state.firstname} {this.state.lastname} added successfully </p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive  content='OK' name="AlertOK" onClick={this.handleChange}/>
          </Modal.Actions>
        </Modal>
                    
                
            </Container>
        )
    }

}


export default AddPatient