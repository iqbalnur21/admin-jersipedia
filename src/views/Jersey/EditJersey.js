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
import { getListLiga } from "../../actions/LigaAction";

class EditJersey extends Component {
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
    this.props.dispatch(getDetailJersey(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    const {
      uploadJerseyResult,
      updateJerseyResult,
      getDetailJerseyResult,
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
      getDetailJerseyResult &&
      prevProps.getDetailJerseyResult !== getDetailJerseyResult
    ) {
      this.setState({
        image1: getDetailJerseyResult.gambar[0],
        image2: getDetailJerseyResult.gambar[1],
        imageLama1: getDetailJerseyResult.gambar[0],
        imageLama2: getDetailJerseyResult.gambar[1],
        nama: getDetailJerseyResult.nama,
        harga: getDetailJerseyResult.harga,
        berat: getDetailJerseyResult.berat,
        jenis: getDetailJerseyResult.jenis,
        ukuranSelected: getDetailJerseyResult.ukuran,
        ready: getDetailJerseyResult.ready,
        liga: getDetailJerseyResult.liga,
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
    const {
      berat,
      harga,
      nama,
      liga,
      ukuranSelected,
      jenis,
    } = this.state;

    event.preventDefault();

    if (
      nama &&
      liga &&
      harga &&
      berat &&
      ukuranSelected &&
      jenis 
    ) {
      //action
      this.props.dispatch(updateJersey(this.state)); 
    } else {
      swal("Failed", "Maaf semua form wajib diisi", "error");
    }
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
    const { getListLigaResult, updateJerseyLoading } = this.props;

    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/jersey" className="btn btn-primary">
              Back
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader tag="h4">Edit Service</CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col>
                          <img
                            src={image1}
                            width="300"
                            alt="Service Picture"
                          />
                          <FormGroup>
                            <label>Service Icon</label>
                            <Input
                              type="file"
                              name="image1"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDB1")
                              }
                            />
                          </FormGroup>
                          {image1 !== imageLama1 ? (
                            //selesai upload / proses upload
                            imageToDB1 ? (
                              <p>
                                <i className="nc-icon nc-check-2"></i> Upload 
                                Finish
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run"></i> Upload In 
                                Process
                              </p>
                            )
                          ) : (
                            //belum upload
                            <p>
                              <i className="nc-icon nc-cloud-upload-94"></i>{" "}
                              Upload Pending
                            </p>
                          )}
                        </Col>
                        <Col>
                          {/* <img
                            src={image2}
                            width="300"
                            alt="Foto Jersey (Belakang)"
                          /> */}
                          {/* <FormGroup>
                            <label>Foto Jersey (Belakang)</label>
                            <Input
                              type="file"
                              name="image2"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDB2")
                              }
                            />
                          </FormGroup> */}
                          {/* {image2 !== imageLama2 ? (
                            //selesai upload / proses upload
                            imageToDB2 ? (
                              <p>
                                <i className="nc-icon nc-check-2"></i> Selesai
                                Upload
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run"></i> Proses
                                Upload
                              </p>
                            )
                          ) : (
                            //belum upload
                            <p>
                              <i className="nc-icon nc-cloud-upload-94"></i>{" "}
                              Belum Upload
                            </p>
                          )} */}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Service Name</label>
                        <Input
                          type="text"
                          value={nama}
                          name="nama"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Price (Rp.)</label>
                            <Input
                              type="number"
                              value={harga}
                              name="harga"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                          {/* <FormGroup>
                            <label>Liga</label>
                            <Input
                              type="select"
                              name="liga"
                              value={liga}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value="">--Pilih--</option>
                              {Object.keys(getListLigaResult).map((key) => (
                                <option value={key} key={key}>
                                  {getListLigaResult[key].namaLiga}
                                </option>
                              ))}
                            </Input>
                          </FormGroup> */}
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Status</label>
                            <Input
                              type="select"
                              name="ready"
                              value={ready}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value={true}>Ready</option>
                              <option value={false}>Not in Service</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        {/* <Col md={6}>
                          <FormGroup>
                            <label>Weight (kg)</label>
                            <Input
                              type="number"
                              value={berat}
                              name="berat"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col> */}
                        {/* <Col md={6}>
                          <FormGroup>
                            <label>Jenis</label>
                            <Input
                              type="text"
                              value={jenis}
                              name="jenis"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col> */}
                      </Row>

                      <Row>
                        {/* <Col md={6}>
                          <label>
                            Weight : (
                            {ukuranSelected.map((item, index) => (
                              <strong key={index}> {item} </strong>
                            ))}
                            )
                          </label>
                          {editUkuran ? (
                            <>
                              <FormGroup check>
                                {ukurans.map((ukuran, index) => (
                                  <Label key={index} check className="mr-2">
                                    <Input
                                      type="checkbox"
                                      value={ukuran}
                                      onChange={(event) =>
                                        this.handleCheck(event)
                                      }
                                    />
                                    {ukuran}
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                ))}
                              </FormGroup>
                              <Button
                                color="primary"
                                size="sm"
                                onClick={() =>
                                  this.setState({ editUkuran: false })
                                }
                              >
                                Weight Edit Finish
                              </Button>
                            </>
                          ) : (
                            <Button
                              color="primary"
                              size="sm"
                              onClick={() => this.editUkuran()}
                            >
                              Edit Weight
                            </Button>
                          )}
                        </Col> */}
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {updateJerseyLoading ? (
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

  uploadJerseyLoading: state.JerseyReducer.uploadJerseyLoading,
  uploadJerseyResult: state.JerseyReducer.uploadJerseyResult,
  uploadJerseyError: state.JerseyReducer.uploadJerseyError,

  getDetailJerseyLoading: state.JerseyReducer.getDetailJerseyLoading,
  getDetailJerseyResult: state.JerseyReducer.getDetailJerseyResult,
  getDetailJerseyError: state.JerseyReducer.getDetailJerseyError,

  updateJerseyLoading: state.JerseyReducer.updateJerseyLoading,
  updateJerseyResult: state.JerseyReducer.updateJerseyResult,
  updateJerseyError: state.JerseyReducer.updateJerseyError,
});

export default connect(mapStateToProps, null)(EditJersey);
