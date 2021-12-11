import { checkLogin } from "actions/AuthAction";
import { loginUser } from "actions/AuthAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import Logo from "../../assets/img/logoUtama.svg";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(checkLogin(this.props.history));
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();

    if (email && password) {
      //action login
      this.props.dispatch(loginUser(email, password));
    } else {
      swal("Failed", "Maaf Email dan Password Harus Diisi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { loginResult, checkLoginResult } = this.props;

    if (checkLoginResult && prevProps.checkLoginResult !== checkLoginResult) {
      this.props.history.push("/admin/dashboard");
    }

    if (loginResult && prevProps.loginResult !== loginResult) {
      this.props.history.push("/admin/dashboard");
    }
  }

  render() {
    const { email, password } = this.state;
    const { loginLoading } = this.props;
    return (
      <Row className="justify-content-center mt-5">
        <Col md="4" className="mt-5">
          <img src={Logo} className="rounded mx-auto d-block" alt="logo" />
          <Card>
            <CardHeader tag="h4">Login</CardHeader>
            <CardBody>
              <form onSubmit={(event) => this.handleSubmit(event)}>
                <FormGroup>
                  <Label for="email">Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={(event) => this.handleChange(event)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(event) => this.handleChange(event)}
                  />
                </FormGroup>

                {loginLoading ? (
                  <Button color="primary" type="submit" disabled>
                    <Spinner size="sm" color="light" /> Loading
                  </Button>
                ) : (
                  <Button color="primary" type="submi">
                    Login
                  </Button>
                )}
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,

  checkLoginResult: state.AuthReducer.checkLoginResult
});

export default connect(mapStateToProps, null)(Login);
