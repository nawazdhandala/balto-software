import React, { Component } from 'react';
import {
  Button,
  ButtonDropdown,
  Pagination,
  PaginationLink,
  PaginationItem,
  Input,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      skip: 0,
      limit: 5
    };
  }

  componentDidMount(){
    this.loadMovies();
  }

  async loadMovies(){
    try {
      var response = await axios.get(`/api/movie?skip=${this.state.skip}&limit=${this.state.limit}`);
      this.setState({data: response.data});
    } catch (e) {
      this.setState({ error: "Unable to save. Please try again" });
    }
  }

  editItem(item){
    window.location.href="#/edit/"+item.id;
  }

  async deleteItem(item){
    try {
      
      await axios.delete("/api/movie/"+item.id);
      this.loadMovies();
    } catch (e) {
      this.setState({ error: "Unable to save. Please try again" });
    }
  }

  async nextPage(){
    const {skip, limit, search} = this.state;
    this.setState({skip: skip+limit},()=>{
      if(!search){
        this.loadMovies();
      }else{
        this.search(search);
      }
    });

  }

  async previousPage(){
    const {skip, limit, search} = this.state;
    this.setState({skip: skip-limit},()=>{
      if(!search){
        this.loadMovies();
      }else{
        this.search(search);
      }
    });
  }


  async search(e){
    var searchText = e && e.target ? e.target.value : e;
    var skip = this.state.skip;
    if(!searchText){
      this.setState({skip: 0, search: null}, ()=>{
        this.loadMovies();
      })
    }else{
      if(!this.state.search){
        skip = 0;
      }

      var response = await axios.get(`/api/movie/search?name=${searchText}&skip=${this.state.skip}&limit=${this.state.limit}`);
      this.setState({data: response.data, skip, search: searchText});
      
    }
  }

  render() {
    const {data} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Input style={{width:"200px"}} placeholder="Search" onChange={this.search.bind(this)} /> 
        </Row>
        <Row>
          <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">
              <tr>
                <th>Movie</th>
                <th className="text-center">More Info</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 && data.map((item)=>{
                return (<tr>
                  <td>
                    <div>{item.title}</div>
                    <div className="small text-muted">
                      <span> {item.plot}</span> | Registered: Jan 1, 2015
                        </div>
                  </td>
                  <td>
                    <div>Release Year: {item.releaseYear}</div>
                    <div>Cast : {item.cast}</div>
                    <div>Directors : {item.director}</div>
                    <div>Wiki : {item.wiki}</div>
                    <div>Origin : {item.origin}</div>
                    <Button block color="primary" onClick={this.editItem.bind(this, item)}>Edit</Button>
                    <Button block color="danger" onClick={this.deleteItem.bind(this, item)}>Delete</Button>
                  </td>
                  
                </tr>)
              })}
            </tbody>
           
          </Table>
          <div stye={{display:"flex", alignContent:"right"}}>
           <Pagination>
              {this.state.skip > 0 && <PaginationItem>
                <PaginationLink onClick={this.previousPage.bind(this)} previous tag="button" />
              </PaginationItem>}
              <PaginationItem>
                <PaginationLink onClick={this.nextPage.bind(this)} next tag="button" />
              </PaginationItem>
            </Pagination>
            </div>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
