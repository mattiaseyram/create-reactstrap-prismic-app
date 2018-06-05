import React, { Component } from 'react';
import Prismic from 'prismic-javascript';
import { Link, RichText, Date } from 'prismic-reactjs';

//Add your own endpoint here
const apiEndpoint = 'https://create-reactstrap-prismic-app.prismic.io/api/v2';
const initialpath = 'create-reactstrap-prismic-app' //change to '' if no initial path
export default initialpath;

// Link Resolver
export function linkResolver(doc) {
    // Define the url depending on the document type
    if (doc.type === 'page') {
        return '/page/' + doc.uid;
    }else if (doc.type === 'footer') {
        return '/footer/' + doc.uid;
    }else if (doc.type === 'navigation') {
        return '/navigation/' + doc.uid;
    }

    // Default to homepage
    return '/';
}

export function PrismicSetPage(cmp) {
    let slug = cmp.props.match.params.slug;
    if (!slug || slug === '') slug = 'home';
    //console.log(slug);

    Prismic.api(apiEndpoint).then(api => {
        api.query(Prismic.Predicates.at('my.page.uid', slug)).then(response => {
            if (response) {
                cmp.setState({ doc: response.results[0] });
            }
        });
    });
}


//create a 'navigation' content with a slug 'navbar' to use as the main navbar
export function PrismicSetNav(cmp) {

    Prismic.api(apiEndpoint).then(api => {
        api.query(Prismic.Predicates.at('my.navigation.slug', 'navbar')).then(response => {
            if (response.results[0]) {
                //console.log(response);
                let nav = response.results[0];
                let pages = nav.data.body;
                pages.forEach(item => {
                    if(item.primary.item_link && item.primary.item_link.uid)
                        item.primary.item_link.uid='/'+item.primary.item_link.uid; //lets navbar active link work
                });
                cmp.setState({ doc : nav, docs : pages });
            }
        });
    });
}

//create a 'navigation' content with a slug 'footer' to use as the main footer
export function PrismicSetFooter(cmp) {

    Prismic.api(apiEndpoint).then(api => {
        api.query(Prismic.Predicates.at('my.footer.slug', 'footer')).then(response => {
            if (response.results[0]) {
                cmp.setState({ doc : response.results[0] });
            }
        });
    });
}