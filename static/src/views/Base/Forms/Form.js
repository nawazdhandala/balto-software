import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Alert
} from 'reactstrap';
import axios from 'axios';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  async componentDidMount() {
    if (this.props.match.params.id) {
      //edit - load item to the form. 
      var response = await axios.get("/api/movie/" + this.props.match.params.id);
      this.setState({ ...response.data });
    }
  }

  async handleSave() {
    try {
      const { title, origin, director, cast, plot, releaseYear, genre, wiki } = this.state;
      if (this.props.match.params.id) {
        //edit - load item to the form. 
        var response = await axios.put("/api/movie/" + this.props.match.params.id, {
          title, origin, director, cast, plot, releaseYear, genre, wiki
        }, { headers: { 'Content-Type': 'application/json' } });
        this.setState({ ...response.data });
      } else {
        //save form 
        await axios.post("/api/movie", {
          title, origin, director, cast, plot, releaseYear, genre, wiki
        }, { headers: { 'Content-Type': 'application/json' } });
      }

      window.location.href = "#/";
    } catch (e) {
      this.setState({ error: "Unable to save. Please try again" });
    }
  }

  render() {
    const isEdit = !!this.props.match.params.id;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>{isEdit ? "Edit" : "New"} Movie</strong>
              </CardHeader>
              <CardBody>
                {this.state.error && <Alert color="danger">
                  {this.state.error}
                </Alert>}
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Title</Label>
                      <Input onChange={(e) => {
                        this.setState({ title: e.target.value })
                      }} value={this.state.title} type="title" id="name" placeholder="Title" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Origin</Label>
                      <Input onChange={(e) => {
                        this.setState({ origin: e.target.value })
                      }} value={this.state.origin} type="text" placeholder="Origin" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Genre</Label>
                      <Input value={this.state.genre} type="text" placeholder="Genre" onChange={(e) => {
                        this.setState({ genre: e.target.value })
                      }} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Director</Label>
                      <Input type="text" placeholder="Director" onChange={(e) => {
                        this.setState({ director: e.target.value })
                      }} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Plot</Label>
                      <Input value={this.state.plot} type="textarea" placeholder="Plot" onChange={(e) => {
                        this.setState({ plot: e.target.value })
                      }} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Wiki Link</Label>
                      <Input value={this.state.wiki} type="text" placeholder="Wiki Link" onChange={(e) => {
                        this.setState({ wiki: e.target.value })
                      }} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Cast</Label>
                      <Input value={this.state.cast} type="text" placeholder="Wiki Link" onChange={(e) => {
                        this.setState({ cast: e.target.value })
                      }} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Release Year</Label>
                      <Input value={this.state.releaseYear} type="number" placeholder="Release Year" onChange={(e) => {
                        this.setState({ releaseYear: e.target.value })
                      }} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col col="10">

                  </Col>
                  <Col col="2">
                    <Button block color="primary" onClick={this.handleSave.bind(this)}>Save</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Forms;
