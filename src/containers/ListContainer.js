import React, { Component } from 'react';
import {
  Button, 
  Fade,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Jumbotron,
  Row,
  Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
  Text
} from 'reactstrap';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import ScrollableAnchor from 'react-scrollable-anchor'
import {style} from "../components/Style.css"
import 'font-awesome/css/font-awesome.min.css'




const items = [
  {
    id: 1,
    src: './1.jpg',
    altText: "Ruby's Henna Art",
    caption: "Ruby's Henna Art"
  },
  {
    id: 2,
    src: './1.jpg',
    altText: 'Birthdays',
    caption: 'Birthday'
  },
  {
    id: 3,
    src: './2.jpg',
    altText: 'Sangeeth',
    caption: 'Sangeeth'
  }
];


const divStyle1 = {
  backgroundImage: 'url(' + './main3.jpg' + ')',
  height: '600px'
};


export default class UploadFilesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0,  photoIndex: 0,
      isOpen: false, fadeIn: false, fadeIn1: false, openWork: false, images: [
  './1.jpg',
  './2.jpg',
  './3.jpg',
] };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
     this.toggle = this.toggle.bind(this);
     this.toggle1 = this.toggle1.bind(this);
   
  }



  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

   toggle() {
        this.setState({
            fadeIn: !this.state.fadeIn,
            fadeIn1: false
        });
    }

     toggle1() {
        this.setState({
            fadeIn1: !this.state.fadeIn1,
            fadeIn: false
        });
    }






  render() {

    
    const { activeIndex } = this.state;

    const images = this.state.images

     const { photoIndex, isOpen } = this.state;
     var classN = 'fa fa-facebook fa-clickable'

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item.id}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >


          <img  className= "custom-tag" src={item.src} alt={item.altText}  />
          <CarouselCaption className="text-default" captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <div id= 'main'>
           <div>
           <Row>
           <Col>
            <font face="Arial">Ruby's Henna Art</font>
           </Col>
          <Col className='text-right'>
             <a href='#section1'> About </a> &nbsp;
             <a href='#section2'> Contact </a> &nbsp;
             <a href='#section3'> My Work </a> &nbsp;
             <i className= {classN} title="Facebook"></i>

          </Col>   
          </Row>

          </div>
            <br/><br/>
        <Jumbotron style={divStyle1}>
          <h1 id = 'hello-text'>Henna Artist</h1>        
        </Jumbotron>
    

      <br/><br/>
         {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}

        <div>
        
        <ScrollableAnchor id={'section1'}>
            <div style={{height: '300px'}}>
                  <h2 id='line'><span>About</span></h2>
                  <br/>
                 <p id='about-text' className='text-center'> <font face="Courier">"A recognized henna and facepainting artist"</font>  </p>       
             </div>
        </ScrollableAnchor>
        <ScrollableAnchor id={'section2'}>
          <div style={{height: '300px'}}>
                  <h2 id='line'><span>Contact</span></h2>
                  <br/>
                 <p id='about-text' className='text-center'> <font face="Courier">"Email: rubyart31@gmail.com"</font>  </p>   
                 <p id='about-text' className='text-center'> <font face="Courier">"Phone: 000-000-0000"</font>  </p>       
    
             </div>
        </ScrollableAnchor>

         <ScrollableAnchor id={'section3'}>
           <div>
              <h2 id='line'><span>My Work</span></h2>
             <br/>
              <Row>
                <Col sm="6">
                  <CardImg top width="100%" src="./main.jpg" alt="Card image cap" />
                  <Card body>
                    <CardTitle>Bridal</CardTitle>
                    <Button onClick={() => this.setState({ isOpen: true })}>Gallery</Button>
                  </Card>
                </Col>
                <Col sm="6">
                  <CardImg top width="100%" src="./main1.jpg" alt="Card image cap" />
                  <Card body>
                    <CardTitle>Birthday</CardTitle>
                    <Button onClick={() => this.setState({ isOpen: true })}>Gallery</Button>
                  </Card>
                </Col>
                </Row>
                <br/>
                <Row>
                <Col sm="6">
                  <CardImg top width="100%" src="./2.jpg" alt="Card image cap" />
                  <Card body>
                    <CardTitle>Sangeeth</CardTitle>
                    <Button onClick={() => this.setState({ isOpen: true })}>Gallery</Button>
                  </Card>
                </Col>
                <Col sm="6">
                  <CardImg top width="100%" src="./1.jpg" alt="Card image cap" />
                  <Card body>
                    <CardTitle>Corporate Events</CardTitle>
                    <Button onClick={() => this.setState({ isOpen: true })}>Gallery</Button>
                  </Card>
                </Col>
              </Row>
          </div>

        </ScrollableAnchor>
      </div>
                                          
      </div>
    );
  }
}