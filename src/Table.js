import React from 'react'
import { Table, Header } from 'semantic-ui-react'
//Generate a Table for Patient List from the server
const TableComponent = ({ tableData }) => (
  <Table celled stackable compact='very'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>Gender</Table.HeaderCell>
        <Table.HeaderCell>Age</Table.HeaderCell>
        <Table.HeaderCell>Phone</Table.HeaderCell>
        <Table.HeaderCell>Date of Birth</Table.HeaderCell>
        <Table.HeaderCell>Additional Information</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {
        tableData.map(tableElement => {
          const { fisrtname, lastname, age,dob,gender,phone,serialNo,additionalInfo } = tableElement
          return (
            <Table.Row key={serialNo}>

              <Table.Cell collapsing>
                <Header.Content>
                  <Header.Subheader> {fisrtname}</Header.Subheader>
                </Header.Content>
              </Table.Cell>

              <Table.Cell collapsing>
                <Header.Content>
                  <Header.Subheader>{lastname}</Header.Subheader>
                </Header.Content>
              </Table.Cell>

              <Table.Cell collapsing>
                <Header.Content>
                  <Header.Subheader>{gender}</Header.Subheader>
                </Header.Content>
              </Table.Cell>

              <Table.Cell>
                <Header.Content>
                  <Header.Subheader>{age}</Header.Subheader>
                </Header.Content>
              </Table.Cell>

              <Table.Cell>
                <Header.Content>
                  <Header.Subheader>{phone}</Header.Subheader>
                </Header.Content>
              </Table.Cell>

              <Table.Cell>
                <Header.Content>
                  <Header.Subheader>{dob}</Header.Subheader>
                </Header.Content>
              </Table.Cell>

              <Table.Cell>
                <Header.Content>
                  <Header.Subheader>{additionalInfo}</Header.Subheader>
                </Header.Content>
              </Table.Cell>

            </Table.Row>
          )
        })
      }
    </Table.Body>
  </Table>
)

export default TableComponent