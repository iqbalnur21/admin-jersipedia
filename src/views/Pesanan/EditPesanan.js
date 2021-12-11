import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import DefaultImage from "../../assets/img/default-image.jpg";
import {
  getDetailJersey,
  updateJersey,
  uploadJersey,
} from "../../actions/JerseyAction";
import {
  getListPesanan,
  updatePesanan,
} from "../../actions/PesananAction";
import { getListLiga } from "../../actions/LigaAction";

class EditPesanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      image1: DefaultImage,
      image2: DefaultImage,
      imageToDB1: false,
      imageToDB2: false,
      imageLama1: false,
      imageLama2: false,
      nama: "",
      harga: 0,
      berat: 0,
      jenis: "",
      ukurans: ["S", "M", "L", "XL", "XXL"],
      ukuranSelected: [],
      ready: true,
      liga: "",
      editUkuran: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getListLiga());
    this.props.dispatch(getListPesanan(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    const {
      uploadJerseyResult,
      updateJerseyResult,
      getListPesananResult,
    } = this.props;

    if (
      uploadJerseyResult &&
      prevProps.uploadJerseyResult !== uploadJerseyResult
    ) {
      this.setState({
        [uploadJerseyResult.imageToDB]: uploadJerseyResult.image,
      });

      swal("Success", "Success to Upload Picture", "success");
    }

    if (
      updateJerseyResult &&
      prevProps.updateJerseyResult !== updateJerseyResult
    ) {
      swal("Sukses", updateJerseyResult, "success");
      this.props.history.push("/admin/jersey");
    }

    if (
      getListPesananResult &&
      prevProps.getListPesananResult !== getListPesananResult
    ) {
      this.setState({
        image1: getListPesananResult.gambar[0],
        image2: getListPesananResult.gambar[1],
        imageLama1: getListPesananResult.gambar[0],
        imageLama2: getListPesananResult.gambar[1],
        nama: getListPesananResult.nama,
        harga: getListPesananResult.harga,
        berat: getListPesananResult.berat,
        jenis: getListPesananResult.jenis,
        ukuranSelected: getListPesananResult.ukuran,
        ready: getListPesananResult.ready,
        liga: getListPesananResult.liga,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    if (checked) {
      //jika user ceklis ukuran
      //isi state array ukuran selected
      this.setState({
        ukuranSelected: [...this.state.ukuranSelected, value],
      });
    } else {
      //jika user menghapus ceklis ukuran
      const ukuranBaru = this.state.ukuranSelected
        .filter((ukuran) => ukuran !== value)
        .map((filterUkuran) => {
          return filterUkuran;
        });

      this.setState({
        ukuranSelected: ukuranBaru,
      });
    }
  };

  handleImage = (event, imageToDB) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        [event.target.name]: URL.createObjectURL(gambar),
      });

      this.props.dispatch(uploadJersey(gambar, imageToDB));
    }
  };

  handleSubmit = (event) => {

    event.preventDefault();
    
    const {
      berat,
      harga,
      nama,
      liga,
      ukuranSelected,
      jenis,
      ready,
      id
    } = this.state;

    const payload = {
      id,
      berat,
      harga,
      nama,
      liga,
      ukuranSelected,
      jenis,
      statusCuci : ready
    }
    console.log(payload)
    // if (
    //   nama &&
    //   liga &&
    //   harga &&
    //   berat &&
    //   ukuranSelected &&
      // ready 
    // ) {
    //   //action
      this.props.dispatch(updatePesanan(this.state)); 
    // } 
    // else {
    //   swal("Failed", "Maaf semua form wajib diisi", "error");
    // }
  };

  editUkuran = () => {
    this.setState({
      editUkuran: true,
      ukuranSelected: []
    });
  };

  render() {
    const {
      berat,
      harga,
      image1,
      image2,
      imageToDB1,
      imageToDB2,
      jenis,
      liga,
      nama,
      ready,
      ukurans,
      ukuranSelected,
      editUkuran,
      imageLama1,
      imageLama2
    } = this.state;
    const { getListLigaResult, updatePesananLoading } = this.props;

    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/pesanan" className="btn btn-primary">
              Back
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader tag="h4">Edit Status</CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Status</label>
                            <Input
                              type="select"
                              name="ready"
                              value={ready}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value={true}>Washing</option>
                              <option value={false}>Finish</option>
                            </Input>
                          </FormGroup>
                  <Row>
                    <Col>
                      {updatePesananLoading ? (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                          disabled
                        >
                          <Spinner size="sm" color="light" /> Loading . . .
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                        >
                          Submit
                        </Button>
                      )}
                    </Col>
                  </Row>
                        </Col>
                      </Row>
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
  getListLigaLoading: state.LigaReducer.getListLigaLoading,
  getListLigaResult: state.LigaReducer.getListLigaResult,
  getListLigaError: state.LigaReducer.getListLigaError,

  uploadPesananLoading: state.PesananReducer.uploadPesananLoading,
  uploadPesananResult: state.PesananReducer.uploadPesananResult,
  uploadPesananError: state.PesananReducer.uploadPesananError,

  getDetailPesananLoading: state.PesananReducer.getDetailPesananLoading,
  getDetailPesananResult: state.PesananReducer.getDetailPesananResult,
  getDetailPesananError: state.PesananReducer.getDetailPesananError,

  updatePesananLoading: state.PesananReducer.updatePesananLoading,
  updatePesananResult: state.PesananReducer.updatePesananResult,
  updatePesananError: state.PesananReducer.updateJerseyError,
});

export default connect(mapStateToProps, null)(EditPesanan);
