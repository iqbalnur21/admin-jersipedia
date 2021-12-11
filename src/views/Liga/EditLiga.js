import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import { updateLiga, getDetailLiga } from "actions/LigaAction";
import DefaultImage from "../../assets/img/default-image.jpg";


class EditLiga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      imageLama: DefaultImage,
      image: DefaultImage,
      imageToDB: false,
      namaLiga: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getDetailLiga(this.props.match.params.id));
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(gambar),
        imageToDB: gambar,
      });
    }
  };

  handleSubmit = (event) => {
    const { namaLiga } = this.state;
    event.preventDefault();
    if (namaLiga) {
      //proses lanjut ke action firebase
      this.props.dispatch(updateLiga(this.state));
    } else {
      //alert
      swal("Failed!", "Maaf Nama Liga harus diisi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { updateLigaResult, getDetailLigaResult } = this.props;

    if (updateLigaResult && prevProps.updateLigaResult !== updateLigaResult) {
      swal("Sukses", "Liga Sukses Diupdate", "success");
      this.props.history.push("/admin/liga");
    }

    if (getDetailLigaResult && prevProps.getDetailLigaResult !== getDetailLigaResult) {
      this.setState({
        image: getDetailLigaResult.image,
        namaLiga: getDetailLigaResult.namaLiga,
        imageLama: getDetailLigaResult.image,
      })
    }
  }

  render() {
    const { image, namaLiga } = this.state;
    const { updateLigaLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/liga" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Edit Liga</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <img src={image} width="200" alt="Logo Liga" />
                  </Col>
                </Row>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Logo Liga</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Liga</label>
                        <Input
                          type="text"
                          value={namaLiga}
                          name="namaLiga"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {updateLigaLoading ? (
                        <Button color="primary" type="submit" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <Button color="primary" type="submit">
                          Submit
                        </Button>
                      )}
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  updateLigaLoading: state.LigaReducer.updateLigaLoading,
  updateLigaResult: state.LigaReducer.updateLigaResult,
  updateLigaError: state.LigaReducer.updateLigaError,

  getDetailLigaLoading: state.LigaReducer.getDetailLigaLoading,
  getDetailLigaResult: state.LigaReducer.getDetailLigaResult,
  getDetailLigaError: state.LigaReducer.getDetailLigaError,
});

export default connect(mapStateToProps, null)(EditLiga);
