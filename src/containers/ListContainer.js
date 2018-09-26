import React, { Component } from 'react';
import {
  Button, 
  Fade,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import ScrollableAnchor from 'react-scrollable-anchor'
import {style} from "../components/Style.css"

const images = [
  './1.jpg',
  './2.jpg',
  './3.jpg',
];


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

export default class UploadFilesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0,  photoIndex: 0,
      isOpen: false, fadeIn: false, fadeIn1: false, openWork: false };
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

     const { photoIndex, isOpen } = this.state;

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
      <br/><br/>
      <div>
        <h1 className= 'text-center'>Rubys Henna</h1>
       </div>
       <br/><br/><br/><br/>
       <div> 
        <style>
          {
            `.custom-tag {
                max-width: 100%;
                height: 500px;
                background: black;
              }`
          }
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
        </div>
        <br/>
        <div className=' text-center'>
          <Button color="primary" onClick={() => this.setState({ isOpen: true })}>
          My Work
        </Button> { '  '}


        </div> 
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
        <div  className='text-center'>
          <a href='#section1'> About </a>
          <a href='#section2'> Contact </a>
        </div>
        <ScrollableAnchor id={'section1'}>
                   <div style={{height: '1000px'}}>
              <div id ='a'>
               About
              </div>
              <div id = 'b'>
                Hey there, I'm Nikitha and I'm a henna artist
              </div> 
          </div>
        </ScrollableAnchor>
        <ScrollableAnchor id={'section2'}>
          <div style={{height: '1000px'}}>
              <div id ='a'>
               Contact
              </div>
              <div id = 'b'>
                Contact: 925-222-2222
                Email:   rubyart31@gail.com
              </div> 
          </div>
        </ScrollableAnchor>
      </div>
                                          
      </div>
    );
  }
}