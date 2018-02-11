import React, { Component } from 'react'
import TableView from './Table'
import {Loader,Table,Header} from 'semantic-ui-react' 
import TableComponent from './Table'

class DisplayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
           tableData :[]
        };
      
        const url = 'http://207.148.70.136'
        fetch(url,{method: 'GET'}).then((response)=>response.json())
        .then(response=>{
            this.setState({tableData: response})
        })
    }


    render(){
            return this.state.tableData.length ? <TableComponent tableData={this.state.tableData}/> : <Loader active inline='centered'/>       
        }
}
export default DisplayList