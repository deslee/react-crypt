import React, { Component } from 'react';
import List from './List/List';
import Item from './Item/Item';
import { Container, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux'
import { getAllItems } from './reducers/itemReducer';
import { bindActionCreators } from 'redux';
import Settings from './Settings/Settings';
import { guid } from './utils/guid';
import { triggerSaveItem, triggerDeleteItem, triggerAddItem } from './actions/itemActions';
import { getSettings } from './reducers/optionsReducer';
import Save from './SaveAndLoad/Save';
import Reset from './SaveAndLoad/Reset';

class Layout extends Component {
    static mapStateToProps(state) {
        return {
            items: getAllItems(state.items),
            settings: getSettings(state.options)
        }
    }

    static mapDispatchToProps(dispatch) {
        return {
            ...bindActionCreators(
                {
                    saveItem: triggerSaveItem,
                    deleteItem: triggerDeleteItem,
                    addItem: triggerAddItem
                },
                dispatch
            )
        }
    }

    render() {
      const {
        items = [],
        selectedItemId,
        isEditingSelectedItem,
        saveItem,
        deleteItem,
        settings,
        addItem
      } = this.props;

      const selectedItem = selectedItemId && items.find(i => i.id.toString() === selectedItemId.toString());
  
      return (
        <Container fluid={true}>
          <Row>
            <Col><Settings /></Col>
            <Col><Save /></Col>
            <Col><Reset /></Col>
          </Row>
          <Row noGutters={false}>
            <Col>
                <Button onClick={() => addItem({id: guid()})}>Add Item</Button>
            </Col>
          </Row>
          <Row noGutters={false}>
            <Col xs={3}>
              <List 
                items={items}
                settings={settings}
                selected={selectedItem && selectedItem.id}
              />
            </Col>
            <Col xs={9}>
              {selectedItem && <Item 
                {...selectedItem}
                editing={isEditingSelectedItem} 
                saveItem={saveItem}
                deleteItem={() => deleteItem(selectedItem)}
              />}
            </Col>
          </Row>
        </Container>
      );
    }
  }

  export default connect(
    Layout.mapStateToProps,
    Layout.mapDispatchToProps
  )(Layout);