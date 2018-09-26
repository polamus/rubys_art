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
  import {Divider} from 'react-md';
  import 'react-datepicker/dist/react-datepicker.css';



  export default class ReportsContainer extends Component {
    constructor (props) {
      super(props)
      this.state = {
        department: 'All',
        category: 'All',
        periodOne: {startDate: moment().subtract(2, 'years').subtract(1, 'days'),
                    endDate: moment().subtract(1, 'years').subtract(1, 'days')},
        banners: ['Save Mart', 'Lucky', 'Food Maxx'],
        type: "Demandtec Deals Report",
        departments: [],
        categories: [],
        successMessage: ''
      };
      this.setPeriodOneStartDate = this.setPeriodOneStartDate.bind(this);
      this.setPeriodOneEndDate = this.setPeriodOneEndDate.bind(this);
      this.generateReport = this.generateReport.bind(this);
      this.selectedDepartment = this.selectedDepartment.bind(this);
      this.selectedCategories = this.selectedCategories.bind(this);
      this.isBannerChecked = this.isBannerChecked.bind(this);
      this.checkboxChange = this.checkboxChange.bind(this);
      }


   componentDidMount() {
    if(this.props.authToken !== '' )
      Api.list(this.props.authToken)
      .then((response) => {
        if (response.data !== undefined){
          let departments = response.data.map((d) => d.attributes);
          departments.unshift({dept: 'All', deptnm: 'All'})
          this.setState({
            departments: departments
          });
        }
      })
      .then(() => {
        this.fetchCategories(this.state.department);
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

   
    selectedDepartment(val){
      if(val){
        this.fetchCategories(val.dept)
      }
    }



    selectedCategories(val){
      if(val)
        this.setState({
          category: val.groupnum
        })
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

  
    generateReport(){
      let periodOneStartDate =  this.state.periodOne.startDate
      let periodOneEndDate =  this.state.periodOne.endDate
      let department = this.state.department
      let category = this.state.category
      let banners = this.state.banners

      Api.generateReport(this.props.authToken, banners, periodOneStartDate, periodOneEndDate, department, category)
      .then((response) => {
          this.setState({successMessage: response.Success})
        });
    }


    fetchCategories(dept){
      if(this.props.authToken !== '' )
      Api.listCategories(this.props.authToken, dept)
      .then((response) => {
        if (response.data !== undefined){
          let categories = response.data.map((d) => d.attributes);
          categories.unshift({groupnum: 'All', groupnm: 'All'})
          this.setState({
						department: dept,
            categories: categories
          });
        }
      })
      .catch((e) => console.log(e));
    }


   

    render() {

     let departments = this.state.departments
     let categories = this.state.categories
     
      return (
        <div>
          <Row>
            <Col md='6'>
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
                         <AvInput type='checkbox' value={true} onChange={(e) => this.checkboxChange('Save Mart')} checked ={this.isBannerChecked('Save Mart')} name="checkbox"/> Save Mart
                       </Label>
                       <Label check inline md={2}>
                         <AvInput type='checkbox'  value={true} onChange={(e) => this.checkboxChange('Lucky')} checked ={this.isBannerChecked('Lucky')}  name="checkbox"/> Lucky
                       </Label>
                       <Label check inline md={2}>
                         <AvInput type='checkbox'  value={true} onChange={(e) => this.checkboxChange('Food Maxx')} checked ={this.isBannerChecked('Food Maxx')}  name="checkbox"/> Food Maxx
                       </Label>
                    </FormGroup>
                  </FormGroup>
                </Col>

                <Col md={6  }>
                  <h3> Performance date range </h3>
                  <Row>
                    <Col md='4'>
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
                    <Col md='4' >
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
                    <Col md='4' className = 'text-right'>
                      Length of the date range: <b>{moment(this.state.periodOne.endDate).diff(this.state.periodOne.startDate, 'days')+ 1} days</b>
                    </Col>
                  </Row>
                </Col>   
              </Row>		
            </Col>
            <br/><br/><br/>
              
            <Row>
              <Col md={5}>
                <h3> Departments </h3>
                <VirtualizedSelect name="deptnm"
                  labelKey='deptnm'
                  valueKey= 'dept'
                  options={departments}
                  onChange={this.selectedDepartment}
                  value={this.state.department}
                />
              </Col>
              <Col md={1}></Col>
              <Col md={5}>
                <h3> Categories </h3>
                <VirtualizedSelect name="groupname"
                  labelKey='groupname'
                  valueKey= 'groupnum'
                  options={categories}
                  onChange={this.selectedCategories}
                  value={this.state.category}
                />   
              </Col>
            </Row>
            <AvGroup className="text-center">
              <Button color="primary" onClick={this.generateReport}> Generate Report </Button>{''}
            </AvGroup>
            <AvGroup className="text-center">
              <span color = 'green'> {this.state.successMessage}</span>
            </AvGroup>
            </AvForm>

            
        </div>
      );
    }
  }
