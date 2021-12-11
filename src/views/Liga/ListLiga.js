import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Button,
  Spinner,
} from "reactstrap";
import { getListLiga, deleteLiga } from "actions/LigaAction";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class ListLiga extends Component {
  componentDidMount() {
    this.props.dispatch(getListLiga());
  }

  removeData = (image, id) => {
    //akses ke action
    this.props.dispatch(deleteLiga(image, id)) 
  };

  componentDidUpdate(prevProps) {
    const { deleteLigaResult } = this.props;

    if(deleteLigaResult && prevProps.deleteLigaResult !== deleteLigaResult) {
      swal("Sukses!", deleteLigaResult, "success");
      this.props.dispatch(getListLiga());
    }
  }

  render() {
    const {
      getListLigaError,
      getListLigaLoading,
      getListLigaResult,
    } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Liga</CardTitle>
                <Link
                  to="/admin/liga/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Liga
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Logo</th>
                      <th>Nama Liga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListLigaResult ? (
                      Object.keys(getListLigaResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListLigaResult[key].image}
                              width="100"
                              alt={getListLigaResult[key].namaLiga}
                            />
                          </td>
                          <td>{getListLigaResult[key].namaLiga}</td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/liga/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>

                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() =>
                                this.removeData(
                                  getListLigaResult[key].image,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-basket"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getListLigaLoading ? (
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListLigaError ? (
                      <tr>
                        <td colSpan="3" align="center">
                          {getListLigaError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="3" align="center">
                          Data Kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
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

  deleteLigaLoading: state.LigaReducer.deleteLigaLoading,
  deleteLigaResult: state.LigaReducer.deleteLigaResult,
  deleteLigaError: state.LigaReducer.deleteLigaError,
});

export default connect(mapStateToProps, null)(ListLiga);
