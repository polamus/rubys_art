  import React, { Component } from 'react';
  import {Container, Row, Col, Label, FormGroup, Button} from "reactstrap";
  // import {PageTitle}  from 'sm_shared';
  import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
  import 'react-select/dist/react-select.css';
  import DatePicker from 'react-datepicker';
  import moment from 'moment';
  import Api          from '../api/Api';
  import VirtualizedSelect from 'react-virtualized-select'
  import 'react-select/dist/react-select.css'
  import 'react-virtualized/styles.css'
  import 'react-virtualized-select/styles.css'
  import {Divider} from 'react-md';
  import 'react-datepicker/dist/react-datepicker.css';
  import _ from 'lodash';



  export default class ReportsContainer extends Component {
    constructor (props) {
      super(props)
      this.state = {
        manufacturer: 'All',

        periodOne: {startDate: moment().subtract(2, 'years').subtract(1, 'days'),
                    endDate: moment().subtract(1, 'years').subtract(1, 'days')},

        periodTwo: {startDate: moment().subtract(1, 'years'),
                    endDate: moment().subtract(1, 'days')},
        banners: ['Save Mart', 'Lucky', 'Food Maxx'],
        type: "Large Document Request",
        manufacturers: [],
        includeItemsWithNoManufacturer: false,
        successMessage: '',
        errors: {},
        validates: {periodOne: ['startDate', 'endDate'], periodTwo: ['startDate', 'endDate'], banners: true, manufacturers: true}
      };

      this.setPeriodOneStartDate = this.setPeriodOneStartDate.bind(this);
      this.setPeriodOneEndDate = this.setPeriodOneEndDate.bind(this);
      this.setPeriodTwoStartDate = this.setPeriodTwoStartDate.bind(this);
      this.setPeriodTwoendDate = this.setPeriodTwoendDate.bind(this);
      this.generateReport = this.generateReport.bind(this);
      this.selectedManufacturer = this.selectedManufacturer.bind(this);
      this.isBannerChecked = this.isBannerChecked.bind(this);
      this.checkboxChange = this.checkboxChange.bind(this);
      this.includeItemCheck = this.includeItemCheck.bind(this);
      }


   componentDidMount() {
    if(this.props.authToken !== '' )
      Api.list(this.props.authToken)
      .then((response) => {
        if (response.data !== undefined){
          let manufacturers = response.data.map((d) => d.attributes);
          manufacturers.unshift({mfg: 'All', mfgnm: 'All'})
          this.setState({
            manufacturers: manufacturers
          });
        }
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

   
    selectedManufacturer(val){
      if(val)
        this.setState({
          manufacturer: val.mfg
        })
      else{
        this.setState({manufacturer: null})
      }
    }

    selectBanner(banner){
      var banners = this.state.banners;
      banners.push(banner)
      this.setState({
        banners: banners
      })
    }

    deselectBanner(banner){
      var banners = this.state.banners.filter(b => b !== banner);

      this.setState({
        banners: banners
      });
    }

    isBannerChecked(val){
      if(val){
        return this.state.banners.includes(val);
      }
      else{
        return false;
      }
    }

    checkboxChange(banner){
      if(this.isBannerChecked(banner)){
        this.deselectBanner(banner)
      }
      else{
        this.selectBanner(banner)
      }
    }

    includeItemCheck(){
      if(this.state.includeItemsWithNoManufacturer === false){
        this.setState({includeItemsWithNoManufacturer: true})
      }
      else{
        this.setState({includeItemsWithNoManufacturer: false})
      }

    }

    generateReport(){
      let periodOneStartDate =  this.state.periodOne.startDate
      let periodOneEndDate =  this.state.periodOne.endDate
      let periodTwoStartDate =  this.state.periodTwo.startDate
      let periodTwoEndDate =  this.state.periodTwo.endDate
      let manufacturers = this.state.manufacturer
      let banners = this.state.banners
      let includeItemsWithNoManufacturer = this.state.includeItemsWithNoManufacturer

      let validation_fields = this.state.validates

      Object.entries(validation_fields).forEach((entry) => {
        let [field, values] = entry
        debugger
        if(values){
          if(values.length) {
            values.forEach((childField) => {

              let fieldValue = eval(field + _.upperFirst(childField))
              if (fieldValue == '' || fieldValue == null) {
                let errorState = this.state.errors
                errorState[field + _.upperFirst(childField)] = 'Validation Error'
                this.setState({error: errorState})
              }
            })
          } else {
            let fieldValue = eval(field)
            if (fieldValue == '' || fieldValue == null) {
                let errorState = this.state.errors
                errorState[field] = 'Validation Error'
                this.setState({error: errorState})
              }
          } 
        }
        
      })

      
      // Api.generateReport(this.props.authToken, banners, periodOneStartDate, periodOneEndDate, periodTwoStartDate, periodTwoEndDate, manufacturers, includeItemsWithNoManufacturer)
      // .then((response) => {
      //     this.setState({successMessage: response.Success})
      //   });
    }

    errorClassName (fieldName) {
      if(this.state.errors(fieldName)){
        return 'has-error'
      }
    }

    render() {

     let manufacturers = this.state.manufacturers

     const model = {
      SaveMart: true}
     
      return (
        <div>
          <Container>
            <Row>
              <Col md='6'>
              </Col>
            </Row>
            <AvForm model={model}>
              <Row>
                <Col md={{size: 2, offset: 4}} className=''>
                  <b>Banners:</b>
                </Col>
                <Col md={6}>
                  <FormGroup check>
                    <Row>
                      <Col md={12}>
                        <Label check inline md={12}>
                         <AvInput type='checkbox' value={true} onChange={(e) => this.checkboxChange('Save Mart')} checked ={this.isBannerChecked('Save Mart')} name="checkbox"/> Save Mart
                       </Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Label check inline md={12}>
                         <AvInput type='checkbox'  value={true} onChange={(e) => this.checkboxChange('Lucky')} checked ={this.isBannerChecked('Lucky')}  name="checkbox"/> Lucky
                       </Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Label check inline md={12}>
                         <AvInput type='checkbox'  value={true} onChange={(e) => this.checkboxChange('Food Maxx')} checked ={this.isBannerChecked('Food Maxx')}  name="checkbox"/> Food Maxx
                       </Label>
                      </Col>
                    </Row>
                  </FormGroup> 
                </Col>
              </Row>

              <Row>
                <Col md={{size: 2, offset: 4}}  className=''>
                  <b>Manufacturers:</b>
                </Col>

                <Col md={6}>
                  <Row>
                    <Col md={6}>
                     <VirtualizedSelect name="mfgnm"
                      labelKey='mfgnm'
                      valueKey= 'mfg'
                      options={manufacturers}
                      onChange={this.selectedManufacturer}
                      value={this.state.manufacturer}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <Label check>
                        <AvInput type='checkbox' onChange={(e) => this.includeItemCheck()} checked ={this.state.includeItemsWithNoManufacturer}  name="Include all Manufacturers"/> Include items with no Manufacturers
                      </Label>
                    </Col>
                  </Row>
                </Col>
              </Row>
          
                <Divider/>
              <Row>
                <Col md={{size: 2, offset: 4}} >
                  <b>Period 1 Start Date:</b>
                </Col>
                <Col md={6}>
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
                      className={() => { this.erroClassName('periodOneStartDate')}}
                    />
                </Col>
              </Row>
              <Row>
              <Col></Col>
              <Col md={6}>
                <span style={{color: 'red'}}>{this.state.errors.periodOneStartDate}</span>
              </Col>
              </Row>
              <br/>

              <Row>
                <Col md={{size: 2, offset: 4}} >
                  <b>Period 1 End Date:</b>
                </Col>
                <Col md={6}>
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
              <br/>

              <Row>
                <Col md={{size: 2, offset: 4}} >
                  <b>Period 1 length:</b>
                </Col>
                <Col md={6}>
                  <b>{(moment(this.state.periodOne.endDate).diff(this.state.periodOne.startDate, 'days')+ 1) || 0 } days</b>
                </Col>
              </Row>

              <Divider inset/>

              <Row>
                <Col md={{size: 2, offset: 4}}  >
                  <b>Period 2 Start Date:</b>
                </Col>
                <Col md={6}>
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
              </Row>

              <Row>
                <Col md={{size: 2, offset: 4}} >
                  <b>Period 2 End Date:</b>
                </Col>
                <Col md={6}>
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

              <Row>
                <Col md={{size: 2, offset: 4}}  >
                  <b>Period 2 length:</b>
                </Col>
                <Col md={6}>
                  <b> {moment(this.state.periodTwo.endDate).diff(this.state.periodTwo.startDate, 'days')} days</b>
                </Col>
              </Row>

               <Divider inset/>

              <AvGroup className="text-center">
                <Button color="primary" onClick={this.generateReport}> Generate Report </Button>{''}
              </AvGroup>
            </AvForm>
          </Container>
        </div>
      );
    }
  }
