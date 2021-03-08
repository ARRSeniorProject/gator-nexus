import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v4 as uuid} from 'uuid';
import axios from 'axios';

const Item = props => (
  <TransitionGroup className="item-list">
    <CSSTransition key={props.item._id} timeout={500} classNames="fade">
    <ListGroupItem>
      <Button
        className="remove-btn"
        color="danger"
        size="sm"
        onClick={() => {
          props.deleteItem(props.item._id);
        }}
      >&times;</Button>
      {props.item.name}
    </ListGroupItem>
  </CSSTransition>
</TransitionGroup>
);

class ItemList extends Component {
  constructor(props) {
    super(props);
    
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      name: "",
      size: 0,
      items: []
    };
  }

  componentDidMount(){
    console.log("Component Mounted!");
    axios
      .get("/api/items")
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({items: data});
        this.setState({size: Object.keys(data).length})
      })
      .catch(err => { console.log(err)});
  }

  getItemSize(){
    axios
      .get("/api/items/")
      .then(res => console.log(Object.keys(res.data).length))
      .catch(err => console.log(err));
  }

  addItem(item) {

  };

  deleteItem(id) {
    axios
      .delete("/api/items/" + id)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    this.setState({
      items: this.state.items.filter(el => el._id !== id)
    });
  }

  itemList() {
    return this.state.items.map(currentItem => {
      return (
        <Item
          item={currentItem}
          deleteItem={this.deleteItem}
          key={currentItem._id}
        />
      );
    });
  }

  render() {
    return(
      <div>
        <h3>{this.state.size} results</h3>
        <Container>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={() => {
            const name = prompt('Enter Item');
            if (name) {
              this.setState(state => ({
                items: [...state.items, { id: uuid(), name }]
              }));
            }
          }}
        >Add Item</Button>
        <ListGroup>
          {this.itemList()}
        </ListGroup>
      </Container>
      </div>
      
    );
  }
}

export default ItemList;