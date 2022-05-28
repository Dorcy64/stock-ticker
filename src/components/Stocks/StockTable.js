import React from 'react'
import {Table, Card} from 'reactstrap'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    stockCard: {
        display: "flex",
        padding: 0,
        border: 0,
        borderRadius: ".25rem",
        overflow: "hidden",
        boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
    },
    stockTable: {
        margin: 0,
        border: 0,
        borderRadius: "1%"
    },
    stockTableHead: {
        backgroundColor: "white",
        padding: "20px",
    }
}))

export default function StockTable(props) {
    const classes = useStyles()


    const {price_mean, price_max, price_min, volume_mean, volume_max, volume_min} = props
    
    return (
    <Card className={classes.stockCard}>
        <Table className={classes.stockTable}>
            <thead className="table-primary">
                <tr>
                    <th>
                        Item
                    </th>
                    <th>
                        Maximum
                    </th>
                    <th>
                        Minimum
                    </th>
                    <th>
                        Average
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">
                        Price
                    </th>
                    <td>
                        ${price_max}
                    </td>
                    <td>
                        ${price_min}
                    </td>
                    <td>
                        ${price_mean}
                    </td>
                </tr>
                <tr>
                    <th scope="row" className="border-0">
                        Volume
                    </th>
                    <td className="border-0">
                        {volume_max}
                    </td>
                    <td className="border-0">
                        {volume_min}
                    </td>
                    <td className="border-0">
                        {volume_mean}
                    </td>
                </tr>
            </tbody>
        </Table>
    </Card>
    )
}
