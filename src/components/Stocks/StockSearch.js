// ** Reactstrap Imports
import { Col, Input } from 'reactstrap'

// ** Store & Actions


const StockSearch = () => {

  return (
    <Col sm={8}>
        <Input
        className="form-control"
        id="search-form"
        name="search"
        placeholder={new URLSearchParams(window.location.search).get('search')}
        minLength={1}
        maxLength={15}
        pattern="^[A-Z]{1,15}$"
        type="search"
        required
        />
    </Col>
  )
}

export default StockSearch
