import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { RenderRichText, asText } from './../../Prismic/PrismicContent';

class PageHeaderSection extends Component {

    render() {
        let slice = this.props.slice;
        let headerText = slice.primary.header_text;
        let pageType = this.props.pageType;

        let headerTag = RenderRichText(headerText);

        return (
            <Row className="justify-content-center">
                <Col>
                    <div className={"text-center " + pageType}>
                        {headerTag}
                    </div>
                </Col>
            </Row>
        );
    }
} export default PageHeaderSection;