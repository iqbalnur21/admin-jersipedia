import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { numberWithCommas } from "utils";

export default class Pesanans extends Component {
  render() {
    const { pesanans } = this.props;
    return (
      <div>
        {Object.keys(pesanans).map((key, index) => {
          return (
            <Row key={key}>
              <Col md={2}>
                <img
                  src={pesanans[key].product.gambar[0]}
                  width="200"
                  alt={pesanans[key].product.nama}
                />
              </Col>

              <Col md={5}>
                  <p>{pesanans[key].product.nama}</p>
                  <p>Rp. {numberWithCommas(pesanans[key].product.harga)}</p>
              </Col>

              <Col md={5}>
                  <p>Pesan : {pesanans[key].jumlahPesan}</p>
                  <p>Total Harga : Rp. {numberWithCommas(pesanans[key].totalHarga)}</p>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}
