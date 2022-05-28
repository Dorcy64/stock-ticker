import { Form, FormGroup, Label, Col, Input } from 'reactstrap'
import StockSearch from './StockSearch'


const StockFrom = () => { 

  return (
    <div className="w-100">
      <Form>
        <FormGroup className="row remove-margin-bottom">
        <Label
          for="search-form"
          size="lg"
          className="text-center text-light justify-content-center px-0 py-1"
          sm={2}
        >
          Enter Stock
        </Label>
          <StockSearch></StockSearch>

          <Col sm={2}>
            <Input
              value="Search"
              placeholder="lg"
              type="submit"
              className="btn btn-primary form-control"
            />
          </Col>
          

        </FormGroup>
        </Form>
      </div>
  )
}
export default StockFrom
