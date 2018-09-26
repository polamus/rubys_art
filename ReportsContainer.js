  import React, { Component } from 'react';
  // import Calendar from 'react-calendar';
  import {Row, Col, Label, FormGroup, Button} from "reactstrap";
  // import {PageTitle}  from 'sm_shared';
  import {AvForm, AvGroup, AvInput, AvField} from 'availity-reactstrap-validation';
  // import Select from 'react-select';
  import 'react-select/dist/react-select.css';
  import DatePicker from 'react-datepicker';
  import moment from 'moment';
  import Api          from '../api/Api';
  import VirtualizedSelect from 'react-virtualized-select'
  import 'react-select/dist/react-select.css'
  import 'react-virtualized/styles.css'
  import 'react-virtualized-select/styles.css'


  import {
  Avatar,
  Divider,
  List,
  ListItem,
  Subheader,
  TextField,
} from 'react-md';

  import 'react-datepicker/dist/react-datepicker.css';



  export default class ReportsContainer extends Component {
    constructor (props) {
      super(props)
      this.state = {
        manufacturer: 'New',

        periodOne: {startDate: moment().subtract(2, 'years').subtract(1, 'days'),
                    endDate: moment().subtract(1, 'years').subtract(1, 'days')},

        periodTwo: {startDate: moment().subtract(1, 'years'),
                    endDate: moment().subtract(1, 'days')},
        banners: ['Save Mart', 'Lucky', 'Food Maxx'],
        type: "Large Document Request",
        data: []
      };
      this.setPeriodOneStartDate = this.setPeriodOneStartDate.bind(this);
      this.setPeriodOneEndDate = this.setPeriodOneEndDate.bind(this);
      this.setPeriodTwoStartDate = this.setPeriodTwoStartDate.bind(this);
      this.setPeriodTwoendDate = this.setPeriodTwoendDate.bind(this);
      this.generateReport = this.generateReport.bind(this);
      this.isBannerChecked = this.isBannerChecked.bind(this);
      }


   componentDidMount() {
    if(this.props.authToken !== '' )
      Api.list(this.props.authToken)
      .then((response) => {
        if (response.data !== undefined)
          this.setState({
            data: response.data.map( (d) =>  d.attributes )
          });
      })
      .catch((e) => console.log(e));
    }

    setPeriodOneStartDate(date){
      var currentState = this.state.periodOne
      currentState.startDate = date
      this.setState({
        periodOne: currentState
      })
    }

    setPeriodOneEndDate(date){
      var currentState = this.state.periodOne
      currentState.endDate = date
      this.setState({
        periodOne: currentState
      })
    }

    setPeriodTwoStartDate(date){
      var currentState = this.state.periodTwo
      currentState.startDate = date
      this.setState({
        periodTwo: currentState
      })
    }

    setPeriodTwoendDate(date){
      var currentState = this.state.periodTwo
      currentState.endDate = date
      this.setState({
        periodTwo: currentState
      })
    }


    generateReport(){
        let body = {}
        body['periodOneStartDate'] = this.state.periodOne.startDate
      let periodOneStartDate =  this.state.periodOne.startDate
      let periodOneEndDate =  this.state.periodOne.endDate
      let periodTwoStartDate =  this.state.periodTwo.startDate
      let periodTwoEndDate =  this.state.periodTwo.endDate
      let manufacturerName = this.state.selectValue.mfgnm
      let manufacturerNum = this.state.selectValue.mfg

      Api.generateReport(this.props.authToken, periodOneStartDate, periodOneEndDate).then((response) => {

      })
      .catch((e) => console.log(e));

    }

    render() {

     let manufacturers = this.state.data
      return (
        <div>
          <Row>
            <Col md='6'>
              // <PageTitle title={ this.state.type} />
            </Col>
          </Row>
          <AvForm>
          <Col>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <h3> Banners </h3>
                    <FormGroup check>
                       <Label check inline md={2}>
                         <AvInput type='checkbox' value='Save Mart'  checked={this.isBannerChecked('Save Mart')} name="checkbox"/> Save Mart
                       </Label>
                       <Label check inline md={2}>
                         <AvInput type='checkbox' value='Lucky'  checked={this.isBannerChecked('Lucky')} name="checkbox"/> Lucky
                       </Label>
                       <Label check inline md={2}>
                         <AvInput type='checkbox' value='Food Maxx' checked={this.isBannerChecked('Food Maxx')} name="checkbox"/> Food Maxx
                       </Label>
                    </FormGroup>
                  </FormGroup>
                </Col>


                <Col md={6}>
                   <h3> Manufacturers </h3>
                   <VirtualizedSelect name="mfgnm"
                    labelKey='mfgnm'
                    valueKey= 'mfg'
                    options={manufacturers}
                    onChange={(selectValue) => this.setState({ selectValue })}
                    value={this.state.selectValue}
                    />
                </Col>
              </Row>
            </Col>
            <Divider/>
            <Col md={6}>
              <h3> Calendar </h3>
            </Col>
            <Col md={12}>
              <Row>
                <Col md={3}>
                  <h5> Period 1 </h5>
                </Col>
              </Row>
             
              <Row>
                <Col md='3'>
                  Start date
                  <DatePicker
                    placeholderText="Click to select a Start date"
                    isClearable={true}
                    selected={this.state.periodOne.startDate}
                    onChange={this.setPeriodOneStartDate}
                    minDate={moment("20150101")}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </Col>
                <Col md='3' >
                  End date
                 <DatePicker
                    placeholderText="Click to select a End date"
                    isClearable={true}
                    selected={this.state.periodOne.endDate}
                    onChange={this.setPeriodOneEndDate}
                    minDate={moment(this.state.periodOne.startDate).add(1, 'day')}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </Col>
              </Row>
              <Col>
                   <Col md={8} className= 'text-right'>
                 <b>Selected Period One Days: {moment(this.state.periodOne.endDate).diff(this.state.periodOne.startDate, 'days')+ 1}</b>
                </Col>
              </Col>
              <Divider inset/>

               <Row>
                <Col md={3}>
                  <h5> Period 2 </h5>
                </Col>
              </Row>

              <Row>
                 <Col md='3'>
                     Start date
                    <DatePicker
                        placeholderText="Click to select a Start date"
                        isClearable={true}
                        selected= {this.state.periodTwo.startDate}
                        onChange={this.setPeriodTwoStartDate}
                        minDate={moment(this.state.periodOne.endDate).add(1, 'day')}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    />
                  </Col>
                  <Col md='3' >
                    End date
                  <DatePicker
                      placeholderText="Click to select a End date"
                      isClearable={true}
                      selected={this.state.periodTwo.endDate}
                      onChange={this.setPeriodTwoendDate}
                      minDate={moment(this.state.periodTwo.startDate).add(1, 'day')}
                      maxDate={moment()}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                  />
                  </Col>    

              </Row>
            </Col>

              <Col>
                <Col md={8} className= 'text-right'>
                   <b>Selected Period Two Days: {moment(this.state.periodTwo.endDate).diff(this.state.periodTwo.startDate, 'days')}</b>
                </Col>
            </Col>
             <Divider inset/>

            <AvGroup className="text-center">
              <Button color="primary" onClick={this.generateReport}> Generate Report </Button>
                {this.state.successMsg}
            </AvGroup>
            </AvForm>
        </div>
      );
    }
  }
