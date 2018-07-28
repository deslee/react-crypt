import React, { Component } from 'react';
import List from './List/List';
import Item from './Item/Item';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import { parse as qs } from 'query-string';
import { Container, Row, Col } from 'reactstrap';

class AppComponent extends Component {
  render() {
    const {
      items = [],
      selectedItem,
      isEditing,
      onEdit = () => {},
      saveItem = () => {},
    } = this.props;

    return (
      <Container fluid={true}>
        <Row noGutters={false}>
          <Col xs={3}>
            <List 
              items={items}
              selected={selectedItem && selectedItem.id}
            />
          </Col>
          <Col xs={9}>
            {selectedItem && <Item 
              {...selectedItem}
              editing={isEditing} 
              onEdit={() => onEdit()}
              onSave={(item) => saveItem(item)}
            />}
          </Col>
        </Row>
      </Container>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          id: 123,
          title: 'hello world',
          preview: 'Hi there',
          content: '**Hi there** \n \n Hi there Hi there Hi there',
          active: false
        },
        {
          id: 321,
          title: 'World hello',
          preview: 'There hi',
          content: '*There hi* \n \n There hi There hi There hi',
          active: false
        }
      ]
    };
  }

  render() {
    const { items } = this.state;

    return (
      <div>
        <Router>
          <div>
            {/* Redirect to items */}
            <Route exact path="/" render={() => (
              <Redirect to="/items" />
            )} />

            <Route path="/items/:id?/" render={({match: { params: { id: itemId } }, location: { search }, history}) => {
              const selectedItem = itemId && items.find(i => i.id.toString() === itemId.toString());
              search = qs(search);

              return (<div>
                { !selectedItem && items.length > 0 && <Redirect to={`/items/${items[0].id}`} /> }
                <AppComponent 
                  selectedItem={selectedItem}
                  items={items}
                  isEditing={search.editing}
                  onEdit={() => history.push(`/items/${selectedItem.id}?editing`)}
                  saveItem={(toSave) => {
                    this.setState({
                      ...this.state,
                      items: this.state.items.map(item => item.id === toSave.id ? Object.assign({}, item, toSave) : item)
                    });
                    history.push(`/items/${selectedItem.id}`)
                  }}
                />
              </div>)
            }}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
