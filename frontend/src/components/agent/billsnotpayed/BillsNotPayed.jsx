import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Axios from "axios";
import "./BillsNotPayed.css";

const BillsNotPayed = () => {
  const [bills, setbills] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await Axios.get("/bills/notpayed");
      setbills(data);
    };
    fetchdata();
  }, []);

  return (
    <div className="bills-not-payed">
      <h1>all bills not payed</h1>
      <Table borderless hover>
        <thead>
          <tr>
            <th>reference</th>
            <th>username</th>
            <th>date</th>
            <th>payement</th>
            <th>price</th>
            <th>billing adress</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr>
              <Link className="bill-id">
                <td>{bill.reference}</td>
              </Link>
              <td>{bill.username}</td>
              <td>{bill.date.slice(0, 10)}</td>
              <td>{bill.payementMedthod}</td>
              <td>{bill.price}</td>
              <td>
                {`${bill.billingAdress.postalCode} ${bill.billingAdress.street}
                ${bill.billingAdress.city} ${bill.billingAdress.state}`}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BillsNotPayed;
