import React, { Component } from 'react';
import { Button, Checkbox, Form, Container, TextArea, Input, Header, Message, Table, Menu, Segment } from 'semantic-ui-react'
import TableView from './TableView'
import AddPatient from './AddPatient'
import DisplayList from './DisplayList'

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Add Patient',
      show: true
    };
  }




  handleItemClick = (e, { name }) => {
    switch (name) {
      case "Add Patient": this.setState({ show: true, activeItem: name })
        break
      case "Display Patient List": this.setState({ show: false, activeItem: name })
        break
    }
  }

  render() {

    return (
      <Container>
        <Header as='h1' textAlign='center'>Patient Information System</Header>
        <div>
          <Menu pointing secondary>
            <Menu.Item name='Add Patient' active={this.state.activeItem === 'Add Patient'} onClick={this.handleItemClick} />
            <Menu.Item name='Display Patient List' active={this.state.activeItem === 'Display Patient List'} onClick={this.handleItemClick} />
          </Menu>
          <Segment>

            {this.state.show
              ? <AddPatient />
              : <DisplayList />}

          </Segment>
        </div>
      </Container>
    );
  }
}

export default NameForm;
