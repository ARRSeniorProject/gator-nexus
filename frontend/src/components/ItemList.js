import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
    
    this.onChangeName = this.onChangeName.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      name: "",
      size: 0,
      loading: false,
      items: []
    };
  }

  componentDidMount(){
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

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  };

  addItem(item) {
    axios
      .post('/api/items/', item)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  deleteItem(id) {
    axios
      .delete("/api/items/" + id)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    this.setState({
      items: this.state.items.filter(el => el._id !== id)
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const item = {
      name: this.state.name,
    };
    console.log(item);
    this.props.addItem(item);
  }

  onClick() {
    const item = {
      name: this.state.name,
    };
    console.log(item);
    this.props.addItem(item);
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
              console.log(name);
              this.setState({name: name});
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