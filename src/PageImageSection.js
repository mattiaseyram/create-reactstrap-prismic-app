import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Prismic from 'prismic-javascript';
import { Link, RichText, Date } from 'prismic-reactjs';

class PageImageSection extends Component {

    render() {
        let slice = this.props.slice;
        console.log(slice);
        let imgsrc = null;
        let imgdesc = null;
        let imgalt = null;
        let displaytype = null;
        if (slice.primary.image_field.url) imgsrc = slice.primary.image_field.url;
        if (slice.primary.image_description) imgdesc = slice.primary.image_description;
        if (slice.primary.image_alt_text) imgalt = slice.primary.image_alt_text;
        if (slice.primary.display_type) displaytype = slice.primary.display_type;

        let thisimg = <img src={imgsrc} alt-text={imgalt} className="img-fluid"></img>;;

        switch (displaytype) {
            case 'full_image':
                thisimg = <img src={imgsrc} alt-text={imgalt} className="img-fluid"></img>;
                break;
            case 'banner_image':
                let divStyle = {
                    backgroundImage: 'url(' + imgsrc + ')',
                    backgroundSize: 'cover'
                };
                thisimg = <div style={ divStyle }><Row><Col xs='12'>test</Col></Row></div>;
                break;
            case 'small_image':
                thisimg = <div><Row className="justify-content-center"><Col xs='2'><img src={imgsrc} alt-text={imgalt} className="img-fluid"></img></Col></Row></div>;
                break;
                    
        }


        return (
            <div className="text-center">
                {thisimg}
            </div>
        );
    }

} export default PageImageSection;